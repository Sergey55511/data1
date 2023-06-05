import { NextApiRequest } from 'next';
import { STORES } from '../../../../../../../Shared/constants';
import { iUser } from '../../../../../../../Shared/Types/interfaces';
import { tPrisma } from '../../../../../../types';
import { dal } from './Dal';

export const postMinorAccessory = (prisma: tPrisma, req: NextApiRequest, user: iUser) => {
    if (user.storeId != STORES.Moscow.id) return [] as any;
    const data = dal(req.query);
    return prisma.minorAccessoryData.createMany({
        data: {
            idAccessory: data.idAccessory,
            countIn: data.countIn,
            countOut: data.countOut,
            storeId: user.storeId,
        },
    }) as any;
};
