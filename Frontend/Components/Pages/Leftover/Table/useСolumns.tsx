import { STORES } from '../../../../../Shared/constants';
import { useStores } from '../../../../Store/useStores';
import { KEYSLEFTOVERS } from '../../../Shared/Table/constants';
import { getColumnProps } from '../../../Shared/Table/Helpers/getColumnProps';
import { FilterValue } from 'antd/es/table/interface';
import type { ColumnsType } from 'antd/es/table';
import { iData } from '../../../../../Shared/Types/interfaces';

export const useColumns = (filters: Record<string, FilterValue | null>) => {
    const { OperationStore, loginStore } = useStores();
    const { leftovers } = OperationStore;

    const isMSC = loginStore.user.storeId == STORES.Moscow.id;

    const data = leftovers.map((item, index) => ({ ...item, key: index }));

    const filteredleftovers = leftovers.filter((item) => {
        for (const key in item) {
            const value: any = item[key as keyof typeof item];
            if (filters[key]?.length) {
                if (!filters[key]?.includes(value)) {
                    return false;
                }
            }
        }
        return true;
    });
    const getColumnPropsHoc = (dataIndex: string) =>
        getColumnProps(dataIndex, filteredleftovers, filters);

    const columns: ColumnsType<iData> = [];
    columns.push({
        ...getColumnPropsHoc(KEYSLEFTOVERS.workpieceType.key),
        title: KEYSLEFTOVERS.workpieceType.title,
    });
    columns.push({
        ...getColumnPropsHoc(KEYSLEFTOVERS.workpieceType.key),
        title: KEYSLEFTOVERS.workpieceType.title,
    });
    columns.push({
        ...getColumnPropsHoc(KEYSLEFTOVERS.state.key),
        title: KEYSLEFTOVERS.state.title,
    });
    if (!isMSC)
        columns.push({
            ...getColumnPropsHoc(KEYSLEFTOVERS.type.key),
            title: KEYSLEFTOVERS.type.title,
        });
    if (!isMSC)
        columns.push({
            ...getColumnPropsHoc(KEYSLEFTOVERS.fraction.key),
            title: KEYSLEFTOVERS.fraction.title,
        });
    if (!isMSC)
        columns.push({
            ...getColumnPropsHoc(KEYSLEFTOVERS.materialGroup.key),
            title: KEYSLEFTOVERS.materialGroup.title,
        });

    columns.push({
        ...getColumnPropsHoc(KEYSLEFTOVERS.color.key),
        title: KEYSLEFTOVERS.color.title,
    });
    columns.push({
        ...getColumnPropsHoc(KEYSLEFTOVERS.sizeRange.key),
        title: KEYSLEFTOVERS.sizeRange.title,
    });
    columns.push({
        ...getColumnPropsHoc(KEYSLEFTOVERS.length.key),
        title: KEYSLEFTOVERS.length.title,
    });
    columns.push({
        ...getColumnPropsHoc(KEYSLEFTOVERS.grade.key),
        title: KEYSLEFTOVERS.grade.title,
    });
    columns.push({
        ...getColumnPropsHoc(KEYSLEFTOVERS.lot.key),
        title: KEYSLEFTOVERS.lot.title,
    });
    columns.push({
        ...getColumnPropsHoc(KEYSLEFTOVERS.productionId.key),
        title: KEYSLEFTOVERS.productionId.title,
    });
    columns.push({
        ...getColumnPropsHoc(KEYSLEFTOVERS.width.key),
        title: KEYSLEFTOVERS.width.title,
    });
    columns.push({
        ...getColumnPropsHoc(KEYSLEFTOVERS.count.key),
        title: KEYSLEFTOVERS.count.title,
    });
    return { columns, data };
};
