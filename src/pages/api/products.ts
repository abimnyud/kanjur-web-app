import type { NextApiRequest, NextApiResponse } from 'next';
import { UserRequestError } from '@class/CustomError';
import db from '@connection';
import ResponseData from '@/types/ResponseData';
const qs = require('qs');

const getProductListHandler = async (
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) => {
    const {
        direction = 'desc',
        page = 1,
        limit = 12,
        sortBy = 'created_at',
        filters = {},
    } = qs.parse(req.query);
    const { method } = req;

    try {
        if (method !== 'GET') throw new UserRequestError('Bad Request.');

        const start = (Number(page) - 1) * Number(limit);
        const end = Number(limit);
        const { Product } = db.models;

        const { count, rows: productData }: any = await Product.scope(
            'list'
        ).findAndCountAll({
            order: [[`${sortBy}`, `${direction}`]],
            offset: start,
            limit: end,
            where: filters,
        });

        res.status(200).json({
            status: true,
            message: 'Successfully retrieve a list of product.',
            data: productData,
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

export default getProductListHandler;
