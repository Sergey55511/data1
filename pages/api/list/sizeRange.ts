import type { NextApiRequest, NextApiResponse } from 'next';
import { getSizeRange } from '../../../Data/Requests/SizeRange/get';
import { getService } from '../../../Data/Services/get';
import { iSizeRange } from '../../../Store/interfaces';

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
