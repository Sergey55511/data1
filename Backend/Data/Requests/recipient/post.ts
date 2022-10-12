import { PrismaClient } from '@prisma/client';

export const postRecipient = <T>(data: { recipient: string }[]): Promise<T> => {
    const prisma = new PrismaClient();
    console.log('data', data);

    return prisma.recipients.createMany({
        data,
        skipDuplicates: true,
    }) as any;
};
