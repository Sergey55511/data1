import { tPrisma } from '../../../Backend/types';
import { updateTable } from '../updateTable';
import { data } from './data';

export const workpieceType = async (prisma: tPrisma) => {
    await updateTable(prisma, 'workpieceType', data);
};
