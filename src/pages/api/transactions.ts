import type { NextApiRequest, NextApiResponse } from 'next';
import { UserRequestError } from '@class/CustomError';
import db from '@connection';
import ResponseData from '@/types/ResponseData';
const qs = require('qs');

const getTransactionListHandler = async (
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) => {
    const {
        direction = 'desc',
        page = 1,
        limit = 7,
        sortBy = 'created_at',
        scope = 'recent',
        filters = {},
    } = qs.parse(req.query);
    const { method } = req;

    try {
        if (method !== 'GET') throw new UserRequestError('Bad Request.');

        const start = (Number(page) - 1) * Number(limit);
        const end = Number(limit);
        const { Transaction } = db.models;

        const { count, rows: transactionsData }: any = await Transaction.scope(
            scope
        ).findAndCountAll({
            order: [[`${sortBy}`, `${direction}`]],
            offset: start,
            limit: end,
            where: filters,
        });

        res.status(200).json({
            status: true,
            message: 'Successfully retrieve a list of transaction.',
            data: transactionsData,
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

export default getTransactionListHandler;
