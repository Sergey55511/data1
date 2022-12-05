import type { NextApiRequest, NextApiResponse } from 'next';
import { mixingGrade } from '../../../../Backend/Data/Requests/Data/Mixing/grade';
import { fetchService } from '../../../../Backend/Data/Services/fetch';
import { validateLeftovers } from '../../../../Backend/Data/Validation/Data/ValidateLeftovers';
import { tPrisma } from '../../../../Backend/types';
import { iData } from '../../../../Shared/Types/interfaces';

export default async function (req: NextApiRequest, res: NextApiResponse) {
    await fetchService<iData>({
        req,
        res,
        validation: (prisma: tPrisma) => validateLeftovers(prisma, req),
        fetch: (prisma: tPrisma) => mixingGrade(prisma, req.body.data as iData[]),
        isSendUsersNewMaxId: true,
    });
}
