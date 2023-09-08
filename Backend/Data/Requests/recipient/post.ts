import { tPrisma } from '../../../types';

export const postRecipient = <T>(
    prisma: tPrisma,
    data: { recipient: string }[],
): Promise<T> => {
    return prisma.recipients.createMany({
        data,
        skipDuplicates: true,
    }) as any;
};
