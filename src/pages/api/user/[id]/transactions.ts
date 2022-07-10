import type { NextApiRequest, NextApiResponse } from 'next';
import { UserRequestError, NotFoundError } from '@class/CustomError';
import db, { User } from '@connection';
import ResponseData from '@/types/ResponseData';

const getUserTransactionHandler = async (
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) => {
    const {
        direction = 'desc',
        page = 1,
        limit = 10,
        sortBy = 'created_at',
        // filters = {},
    } = req.query;
    const { method } = req;
    const { id } = req.query;

    try {
        if (method !== 'GET') throw new UserRequestError('Bad Request.');
        if (isNaN(Number(id))) throw new NotFoundError('User not found.');

        const isUserExists = await User.findByPk(Number(id));
        if (!isUserExists) throw new NotFoundError('User not found.');

        const start = (Number(page) - 1) * Number(limit);
        const end = Number(limit);
        const { Transaction } = db.models;

        const { count, rows: transactionData }: any =
            await Transaction.findAndCountAll({
                order: [[`${sortBy}`, `${direction}`]],
                offset: start,
                limit: end,
                where: {
                    student_id: id,
                },
            });

        res.status(200).json({
            status: true,
            message: 'Successfully retrieve a list of user transactions.',
            data: transactionData,
            meta: {
                page: Number(page),
                limit: Number(limit),
                total: count,
            },
        });
    } catch (error: any) {
        res.status(error.HTTPErrorCode || 500).json({
            status: false,
            message: error.message || 'An error has occured.',
        });
    }
};

export default getUserTransactionHandler;
