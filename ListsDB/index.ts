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
const prisma2 = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL2,
        },
    },
});

export const createList = async (prisma: tPrisma, url = '') => {
    const data = await prisma.data.findMany();
    await workpieceType(prisma);
    await prisma.data.deleteMany();
    await prisma.data.createMany({ data });
    console.log(`url done`, url);
};

createList(prisma1, process.env.DATABASE_URL1);
// createList(prisma2, process.env.DATABASE_URL2);
