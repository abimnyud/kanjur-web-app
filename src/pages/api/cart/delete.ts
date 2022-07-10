import type { NextApiResponse } from 'next';
import type { ExtendedRequest } from '@middlewares/authorization';
import {
    UserRequestError,
    NotFoundError,
    UnauthorizedError,
} from '@class/CustomError';
import auth from '@middlewares/authorization';
import db from '@connection';
import ResponseData from '@/types/ResponseData';

const deleteCartHandler = async (
    req: ExtendedRequest,
    res: NextApiResponse<ResponseData>
) => {
    try {
        const { method } = req;
        if (method !== 'DELETE') throw new UserRequestError('Bad request.');

        const {
            data: { student_id },
        } = req.user;
        if (!student_id) throw new UnauthorizedError('Unauthorized.');

        const { User } = db.models;

        const userData: any = await User.findByPk(Number(student_id));
        if (!userData) throw new NotFoundError('User not found.');

        await userData.$set('cart', []);

        res.status(200).json({
            status: true,
            message: "Successfully erase user's cart.",
        });
    } catch (error: any) {
        res.status(error.HTTPErrorCode || 500).json({
            status: false,
            message: error.message || 'An error has occured.',
        });
    }
};

export default auth(deleteCartHandler);
