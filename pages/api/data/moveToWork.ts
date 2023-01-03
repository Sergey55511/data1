import type { NextApiRequest, NextApiResponse } from 'next';
import { postNewItems } from '../../../Backend/Data/Requests/Data/postNewItems';
import { fetchService } from '../../../Backend/Data/Services/fetch';
import { validateLeftovers } from '../../../Backend/Data/Validation/Data/ValidateLeftovers';
import { tPrisma } from '../../../Backend/types';
import { iData } from '../../../Shared/Types/interfaces';

export default async function moveToWork(req: NextApiRequest, res: NextApiResponse) {
    await fetchService<iData>({
        req,
        res,
        validation: (prisma: tPrisma) => validateLeftovers(prisma, req),
        fetch: (prisma: tPrisma) =>
            postNewItems(
                prisma,
                req.body.data as iData[],
                req.body.isSetNewPP,
                req.body.isSetArticleId,
            ),
        isSendUsersNewMaxId: true,
    });
}
