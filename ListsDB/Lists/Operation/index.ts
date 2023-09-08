import { tPrisma } from '../../../Backend/types';
import { updateTable } from '../updateTable';
import { data } from './data';

export const operation = async (prisma: tPrisma) => {
    await updateTable(prisma, 'operations', data);
};
