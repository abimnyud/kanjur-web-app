import type { NextApiResponse } from 'next';
import { UserRequestError } from '@class/CustomError';
import db from '@connection';
import auth from '@middlewares/authorization';
import type { ExtendedRequest } from '@middlewares/authorization';
import ResponseData from '@/types/ResponseData';

const postProductHandler = async (
    req: ExtendedRequest,
    res: NextApiResponse<ResponseData>
) => {
    const { method } = req;
    let { amount: withdraw_amount = 0 } = req.query;
    withdraw_amount = Number(withdraw_amount);

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

        if (balance === 0)
            throw new UserRequestError("No money left in canteen's balance.");

        // if withdraw is exceed canteen's balance
        if (withdraw_amount > balance) withdraw_amount = balance;

        const userData: any = await User.scope('toCheckDebt').findByPk(
            student_id
        );

        const cashflow = Number(userData.revenue) + Number(userData.deposit) - Number(userData.withdraw);
        const isFlagged =
            withdraw_amount > cashflow || Number(userData.debt) !== 0;

        if (isFlagged) {
            // increment withdraw and debt
            await userData.increment({
                withdraw: withdraw_amount,
                debt: Math.abs(withdraw_amount - cashflow),
            });
        } else {
            await userData.increment({
                withdraw: withdraw_amount
            });
        }
        await userData.save();

        // Add to transactions
        const transactionData = await Transaction.create({
            student_id,
            withdraw: withdraw_amount,
            balance: balance - withdraw_amount,
            flag: isFlagged,
        });

        res.status(201).json({
            status: true,
            message: "Successfully withdrawy money from canteen's balance.",
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
