import { PrismaClient } from '@prisma/client';
import { workpieceType } from './WorkpieceType';
import { data } from './WorkpieceType/data';

const prisma = new PrismaClient();

export const createList = async () => {
    await workpieceType(prisma);
};
