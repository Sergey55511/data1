import { iDataIndex } from './UseProps';
import { FilterValue } from 'antd/es/table/interface';
import { getColumnProps } from '../../../Shared/Table/Helpers/getColumnProps';
import type { ColumnsType } from 'antd/es/table';

import { KEYSLEFTOVERS } from '../../../Shared/Table/constants';
import { useStores } from '../../../../Store/useStores';
import { STORES } from '../../../../../Shared/constants';

export const useColumns = ({
    filters,
    leftovers,
}: {
    filters: Record<string, FilterValue | null>;
    leftovers: iDataIndex[];
}) => {
    const { loginStore } = useStores();
    const isMSC = loginStore.user.storeId == STORES.Moscow.id;

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

    const columns: ColumnsType<iDataIndex> = [];
    columns.push({
        ...getColumnPropsHoc(KEYSLEFTOVERS.workpieceType.key),
        title: KEYSLEFTOVERS.workpieceType.title,
        width: 120,
    });
    columns.push({
        ...getColumnPropsHoc(KEYSLEFTOVERS.state.key),
        title: KEYSLEFTOVERS.state.title,
    });

    if (!isMSC) {
        columns.push({
            ...getColumnPropsHoc(KEYSLEFTOVERS.type.key),
            title: KEYSLEFTOVERS.type.title,
            width: 100,
        });
        columns.push({
            ...getColumnPropsHoc(KEYSLEFTOVERS.fraction.key),
            title: KEYSLEFTOVERS.fraction.title,
            width: 95,
        });
        columns.push({
            ...getColumnPropsHoc(KEYSLEFTOVERS.materialGroup.key),
            title: KEYSLEFTOVERS.materialGroup.title,
        });
    }
    columns.push({
        ...getColumnPropsHoc(KEYSLEFTOVERS.sizeRange.key),
        title: KEYSLEFTOVERS.sizeRange.title,
        width: 130,
    });
    columns.push({
        ...getColumnPropsHoc(KEYSLEFTOVERS.length.key),
        title: KEYSLEFTOVERS.length.title,
        width: 90,
    });
    columns.push({
        ...getColumnPropsHoc(KEYSLEFTOVERS.color.key),
        title: KEYSLEFTOVERS.color.title,
        width: 80,
    });
    columns.push({
        ...getColumnPropsHoc(KEYSLEFTOVERS.grade.key),
        title: KEYSLEFTOVERS.grade.title,
        width: 75,
    });

    if (isMSC) {
        columns.push({
            ...getColumnPropsHoc(KEYSLEFTOVERS.fullModel.key),
            title: KEYSLEFTOVERS.fullModel.title,
        });
        columns.push({
            ...getColumnPropsHoc(KEYSLEFTOVERS.type.key),
            title: KEYSLEFTOVERS.type.title,
            width: 80,
        });
    }

    columns.push({
        ...getColumnPropsHoc(KEYSLEFTOVERS.lot.key),
        title: KEYSLEFTOVERS.lot.title,
        width: 80,
    });

    columns.push({
        ...getColumnPropsHoc(KEYSLEFTOVERS.productionId.key),
        title: KEYSLEFTOVERS.productionId.title,
    });
    columns.push({
        ...getColumnPropsHoc(KEYSLEFTOVERS.width.key),
        title: KEYSLEFTOVERS.width.title,
        width: 90,
    });
    if (isMSC)
        columns.push({
            ...getColumnPropsHoc(KEYSLEFTOVERS.count.key),
            title: KEYSLEFTOVERS.count.title,
        });
    return { columns, filteredleftovers };
};
