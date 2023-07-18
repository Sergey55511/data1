import { PrismaPromise } from '@prisma/client';
import moment from 'moment';
import { NextApiRequest } from 'next';
import { OPERATIONS } from '../../../../../Shared/constants';
import { iUser } from '../../../../../Shared/Types/interfaces';
import { tPrisma } from '../../../../types';
import { fullModelSQL } from '../../Data/constants';
import { dal } from './Dal';

export const getMoveInDocument = <T>(
    prisma: tPrisma,
    req: NextApiRequest,
    user: iUser,
): PrismaPromise<T> => {
    const data = dal(req.query);

    const storeId = +user.storeId;
    return prisma.data.groupBy({
        by: ['date', 'lot', 'numDocument'],
        where: {
            date: { lte: new Date(data.end), gte: new Date(data.start) },
            lot: data.lot,
            storeId,
            numDocument: { not: null },
            operationId: OPERATIONS.purchase.id,
        },
        orderBy: { date: 'desc' },
    }) as any;
};
