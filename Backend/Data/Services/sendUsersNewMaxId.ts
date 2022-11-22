import axios from 'axios';
import { MyError } from '../../../Shared/Classes/error';
import { tPrisma } from '../../types';
import { getMaxId } from '../Requests/Data/getMaxId';

export const sendUsersNewMaxId = async (
    prisma: tPrisma,
    storeId?: string | undefined,
) => {
    if (!storeId) throw new MyError(400, 'empty storeId sendUsersNewMaxId');
    const maxId = await getMaxId(prisma, +storeId);
    const room = `store_${storeId}`;

    const socketUrl = process.env.NODE_ENV=='development'?'tdata1.ru': 'socketservice';

    axios({
        url: `http://${socketUrl}:5000/sendMessage`,
        method: 'POST',
        data: {
            room,
            maxId,
        },
    });
};
