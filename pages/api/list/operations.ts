import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchService } from '../../../Backend/Data/Services/fetch';
import { iOperation } from '../../../Shared/Types/interfaces';
import { getOperations } from '../../../Backend/Data/Requests/Operations/get';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const storeId: number = +req.query.storeId!;
    const stateId: number = +req.query.stateId!;
    switch (req.method) {
        case 'GET': {
            await fetchService<iOperation>({
                req,
                res,
                fetch: () => getOperations(storeId, stateId),
            });
            break;
        }
    }
}
