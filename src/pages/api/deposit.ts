import type { NextApiResponse } from 'next';
import { UserRequestError, NotFoundError } from '@class/CustomError';
import db from '@connection';
import auth from '@middlewares/authorization';
import sum from '@functions/sum';
import type { ExtendedRequest } from '@middlewares/authorization';
import ResponseData from '@/types/ResponseData';

const postProductHandler = async (
    req: ExtendedRequest,
    res: NextApiResponse<ResponseData>
) => {
    const { method } = req;
    let { amount: deposit_amount = 0 } = req.query;
    deposit_amount = Number(deposit_amount);

    const {
        data: { student_id },
    } = req.user;

    try {
        const { Transaction, User } = db.models;
        if (method !== 'POST') throw new UserRequestError('Bad Request.');

        // Get latest balance
        let latestBalance: any = await Transaction.scope(
            'latestBalance'
        ).findOne();

        const balance = !latestBalance ? 0 : Number(latestBalance.balance);

        const userData: any = await User.scope('toCheckDebt').findByPk(
            student_id
        );
        const isInDebt: boolean = userData.debt > 0;

        await userData.increment({ deposit: deposit_amount });
        if (isInDebt) {
            if (deposit_amount >= userData.debt) {
                await userData.update({ debt: 0 });
            } else {
                await userData.decrement({ debt: deposit_amount });
            }
        }
        await userData.save();
        // Add to transactions
        const transactionData = await Transaction.create({
            student_id,
            deposit: deposit_amount,
            balance: balance + deposit_amount,
        });

        res.status(201).json({
            status: true,
            message: "Successfully deposit money to canteen's balance.",
            data: transactionData,
        });
    } catch (error: any) {
        res.status(error.HTTPErrorCode || 500).json({
            status: false,
            message: error.message || 'An error has occured.',
        });
    }
};

export default auth(postProductHandler);
