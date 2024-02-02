import { NextApiRequest, NextApiResponse } from 'next';
import { logger } from '../../Backend/Helpers/logger';
import { resError } from '../../Shared/Helpers';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        res.status(200).json(process?.env?.CONTAINER_NAME || '');
    } catch (err) {
        resError(err, res);
    } finally {
        logger(res);
    }
}
