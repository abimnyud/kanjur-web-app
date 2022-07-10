import type { NextApiRequest, NextApiResponse } from 'next';
import { UserRequestError, NotFoundError } from '@class/CustomError';
import db from '@connection';
import ResponseData from '@/types/ResponseData';

const getProductHandler = async (
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) => {
    const { method } = req;
    const { id } = req.query;

    try {
        const { Product } = db.models;
        if (method !== 'GET' || !id) throw new UserRequestError('Bad Request.');

        const productData: any = await Product.scope('full').findByPk(`${id}`);

        if (!productData) throw new NotFoundError('Product not found.');

        // delete seller_id from payload
        delete productData.dataValues.seller_id;

        res.status(200).json({
            status: true,
            message: 'Successfully retrieve a product.',
            data: productData,
        });
    } catch (error: any) {
        res.status(error.HTTPErrorCode || 500).json({
            status: false,
            message: error.message || 'An error has occured.',
        });
    }
};

export default getProductHandler;
