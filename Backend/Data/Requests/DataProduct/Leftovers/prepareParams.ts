import { NextApiRequest } from 'next';
import { iUser } from '../../../../../Shared/Types/interfaces';

export const prepareParams = ({ user, req }: { user: iUser; req: NextApiRequest }) => {
    const storeId = user.storeId;

    const workpieceTypeId = req.query.workpieceTypeId;

    const params: any[] = [storeId];

    if (workpieceTypeId != undefined) {
        params.push(+workpieceTypeId);
    }

    return { params, workpieceTypeId };
};
