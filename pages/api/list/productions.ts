import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchService } from '../../../Backend/Data/Services/fetch';
import { iOperation } from '../../../Shared/Types/interfaces';
import { getProductions } from '../../../Backend/Data/Requests/Productions/get';
import { postProductions } from '../../../Backend/Data/Requests/Productions/post';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET': {
            await fetchService<iOperation>({
                req,
                res,
                fetch: () => getProductions(+req.query.storeId!),
            });
            break;
        }
        case 'POST': {
            const description:string=req.body.description
            await fetchService<iOperation>({
                req,
                res,
                fetch: () =>
                    postProductions({
                        descriprion: description,
                        storeId: req.body.storeId,
                    }),
            });
            break;
        }
    }
}
