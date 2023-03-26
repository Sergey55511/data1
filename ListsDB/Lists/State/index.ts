import { tPrisma } from '../../../Backend/types';
import { updateTable } from '../updateTable';
import { data } from './data';

export const state = async (prisma: tPrisma) => {
    await updateTable(prisma, 'state', data);
};
