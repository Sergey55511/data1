import type { NextApiRequest, NextApiResponse } from 'next';
import { inventory } from '../../../Backend/Data/Requests/Data/inventory';
import { fetchService } from '../../../Backend/Data/Services/fetch';
import { validateLeftovers } from '../../../Backend/Data/Validation/Data/ValidateLeftovers';
import { tPrisma } from '../../../Backend/types';
import { iData } from '../../../Shared/Types/interfaces';

export default async function inventoryFoo(req: NextApiRequest, res: NextApiResponse) {
    await fetchService<iData>({
        req,
        res,
        validation: (prisma, user) => validateLeftovers(prisma, req, user),
        fetch: (prisma: tPrisma) => inventory(prisma, req.body.data as iData[]),
        isSendUsersNewMaxId: true,
    });
}
