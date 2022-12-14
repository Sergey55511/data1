import { NextApiRequest, NextApiResponse } from 'next';
import { resError } from '../../Shared/Helpers';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        res.status(200).json(process?.env?.APP_VERSION || 0);
    } catch (err) {
        resError(err, res);
    }
}
