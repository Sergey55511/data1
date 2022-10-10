import { PrismaClient } from '@prisma/client';
import { NextApiRequest } from 'next';

export const getLength = <T>(req: NextApiRequest): Promise<T> => {
    const prisma = new PrismaClient();
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
