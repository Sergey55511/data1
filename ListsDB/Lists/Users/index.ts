import { tPrisma } from '../../../Backend/types';
import { updateTable } from '../updateTable';
import { data } from './data';

export const users = async (prisma: tPrisma) => {
    await updateTable(prisma, 'users', data);
};
