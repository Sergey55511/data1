import { tPrisma } from '../../../Backend/types';
import { updateTable } from '../updateTable';
import { data } from './data';

export const grade = async (prisma: tPrisma) => {
    await updateTable(prisma, 'grade', data);
};
