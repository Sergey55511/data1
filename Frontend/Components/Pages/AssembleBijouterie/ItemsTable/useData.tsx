import { iBigouterueBridje } from '../../../../../Shared/Types/interfaces';

export enum eKeysDataSource {
    key = 'key',
    workpieceTypeId = 'workpieceTypeId',
    workpieceType = 'workpieceType',
    sizeRangeId = 'sizeRangeId',
    sizeRange = 'sizeRange',
    colorId = 'colorId',
    color = 'color',
}

export type tDataSource = Record<eKeysDataSource, number | string>;

export const useData = (data?: iBigouterueBridje[]) => {
    const dataSource: tDataSource[] | undefined = data?.map((item) => ({
        key: item.id,
        workpieceTypeId: item.workpieceType.id,
        workpieceType: item.workpieceType.workpieceType,
        sizeRangeId: item.sizeRange.id,
        sizeRange: item.sizeRange.sizeRange,
        colorId: item.color.id,
        color: item.color.color,
    }));

    return { dataSource };
};
