import { NextApiRequest, NextApiResponse } from 'next';
import { UserRequestError, UnauthorizedError } from '@class/CustomError';
import db from '@connection';
const jwt = require('jsonwebtoken');

export type ExtendedRequest = NextApiRequest & {
    user: any;
};

export type ExtendedResponse<T> = NextApiResponse & {
    cookie: any;
};

export type ResponseData = {
    status: boolean;
    message: string;
    data?: object;
};

const auth =
    (handler: Function) =>
    (req: ExtendedRequest, res: ExtendedResponse<ResponseData>) => {
        try {
            // const { User } = db.models;
            const { token } = req.cookies;

            if (!token) throw new UnauthorizedError('Unauthorized.');

            const bearerToken = token.split(' ')[1];

            if (!bearerToken) throw new UnauthorizedError('Unauthorized.');

            jwt.verify(
                bearerToken,
                process.env.SECRET_KEY,
                (err: any, decoded: any) => {
                    if (err) throw new UserRequestError('Invalid token.');

                    req.user = decoded;
                }
            );
        } catch (error: any) {
            return res.status(error.HTTPErrorCode || 500).json({
                status: false,
                message: error.message || 'An error has occured.',
            });
        }

        return handler(req, res);
    };

export default auth;
