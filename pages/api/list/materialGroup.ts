import type { NextApiRequest, NextApiResponse } from 'next';
import { getMaterialGroup } from '../../../Backend/Data/Requests/MaterialGroup/get';
import { getService } from '../../../Backend/Data/Services/get';
import { iMaterialGroup } from '../../../Shared/Types/interfaces';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET': {
            getService<iMaterialGroup>({
                req,
                res,
                fetch: getMaterialGroup,
            });
        }
    }
}
