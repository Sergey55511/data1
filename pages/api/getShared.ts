import { NextApiRequest, NextApiResponse } from 'next';
import { moveIn } from '../../Backend/Data/Link/MoveIn';
import { resError } from '../../Shared/Helpers';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        await moveIn(req);

        res.status(200).json({ message: 'all good' });
    } catch (err) {
        resError(err, res);
    }
}
