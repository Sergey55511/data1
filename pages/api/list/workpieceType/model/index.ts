import type { NextApiRequest, NextApiResponse } from 'next';
import { getWorkpieceTypeModel } from '../../../../../Backend/Data/Requests/workpieceType/Model/get';
import { fetchService } from '../../../../../Backend/Data/Services/fetch';
import { tPrisma } from '../../../../../Backend/types';
import { iUser } from '../../../../../Shared/Types/interfaces';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET': {
            await fetchService<iUser>({
                req,
                res,
                fetch: (prisma: tPrisma) => getWorkpieceTypeModel(prisma),
            });
            break;
        }
    }
}
