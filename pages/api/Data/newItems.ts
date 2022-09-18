import type { NextApiRequest, NextApiResponse } from 'next';
import { getService } from '../../../Data/Services/get';
import { postNewItems } from '../../../Data/Requests/Data/postNewItems';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    getService<any>({
        req,
        res,
        fetch: () => postNewItems(req.body),
    });
}
