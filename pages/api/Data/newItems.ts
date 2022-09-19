import type { NextApiRequest, NextApiResponse } from 'next';
import { getService } from '../../../Backend/Data/Services/get';
import { postNewItems } from '../../../Backend/Data/Requests/Data/postNewItems';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    getService<any>({
        req,
        res,
        fetch: () => postNewItems(req.body),
    });
}
