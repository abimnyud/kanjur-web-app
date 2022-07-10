import type { NextApiRequest, NextApiResponse } from 'next';
import { UserRequestError } from '@class/CustomError';
import db from '@connection';
import ResponseData from '@/types/ResponseData';

const getProductListHandler = async (
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) => {
    try {
        const { method } = req;
        if (method !== 'GET') throw new UserRequestError('Bad Request.');

        const { User } = db.models;

        const usersData = await User.scope('id').findAll();

        res.status(200).json({
            status: true,
            message: 'Successfully retrieve a list of user.',
            data: usersData,
        });
    } catch (error: any) {
        res.status(error.HTTPErrorCode || 500).json({
            status: false,
            message: error.message || 'An error has occured.',
        });
    }
};

export default getProductListHandler;
