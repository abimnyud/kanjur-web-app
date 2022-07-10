import { serialize, CookieSerializeOptions } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * This sets `cookie` on `res` object
 */
const cookie = (
    res: NextApiResponse,
    name: string,
    value: unknown,
    options: CookieSerializeOptions = {}
) => {
    const stringValue =
        typeof value === 'object'
            ? 'j:' + JSON.stringify(value)
            : String(value);

    if (typeof options.maxAge === 'number') {
        options.expires = new Date(Date.now() + options.maxAge * 1000);
    }

    res.setHeader('Set-Cookie', serialize(name, String(stringValue), options));
};

/**
 * Adds `cookie` function on `res.cookie` to set cookies for response
 */

export type ExtendedResponse<T> = NextApiResponse & {
    cookie: Function;
};

export type ResponseData = {
    status: boolean;
    message: string;
    data?: object;
    token?: string;
};

const cookies =
    (handler: Function) =>
    (req: NextApiRequest, res: ExtendedResponse<ResponseData>) => {
        res.cookie = (
            name: string,
            value: unknown,
            options: CookieSerializeOptions = {}
        ) => cookie(res, name, value, options);

        return handler(req, res);
    };

export default cookies;
