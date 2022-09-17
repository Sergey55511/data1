import type { NextApiRequest, NextApiResponse } from 'next';
import { getService } from '../../../Data/Services/get';
import { leftovers } from '../../../Data/Requests/Data/leftovers';
import { iLeftovers } from '../../../Store/interfaces';
import { postNewItems } from '../../../Data/Requests/Data/postNewItems';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log('req.body', req.body);

    getService<any>({
        req,
        res,
        fetch: () => postNewItems(req.body),
    });
}
