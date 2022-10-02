import type { NextApiRequest, NextApiResponse } from 'next';
import { getFraction } from '../../../Backend/Data/Requests/Fraction/get';
import { fetchService } from '../../../Backend/Data/Services/fetch';
import { iFraction, iSizeRange } from '../../../Shared/Types/interfaces';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET': {
            await fetchService<iFraction>({
                req,
                res,
                fetch: getFraction,
            });
            break;
        }
    }
}
