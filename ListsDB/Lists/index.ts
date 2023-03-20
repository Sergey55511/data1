import { PrismaClient } from '@prisma/client';
import { grade } from './Grade';
import { workpieceType } from './WorkpieceType';

const prismaList = [
    new PrismaClient({
        datasources: {
            db: {
                url: process.env.DATABASE_URL1,
            },
        },
    }),
    new PrismaClient({
        datasources: {
            db: {
                url: process.env.DATABASE_URL2,
            },
        },
    }),
    new PrismaClient({
        datasources: {
            db: {
                url: process.env.DATABASE_URL3,
            },
        },
    }),
    new PrismaClient({
        datasources: {
            db: {
                url: process.env.DATABASE_URL4,
            },
        },
    }),
];

const logDone = (listName: string) => console.log(`done ${listName}`);
export const switcherUpdateList = async (foder: string) => {
    switch (foder) {
        case 'WorkpieceType':
            await Promise.all(prismaList.map((prisma) => workpieceType(prisma)));
            logDone(foder);
            break;
        case 'Grade':
            await Promise.all(prismaList.map((prisma) => grade(prisma)));
            logDone(foder);
            break;
    }
};
