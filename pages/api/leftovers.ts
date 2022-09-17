import type { NextApiRequest, NextApiResponse } from 'next';
import { getService } from '../../Data/Services/get';
import { leftovers } from '../../Data/Requests/Data/leftovers';
import { iLeftovers } from '../../Store/interfaces';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    getService<iLeftovers>({
        req,
        res,
        fetch: leftovers,
    });
}
