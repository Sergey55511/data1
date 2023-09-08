import { tPrisma } from '../../../Backend/types';
import { updateTable } from '../updateTable';
import { data } from './data';

export const storeOperationsBridge = async (prisma: tPrisma) => {
    await updateTable(prisma, 'storeOperationsBridge', data);    
};
