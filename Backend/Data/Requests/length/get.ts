import { NextApiRequest } from 'next';
import { tPrisma } from '../../../types';

export const getLength = <T>(prisma: tPrisma, req: NextApiRequest): Promise<T> => {
    const sizeRangeId = req.query.sizeRangeId;
    return prisma.length.findMany({
        select: {
            id: true,
            length: true,
        },
        where: {
            active: true,
            SizeRangeLengthBridge: sizeRangeId
                ? {
                      some: { sizeRangeId: +sizeRangeId },
                  }
                : undefined,
        },
        orderBy: { length: 'asc' },
    }) as any;
};
