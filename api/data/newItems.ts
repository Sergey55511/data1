import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchService } from '../../../Backend/Data/Services/fetch';
import { postNewItems } from '../../../Backend/Data/Requests/Data/postNewItems';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await fetchService<any>({
        req,
        res,
        fetch: () => postNewItems(req.body,false),
    });
}
