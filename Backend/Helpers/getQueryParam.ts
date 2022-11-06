import { NextApiRequest } from 'next';
import { iQueryFilters } from '../../Shared/Types/interfaces';

export const getQueryParam = (value?: number) => (value ? +value! : undefined);

export const getFilters = (params: iQueryFilters) => {
    return {
        gradeId: getQueryParam(params.gradeId),
        lengthId: getQueryParam(params.lengthId),
        operationId: getQueryParam(params.operationId),
        sizeRangeId: getQueryParam(params.sizeRangeId),
        storeId: getQueryParam(params.storeId),
        typeId: getQueryParam(params.typeId),
        workpieceTypeId: getQueryParam(params.workpieceTypeId),
        colorId: getQueryParam(params.colorId),
    };
};
