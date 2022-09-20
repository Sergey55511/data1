import { PrismaPromise } from '@prisma/client';
import { PrismaClient } from '@prisma/client';
import striptags from 'striptags';
import { MyError } from '../../../../Shared/Classes/error';

export const postProductions = <T>(data: {
    descriprion: string;
    storeId: number;
}): PrismaPromise<T> => {
    const prisma = new PrismaClient();
    const cleanDescriprion = striptags(data?.descriprion);
    if (!cleanDescriprion) throw new MyError(400);
    return prisma.productions.create({
        data: { description: cleanDescriprion, storeId: data.storeId },
    }) as any;
};
