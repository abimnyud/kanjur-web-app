import type { NextApiResponse } from 'next';
import { UserRequestError } from '@class/CustomError';
import db from '@connection';
import auth from '@middlewares/authorization';
import type { ExtendedRequest } from '@middlewares/authorization';
import ResponseData from '@/types/ResponseData';

const postProductHandler = async (
    req: ExtendedRequest,
    res: NextApiResponse<ResponseData>
) => {
    const { method } = req;
    const { name, description, image, price } = JSON.parse(req.body);
    const {
        data: { student_id },
    } = req.user;

    try {
        const { Product } = db.models;
        if (method !== 'POST') throw new UserRequestError('Bad Request.');

        const createdProduct: any = await Product.create({
            name,
            description,
            image,
            price,
            seller_id: student_id,
        });

        // remove student ID from payload
        delete createdProduct.dataValues.student_id;

        res.status(201).json({
            status: true,
            message: 'Successfully create new product.',
            data: createdProduct,
        });
    } catch (error: any) {
        res.status(error.HTTPErrorCode || 500).json({
            status: false,
            message: error.message || 'An error has occured.',
        });
    }
};

export default auth(postProductHandler);
