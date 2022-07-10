import type { NextApiResponse } from 'next';
import type { ExtendedRequest } from '@middlewares/authorization';
import {
    UserRequestError,
    NotFoundError,
    UnauthorizedError,
} from '@class/CustomError';
import db from '@connection';
import ResponseData from '@/types/ResponseData';
import auth from '@middlewares/authorization';

const getUserCartHandler = async (
    req: ExtendedRequest,
    res: NextApiResponse<ResponseData>
) => {
    const { method } = req;
    const { User } = db.models;

    try {
        const {
            data: { student_id },
        } = req.user;

        if (!student_id) throw new UnauthorizedError('Unauthorized.');
        if (method !== 'GET') throw new UserRequestError('Bad Request.');

        const userData: any = await User.findByPk(Number(student_id));
        if (!userData) throw new NotFoundError('User not found.');

        const cartData = await userData.$get('cart', {
            order: [['deleted_at', 'desc']],
            paranoid: false,
            include: [
                {
                    model: User,
                    as: 'seller',
                    attributes: ['student_id', 'name'],
                },
            ],
        });

        res.status(200).json({
            status: true,
            message: "Successfully retrieve user's cart.",
            data: cartData,
        });
    } catch (error: any) {
        res.status(error.HTTPErrorCode || 500).json({
            status: false,
            message: error.message || 'An error has occured.',
        });
    }
};

export default auth(getUserCartHandler);
