import { tPrisma } from '../../../../types';
import { dal } from './Dal';

export const patchManagers = <T>(prisma: tPrisma, params: any): Promise<T> => {
    const data = dal(params);
    const id = data.id;
    const props = data.params;
    return prisma.managers.update({ data: props, where: { id } }) as any;
};