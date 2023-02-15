import { tPrisma } from '../../Backend/types';
import { data } from './data';

export const workpieceType = async (prisma: tPrisma) => {
    await prisma.workpieceType.delete({ where: {} });
    await prisma.workpieceType.createMany({
        data: data as any,
    });
};
