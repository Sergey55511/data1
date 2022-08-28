import { NextApiResponse } from 'next';
import { MyError } from '../../Classes/error';

export const resError = (err: any, res: NextApiResponse) => {
    const error = err as MyError;
    res.status(error.status).json({ message: error.message });
};
