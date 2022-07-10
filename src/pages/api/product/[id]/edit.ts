import type { NextApiResponse } from 'next';
import { NotFoundError, UserRequestError } from '@class/CustomError';
import db from '@connection';
import auth from '@middlewares/authorization';
import type { ExtendedRequest } from '@middlewares/authorization';
import ResponseData from '@/types/ResponseData';

const putProductHandler = async (
    req: ExtendedRequest,
    res: NextApiResponse<ResponseData>
) => {
    const { method } = req;
    const { id } = req.query;
    const { name, description, image, price } = req.body;
    const {
        data: { student_id },
    } = req.user;

    try {
        const { Product } = db.models;
        if (method !== 'POST') throw new UserRequestError('Bad Request.');

        const productData: any = await Product.findByPk(Number(id));
        if (!productData) throw new NotFoundError('Product not found.');

        productData.set({
            name: name,
            description: description,
            image: image,
            price: price,
        });

        await productData.save();

        res.status(200).json({
            status: true,
            message: 'Successfully update product info.',
            data: productData,
        });
    } catch (error: any) {
        res.status(error.HTTPErrorCode || 500).json({
            status: false,
            message: error.message || 'An error has occured.',
        });
    }
};

export default auth(putProductHandler);
