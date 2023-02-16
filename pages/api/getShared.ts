import { NextApiRequest, NextApiResponse } from 'next';
import { moveIn } from '../../Backend/Data/Link/MoveIn';
import { resError } from '../../Shared/Helpers';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        await moveIn(req);
        console.log('hello');

        res.status(200).json({ message: 'all good' });
    } catch (err) {
        console.log('err', err);

        resError(err, res);
    }
}
