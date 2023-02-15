import { tPrisma } from '../../Backend/types';
import { data } from './data';

export const workpieceType = async (prisma: tPrisma) => {
    await prisma.$queryRaw`DELETE FROM public."WorkpieceType"`;
    await prisma.workpieceType.createMany({ data });
};
