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
                fetch: (prisma, user) => getProductions(prisma, user),
            });
            break;
        }
        case 'POST': {
            const description: string = req.body.description;
            await fetchService<iOperation>({
                req,
                res,
                fetch: (prisma: tPrisma, user) =>
                    postProductions(
                        prisma,
                        {
                            descriprion: description,
                            storeId: user.storeId,
                        },
                        user,
                    ),
            });
            break;
        }
    }
}
