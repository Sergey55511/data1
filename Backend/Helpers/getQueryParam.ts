import { iQueryFilters, iUser } from '../../Shared/Types/interfaces';

export const getQueryParam = (value?: number) => (value ? +value! : undefined);

export const getFilters = (params: iQueryFilters, user: iUser) => {
    return {
        gradeId: getQueryParam(params.gradeId),
        lengthId: getQueryParam(params.lengthId),
        operationId: getQueryParam(params.operationId),
        sizeRangeId: getQueryParam(params.sizeRangeId),
        storeId: getQueryParam(user.storeId),
        typeId: getQueryParam(params.typeId),
        workpieceTypeId: getQueryParam(params.workpieceTypeId),
        colorId: getQueryParam(params.colorId),
    };
};
