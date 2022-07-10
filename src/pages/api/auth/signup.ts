import type { NextApiRequest } from 'next';
import { UserRequestError } from '@class/CustomError';
import db from '@connection';
import cookies from '@middlewares/cookie';
import type { ResponseData, ExtendedResponse } from '@middlewares/cookie';
const jwt = require('jsonwebtoken');

const signUpHandler = async (
    req: NextApiRequest,
    res: ExtendedResponse<ResponseData>
) => {
    try {
        const { method } = req;

        if (typeof req.body === 'string') req.body = JSON.parse(req.body);
        const { student_id, name, password } = req.body;

        const { User } = db.models;

        if (method !== 'POST' || !student_id || !name || !password)
            throw new UserRequestError('Bad Request.');

        const isExists = await User.findByPk(student_id);

        if (isExists !== null)
            throw new UserRequestError('User already exists.');

        const newUserData: any = await User.create({
            student_id,
            name,
            password,
        });

        // Sign jwt, delete unused key
        const userDataArgs: object = {
            student_id: newUserData.student_id,
            name: newUserData.name,
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

        res.status(201).json({
            status: true,
            message: 'Successfully create new user.',
            data: userDataArgs,
        });
    } catch (error: any) {
        res.status(error.HTTPErrorCode || 500).json({
            status: false,
            message: error.message || 'An error has occured.',
        });
    }
};

export default cookies(signUpHandler);
