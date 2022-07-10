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

const removeFromCartHandler = async (
    req: ExtendedRequest,
    res: NextApiResponse<ResponseData>
) => {
    try {
        const { method } = req;
        const { product_id } = req.query;

        if (method !== 'POST' || !product_id)
            throw new UserRequestError('Bad Request.');

        const {
            data: { student_id },
        } = req.user;
        if (!student_id) throw new UnauthorizedError('Unauthorized.');

        const { Product, User } = db.models;

        const productData: any = await Product.findByPk(Number(product_id), {
            paranoid: false,
        });
        const userData: any = await User.findByPk(Number(student_id));

        if (!productData) throw new NotFoundError('Product not found.');
        if (!userData) throw new NotFoundError('User not found.');

        await userData.$remove('cart', productData);

        res.status(200).json({
            status: true,
            message: "Successfully remove a product from user's cart.",
        });
    } catch (error: any) {
        res.status(error.HTTPErrorCode || 500).json({
            status: false,
            message: error.message || 'An error has occured.',
        });
    }
};

export default auth(removeFromCartHandler);
