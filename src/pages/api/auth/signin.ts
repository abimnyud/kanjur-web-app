import type { NextApiRequest, NextApiResponse } from 'next';
import * as argon2 from 'argon2';
import {
    UserRequestError,
    NotFoundError,
    UnauthorizedError,
} from '@class/CustomError';
import db from '@connection';
import cookies from '@middlewares/cookie';
import type { ResponseData, ExtendedResponse } from '@middlewares/cookie';
const jwt = require('jsonwebtoken');

const signInHandler = async (
    req: NextApiRequest,
    res: ExtendedResponse<ResponseData>
) => {
    try {
        if (typeof req.body === 'string') req.body = JSON.parse(req.body);

        const { method } = req;
        const { student_id, password } = req.body;
        const { User } = db.models;
        if (method !== 'POST' || !student_id || !password)
            throw new UserRequestError('Bad Request.');

        const userData: any = await User.scope('getPassword').findByPk(
            student_id
        );

        if (!userData) throw new NotFoundError('User not found.');

        // Check password
        const isValid: boolean = await argon2.verify(
            userData.password,
            password
        );

        if (!isValid) throw new UnauthorizedError('Invalid credentials.');

        // Sign jwt, delete unused key
        const userDataArgs: object = {
            student_id: userData.student_id,
            name: userData.name,
        };

        const token: string = jwt.sign(
            { data: userDataArgs },
            process.env.SECRET_KEY,
            {
                expiresIn: '1h',
            }
        );

        res.cookie('token', `Bearer ${token}`, {
            httpOnly: process.env.APP_ENV === 'production',
            secure: process.env.APP_ENV === 'production',
            maxAge: 3600,
            path: '/',
        });

        res.status(200).json({
            status: true,
            message: 'Sign in success.',
            data: userDataArgs,
        });
    } catch (error: any) {
        res.status(error.HTTPErrorCode || 500).json({
            status: false,
            message: error.message || 'An error has occured.',
        });
    }
};

export default cookies(signInHandler);
