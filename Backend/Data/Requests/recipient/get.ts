import { PrismaClient } from '@prisma/client';

export const getRecipient = <T>(): Promise<T> => {
    const prisma = new PrismaClient();
    return prisma.recipients.findMany({
        select: {
            id: true,
            recipient: true,
        },
        where: { active: true },
        orderBy: { id: 'desc' },
    }) as any;
};
