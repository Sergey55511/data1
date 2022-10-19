import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchService } from '../../../Backend/Data/Services/fetch';
import { iOperation } from '../../../Shared/Types/interfaces';
import { getProductions } from '../../../Backend/Data/Requests/Productions/get';
import { postProductions } from '../../../Backend/Data/Requests/Productions/post';
import { tPrisma } from '../../../Backend/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET': {
            await fetchService<iOperation>({
                req,
                res,
                fetch: (prisma: tPrisma) => getProductions(prisma, +req.query.storeId!),
            });
            break;
        }
        case 'POST': {
            const description: string = req.body.description;
            await fetchService<iOperation>({
                req,
                res,
                fetch: (prisma: tPrisma) =>
                    postProductions(prisma, {
                        descriprion: description,
                        storeId: req.body.storeId,
                    }),
            });
            break;
        }
    }
}
