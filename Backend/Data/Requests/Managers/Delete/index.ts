import { tPrisma } from '../../../../types';
import { dal } from './Dal';

export const deleteManager = <T>(prisma: tPrisma, params: any): Promise<T> => {
    const data = dal(params);

    return prisma.managers.update({
        data: { active: false },
        where: { id: data.managerId },
    }) as any;
};
