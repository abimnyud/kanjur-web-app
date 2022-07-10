import type { NextApiResponse } from 'next';
import { UserRequestError } from '@class/CustomError';
import db from '@connection';
import auth from '@middlewares/authorization';
import type { ExtendedRequest } from '@middlewares/authorization';
import ResponseData from '@/types/ResponseData';

const getBalanceHandler = async (
    req: ExtendedRequest,
    res: NextApiResponse<ResponseData>
) => {
    const { method } = req;

    try {
        const { Transaction } = db.models;
        if (method !== 'GET') throw new UserRequestError('Bad Request.');

        const latestBalance: any = await Transaction.scope(
            'latestBalance'
        ).findOne();

        const currBalance = !latestBalance ? 0 : Number(latestBalance.balance);
        res.status(200).json({
            status: true,
            message: 'Successfully get canteen balance.',
            data: {
                balance: currBalance,
            },
        });
    } catch (error: any) {
        res.status(error.HTTPErrorCode || 500).json({
            status: false,
            message: error.message || 'An error has occured.',
        });
    }
};

export default auth(getBalanceHandler);
