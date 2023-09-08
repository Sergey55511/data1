import { tPrisma } from '../../../Backend/types';
import { updateTable } from '../updateTable';
import { data } from './data';

export const color = async (prisma: tPrisma) => {
    await updateTable(prisma, 'color', data);
};
