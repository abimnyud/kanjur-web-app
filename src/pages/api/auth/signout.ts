import { UserRequestError } from '@class/CustomError';
import cookies from '@middlewares/cookie';
import auth from '@middlewares/authorization';
import type { ExtendedRequest } from '@middlewares/authorization';
import type { ResponseData, ExtendedResponse } from '@middlewares/cookie';

const signOutHandler = async (
    req: ExtendedRequest,
    res: ExtendedResponse<ResponseData>
) => {
    const { method } = req;

    try {
        if (method !== 'POST') throw new UserRequestError('Bad Request.');

        res.cookie('token', 'deleted', {
            maxAge: 0,
            path: '/',
        });
        res.end();
    } catch (error: any) {
        res.status(error.HTTPErrorCode || 500).json({
            status: false,
            message: error.message || 'An error has occured.',
        });
    }
};

export default auth(cookies(signOutHandler));
