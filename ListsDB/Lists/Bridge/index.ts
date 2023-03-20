import { tPrisma } from '../../../Backend/types';
import { data } from './data';

export const bridge = async (prisma: tPrisma) => {
    await prisma.bridge.delete({ where: {} });
    await prisma.bridge.createMany({ data });
};
