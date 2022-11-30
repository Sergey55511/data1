import { tPrisma } from '../../../../types';
import { dal } from './Dal';

export const getManagers = <T>(prisma: tPrisma, params: any): Promise<T> => {
    const data = dal(params);

    return prisma.managers.create({ data }) as any;
};
