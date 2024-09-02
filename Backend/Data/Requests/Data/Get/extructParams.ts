import { iUser } from '../../../../../Shared/Types/interfaces';
import type { NextApiRequest } from 'next';
import { MyError } from '../../../../../Shared/Classes/error';

export const extructParams = ({ req, user }: { req: NextApiRequest; user: iUser }) => {
    const storeId = user.storeId;
    const pp = req.query.pp ? +req.query.pp : undefined;
    if (!pp) throw new MyError(400, 'field pp not set');
    return { storeId, pp };
};
