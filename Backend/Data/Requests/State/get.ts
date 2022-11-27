import { PrismaPromise } from '@prisma/client';
import isArray from 'lodash/isArray';
import { NextApiRequest } from 'next';
import { tPrisma } from '../../../types';

export const getState = <T>(prisma: tPrisma, req: NextApiRequest): PrismaPromise<T> => {
    let stateId: number[] | undefined = undefined;
    if (isArray(req.query['stateId[]'])) {
        stateId = req.query['stateId[]'].map((item) => +item);
    }

    return prisma.state.findMany({
        select: { id: true, state: true },
        where: { active: true, id: { in: stateId } },
        orderBy: { id: 'asc' },
    }) as any;
};
