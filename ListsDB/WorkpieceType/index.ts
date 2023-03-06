import { tPrisma } from '../../Backend/types';
import { data } from './data';

export const workpieceType = async (prisma: tPrisma) => {
    await prisma.workpieceType.deleteMany();
    await prisma.workpieceType.createMany({ data });
};
