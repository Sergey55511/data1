import { NextApiRequest } from 'next';
import { tPrisma } from '../../../../types';

export const getResultsAssemble = <T>(
    prisma: tPrisma,
    req: NextApiRequest,
): Promise<T> => {
    const typeAssemble = req.query.typeAssemble as string;

    return prisma.resultsAssemble.findMany({
        select: {
            id: true,
            resultAssemble: true,
        },
        where: {
            typeAssemble,
            active: true,
        },
        orderBy: { resultAssemble: 'asc' },
    }) as any;
};
