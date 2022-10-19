import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchService } from '../../../../Backend/Data/Services/fetch';
import { getShared } from '../../../../Backend/Data/Requests/Data/Shared/get';
import { postMoveIn } from '../../../../Backend/Data/Requests/Data/Shared/post';
import { postMoveInValidation } from '../../../../Backend/Data/Validation/Data/Shared/postMoveInValidation';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET': {
            await fetchService({
                req,
                res,
                fetch: () => getShared(+req.query.storeId! as number),
            });
            break;
        }
        case 'POST': {
            await fetchService({
                req,
                res,
                validation: () => postMoveInValidation(req),
                fetch: () => postMoveIn(req.body),
            });
            break;
        }
    }
}
