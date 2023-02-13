import { PrismaPromise } from '@prisma/client';
import striptags from 'striptags';
import { MyError } from '../../../../Shared/Classes/error';
import { iUser } from '../../../../Shared/Types/interfaces';
import { tPrisma } from '../../../types';

export const postProductions = <T>(
    prisma: tPrisma,
    data: {
        descriprion: string;
        storeId: number;
    },
    user: iUser,
): PrismaPromise<T> => {
    const cleanDescriprion = striptags(data?.descriprion);
    if (!cleanDescriprion) throw new MyError(400);
    return prisma.productions.create({
        data: { description: cleanDescriprion, storeId: user.storeId },
    }) as any;
};
