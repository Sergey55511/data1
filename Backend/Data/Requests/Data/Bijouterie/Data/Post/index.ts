import { NextApiRequest } from 'next';
import { STORES } from '../../../../../../../Shared/constants';
import { iUser } from '../../../../../../../Shared/Types/interfaces';
import { tPrisma } from '../../../../../../types';
import { dal } from './Dal';

export const postDataBijouterie = (prisma: tPrisma, req: NextApiRequest, user: iUser) => {
    if (user.storeId != STORES.Moscow.id) return [] as any;
    const data = dal(req.body);

    return prisma.dataBijouterie.createMany({
        data: { ...data, storeId: user.storeId, userId: user.id! },
    }) as any;
};
