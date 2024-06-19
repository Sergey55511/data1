import { NextApiRequest } from 'next';
import { WORKPIECETYPE } from '../../../../../../Shared/constants';
import { iUser } from '../../../../../../Shared/Types/interfaces';

export const prepareDate = (user: iUser, req: NextApiRequest) => {
    const storeId = +user.storeId;
    let statesId = req.query?.['stateId[]'] as any[];
    const workpieceTypeId = req.query?.workpieceTypeId as number | undefined;

    console.log('statesId', statesId);

    let stateFilter = '';
    if (statesId?.length) {
        if (!Array.isArray(statesId)) statesId = [statesId];

        let inParams = '';
        statesId = statesId?.map((itm, i) => {
            const startIndex = workpieceTypeId ? 4 : 3;
            const varQuery = `$${startIndex + i}`;
            inParams = inParams ? `${inParams},${varQuery}` : varQuery;
            return +itm;
        });
        stateFilter = `and "stateId" in (${inParams})`;
    }

    const workpieceTypeIdFilter = workpieceTypeId
        ? 'and "Data"."workpieceTypeId" = $3'
        : '';

    let queryParams = [storeId, WORKPIECETYPE.prunes.id];
    if (workpieceTypeId) queryParams.push(+workpieceTypeId);
    queryParams = [...queryParams, ...statesId];

    return {
        stateFilter,
        workpieceTypeIdFilter,
        queryParams,
    };
};
