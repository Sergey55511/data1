import { PrismaClient } from '@prisma/client';
import { bridge } from './Bridge';
import { grade } from './Grade';
import { workpieceType } from './WorkpieceType';
import { state } from './State';
import { operation } from './Operation';
import { storeOperationsBridge } from './StoreOperationsBridge';
import { stateOperationBridge } from './StateOperationBridge';
import { length } from './Length';

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
    const disconnect = () => prismaList.forEach((prisma) => prisma.$disconnect());
    try {
        switch (foder) {
            case 'WorkpieceType':
                await Promise.all(prismaList.map((prisma) => workpieceType(prisma)));
                logDone(foder);
                break;
            case 'Grade':
                await Promise.all(prismaList.map((prisma) => grade(prisma)));
                logDone(foder);
                break;
            case 'Bridge':
                await Promise.all(prismaList.map((prisma) => bridge(prisma)));
                logDone(foder);
                break;
            case 'State':
                await Promise.all(prismaList.map((prisma) => state(prisma)));
                logDone(foder);
                break;
            case 'Operation':
                await Promise.all(prismaList.map((prisma) => operation(prisma)));
                logDone(foder);
                break;
            case 'StoreOperationsBridge':
                await Promise.all(
                    prismaList.map((prisma) => storeOperationsBridge(prisma)),
                );
                logDone(foder);
                break;
            case 'StateOperationBridge':
                await Promise.all(
                    prismaList.map((prisma) => stateOperationBridge(prisma)),
                );
                logDone(foder);
                break;
            case 'Length':
                await Promise.all(
                    prismaList.map((prisma) => length(prisma)),
                );
                logDone(foder);
                break;
        }
    } catch (err) {
        console.log('err', err);
        disconnect();
    }
    disconnect();
};
