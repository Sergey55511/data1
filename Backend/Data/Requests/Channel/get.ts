import { PrismaPromise } from '@prisma/client';
import { NextApiRequest } from 'next';
import { tPrisma } from '../../../types';

export const getChannel = <T>(prisma: tPrisma, req: NextApiRequest): PrismaPromise<T> => {
    return prisma.channel.findMany({
        select: { id: true, channel: true },
        where: { active: true },
        orderBy: { id: 'asc' },
    }) as any;
};
