import { tPrisma } from '../../../Backend/types';
import { updateTable } from '../updateTable';
import { data } from './data';

export const length = async (prisma: tPrisma) => {
    await updateTable(prisma, 'length', data);
};
