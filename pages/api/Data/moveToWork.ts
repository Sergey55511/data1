import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchService } from '../../../Backend/Data/Services/fetch';
import { postNewItems } from '../../../Backend/Data/Requests/Data/postNewItems';
import { validateLeftovers } from '../../../Backend/Data/Validation/Data/ValidateLeftovers';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    validateLeftovers(req);
    res.status(200).send('test');
    // await fetchService<any>({
    //     req,
    //     res,
    //     fetch: () => postNewItems(req.body),
    //     validation: () => 1,
    // });
}
