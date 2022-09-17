import type { NextApiRequest, NextApiResponse } from 'next';
import { getMaterialGroup } from '../../../Data/Requests/MaterialGroup/get';
import { getService } from '../../../Data/Services/get';
import { iMaterialGroup } from '../../../Store/interfaces';

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
