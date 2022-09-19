import type { NextApiRequest, NextApiResponse } from 'next';
import { getSizeRange } from '../../../Backend/Data/Requests/SizeRange/get';
import { getService } from '../../../Backend/Data/Services/get';
import { iSizeRange } from '../../../Shared/Types/interfaces';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET': {
            getService<iSizeRange>({
                req,
                res,
                fetch: getSizeRange,
            });
        }
    }
}
