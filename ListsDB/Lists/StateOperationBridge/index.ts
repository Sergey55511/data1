import { tPrisma } from '../../../Backend/types';
import { updateTable } from '../updateTable';
import { data } from './data';

export const stateOperationBridge = async (prisma: tPrisma) => {
    await updateTable(prisma, 'stateOperationBridge', data);
};
