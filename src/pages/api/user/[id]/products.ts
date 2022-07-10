import type { NextApiRequest, NextApiResponse } from 'next';
import { NotFoundError, UserRequestError } from '@class/CustomError';
import db from '@connection';
import ResponseData from '@/types/ResponseData';

const getUserProductHandler = async (
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
    const { User } = db.models;

    try {
        if (method !== 'GET') throw new UserRequestError('Bad Request.');
        if (isNaN(Number(id))) throw new NotFoundError('User not found.');

        const isUserExists = await User.findByPk(Number(id));
        if (!isUserExists) throw new NotFoundError('User not found.');

        const start = (Number(page) - 1) * Number(limit);
        const end = Number(limit);
        const { Product } = db.models;

        const { count, rows: productData }: any = await Product.findAndCountAll(
            {
                order: [[`${sortBy}`, `${direction}`]],
                offset: start,
                limit: end,
                where: {
                    seller_id: id,
                },
            }
        );

        res.status(200).json({
            status: true,
            message: 'Successfully retrieve a list of user products.',
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

export default getUserProductHandler;
