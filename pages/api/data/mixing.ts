import type { NextApiRequest, NextApiResponse } from 'next';
import { mixing } from '../../../Backend/Data/Requests/Data/mixing';
import { fetchService } from '../../../Backend/Data/Services/fetch';
import { validateLeftovers } from '../../../Backend/Data/Validation/Data/ValidateLeftovers';
import { iData } from '../../../Shared/Types/interfaces';

export default async function moveToWork(req: NextApiRequest, res: NextApiResponse) {
    await fetchService<iData>({
        req,
        res,
        validation: () => validateLeftovers(req),
        fetch: () => mixing(req.body.data as iData[]),
    });
}
