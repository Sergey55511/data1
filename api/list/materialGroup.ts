import type { NextApiRequest, NextApiResponse } from 'next';
import { getMaterialGroup } from '../../../Backend/Data/Requests/MaterialGroup/get';
import { fetchService } from '../../../Backend/Data/Services/fetch';
import { iMaterialGroup } from '../../../Shared/Types/interfaces';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET': {
            await fetchService<iMaterialGroup>({
                req,
                res,
                fetch: getMaterialGroup,
            });
            break;
        }
    }
}
