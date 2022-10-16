import type { NextApiRequest, NextApiResponse } from 'next';
import { getRecipient } from '../../../Backend/Data/Requests/recipient/get';
import { postRecipient } from '../../../Backend/Data/Requests/recipient/post';
import { fetchService } from '../../../Backend/Data/Services/fetch';
import { iUser } from '../../../Shared/Types/interfaces';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET': {
            await fetchService<iUser>({
                req,
                res,
                fetch: () => getRecipient(req),
            });
            break;
        }
        case 'POST': {
            await fetchService<iUser>({
                req,
                res,
                fetch: () => postRecipient(req.body),
            });
            break;
        }
    }
}
