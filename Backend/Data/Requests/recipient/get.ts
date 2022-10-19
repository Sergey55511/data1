import { NextApiRequest } from 'next';
import { tPrisma } from '../../../types';

export const getRecipient = <T>(prisma: tPrisma, req: NextApiRequest): Promise<T> => {
    let storeId = req.query.storeId as number | undefined;
    storeId = storeId ? +storeId : undefined;
    let where: any = { storeId: null, active: true };
    if (storeId) {
        where = {
            AND: [
                { NOT: { storeId: storeId } },
                { NOT: { storeId: undefined } },
                { active: true },
            ],
        };
    }
    return prisma.recipients.findMany({
        select: {
            id: true,
            recipient: true,
        },
        where,
        orderBy: { id: 'desc' },
    }) as any;
};
