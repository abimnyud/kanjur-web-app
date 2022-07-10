import type { NextApiRequest, NextApiResponse } from 'next';
import { UserRequestError, NotFoundError } from '@class/CustomError';
import db from '@connection';
import ResponseData from '@/types/ResponseData';

const getUserHandler = async (
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) => {
    const { method } = req;
    const { id, scope = 'public' } = req.query;

    try {
        if (method !== 'GET' || !id) throw new UserRequestError('Bad Request.');
        if (isNaN(Number(id))) throw new NotFoundError('User not found.');

        const { User } = db.models;

        const userData: any = await User.scope(scope).findByPk(Number(id));

        if (!userData) throw new NotFoundError('User not found.');

        res.status(200).json({
            status: true,
            message: 'Successfully retrieve user data.',
            data: userData,
        });
    } catch (error: any) {
        res.status(error.HTTPErrorCode || 500).json({
            status: false,
            message: error.message || 'An error has occured.',
        });
    }
};

export default getUserHandler;
