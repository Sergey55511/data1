import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchService } from '../../../Backend/Data/Services/fetch';
import { postNewItems } from '../../../Backend/Data/Requests/Data/postNewItems';
import { validateLeftovers } from '../../../Backend/Data/Validation/Data/ValidateLeftovers';
import { iData } from '../../../Shared/Types/interfaces';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await fetchService<iData>({
        req,
        res,
        validation: () => validateLeftovers(req),
        fetch: () => postNewItems([req.body]),
    });
}
