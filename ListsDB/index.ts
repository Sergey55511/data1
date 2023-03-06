import { PrismaClient } from '@prisma/client';
import { tPrisma } from '../Backend/types';
import { workpieceType } from './WorkpieceType';

const prisma1 = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL1,
        },
    },
});
// const prisma2 = new PrismaClient({
//     datasources: {
//         db: {
//             url: process.env.DATABASE_URL2,
//         },
//     },
// });

export const createList = async (prisma: tPrisma, url = '') => {
    console.log('process.env.DATABASE_URL1', process.env.DATABASE_URL1);

    await workpieceType(prisma);
    console.log(`url done`, url);
};

createList(prisma1, process.env.DATABASE_URL1);
// createList(prisma2, process.env.DATABASE_URL2);
