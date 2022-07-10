import type { NextApiResponse } from 'next';
import { UserRequestError, NotFoundError } from '@class/CustomError';
import db from '@connection';
import auth from '@middlewares/authorization';
import sum from '@functions/sum';
import type { ExtendedRequest } from '@middlewares/authorization';
import { Op } from 'sequelize';
const qs = require('qs');
import ResponseData from '@/types/ResponseData';

const postProductHandler = async (
    req: ExtendedRequest,
    res: NextApiResponse<ResponseData>
) => {
    const { method } = req;
    const { cart, deposit } = JSON.parse(req.body);

    const {
        data: { student_id },
    } = req.user;

    try {
        const { Product, Transaction, User } = db.models;

        if (method !== 'POST' || cart.length === 0)
            throw new UserRequestError('Bad Request.');

        let productsData: any = await Product.findAll({
            where: {
                id: {
                    [Op.in]: cart,
                },
            },
        });

        // If no product found, throw error
        if (productsData.length === 0)
            throw new NotFoundError('Product not found.');

        const total_price = Number(await sum(productsData));

        // Get latest balance
        let latestBalance: any = await Transaction.scope(
            'latestBalance'
        ).findOne();

        const balance = !latestBalance ? 0 : Number(latestBalance.balance);

        // Add to transactions
        const transactionData = await Transaction.create({
            student_id,
            total_price: total_price,
            deposit: deposit,
            balance: balance + deposit,
            flag: deposit < total_price,
        });

        if (deposit > total_price) {
            await User.increment('deposit', {
                by: deposit - total_price,
                where: { student_id },
            });
        } else if (deposit < total_price) {
            await User.increment('debt', {
                by: total_price - deposit,
                where: { student_id },
            });
        }

        // soft delete products
        await Product.destroy({ where: { id: { [Op.in]: cart } } });

        productsData.map(async (product: any) => {
            // set transaction_id to product
            product.$set('transaction', transactionData);
            await product.save();

            // Add to seller's revenue
            await User.increment('revenue', {
                by: product.price,
                where: {
                    student_id: product.seller_id,
                },
            });
        });

        res.status(201).json({
            status: true,
            message: 'Successfully buy product.',
            data: transactionData,
        });
    } catch (error: any) {
        res.status(error.HTTPErrorCode || 500).json({
            status: false,
            message: error.message || 'An error has occured.',
        });
    }
};

export default auth(postProductHandler);
