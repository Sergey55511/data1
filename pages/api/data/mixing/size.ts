import type { NextApiRequest, NextApiResponse } from 'next';
import { mixingSize } from '../../../../Backend/Data/Requests/Data/Mixing/size';
import { fetchService } from '../../../../Backend/Data/Services/fetch';
import { validateLeftovers } from '../../../../Backend/Data/Validation/Data/ValidateLeftovers';
import { tPrisma } from '../../../../Backend/types';
import { iData } from '../../../../Shared/Types/interfaces';

export default async function mixingGradeSize (req: NextApiRequest, res: NextApiResponse) {
    await fetchService<iData>({
        req,
        res,
        validation: (prisma: tPrisma) => validateLeftovers(prisma, req),
        fetch: (prisma: tPrisma) => mixingSize(prisma, req.body.data as iData[]),
        isSendUsersNewMaxId: true,
    });
}
