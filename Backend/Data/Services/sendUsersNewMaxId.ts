import axios from 'axios';
import { NextApiRequest } from 'next';
import { tPrisma } from '../../types';
import { getMaxId } from '../Requests/Data/getMaxId';

export const sendUsersNewMaxId = async (prisma: tPrisma, req: NextApiRequest) => {
    const method = req.method;
    let storeId = 0;
    switch (method) {
        case 'GET':
            storeId = +(req.query.storeId || 0);
            break;
        case 'POST':
            storeId = +(req.body.storeId || 0);
            break;
    }
    const maxId = await getMaxId(prisma, storeId);
    const room = `store_${storeId}`;

    axios({
        url: 'http://localhost:5000/sendMessage',
        method: 'POST',
        data: {
            room,
            maxId,
        },
    });
};
