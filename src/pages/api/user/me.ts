import type { NextApiRequest, NextApiResponse } from 'next';
import { UserRequestError, NotFoundError } from '@class/CustomError';
import auth from '@middlewares/authorization';
import type { ExtendedRequest } from '@middlewares/authorization';
import db from '@connection';
import ResponseData from '@/types/ResponseData';

const getUserHandler = async (
    req: ExtendedRequest,
    res: NextApiResponse<ResponseData>
) => {
    const { method } = req;
    const {
        data: { student_id },
    } = req.user;

    try {
        if (method !== 'GET' || !student_id)
            throw new UserRequestError('Bad Request.');

        const { User } = db.models;

        const userData: any = await User.scope('me').findByPk(`${student_id}`);

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

export default auth(getUserHandler);
