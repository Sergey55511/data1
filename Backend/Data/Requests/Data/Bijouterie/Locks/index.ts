import { NextApiRequest } from 'next';
import { STORES } from '../../../../../../Shared/constants';
import { iUser } from '../../../../../../Shared/Types/interfaces';
import { tPrisma } from '../../../../../types';
import { dal } from './Dal';

export const getLock = (prisma: tPrisma, req: NextApiRequest, user: iUser) => {
    if (user.storeId != STORES.Moscow.id) return [] as any;
    const data = dal(req.query);
    return prisma.locks.findMany({
        select: { id: true, color: true, material: true, size: true, type: true },
        where: { id: data.id },
    }) as any;
};
