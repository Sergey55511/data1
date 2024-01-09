import type { NextApiRequest, NextApiResponse } from 'next';
import { postNewItems } from '../../../Backend/Data/Requests/Data/postNewItems';
import { fetchService } from '../../../Backend/Data/Services/fetch';
import { validateLeftovers } from '../../../Backend/Data/Validation/Data/ValidateLeftovers';
import { tPrisma } from '../../../Backend/types';
import { iDataTable } from '../../../Shared/Types/interfaces';

export default async function moveToWork(req: NextApiRequest, res: NextApiResponse) {
    await fetchService<iDataTable>({
        req,
        res,
        validation: (prisma, user) => validateLeftovers(prisma, req, user),
        fetch: (prisma: tPrisma) => postNewItems(prisma, req),
        isSendUsersNewMaxId: true,
    });
}
