import { tPrisma } from '../../../Backend/types';
import { data } from './data';

export const bridge = async (prisma: tPrisma) => {
    await prisma.$queryRaw`DELETE FROM public."Bridge"`;
    await prisma.bridge.createMany({ data });
};
