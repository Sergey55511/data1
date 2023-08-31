import { STORES } from '../../../../../Shared/constants';
import { useStores } from '../../../../Store/useStores';
import { KEYSLEFTOVERS } from '../../../Shared/Table/constants';
import { getColumnProps } from '../../../Shared/Table/Helpers/getColumnProps';
import { FilterValue } from 'antd/es/table/interface';
import type { ColumnsType } from 'antd/es/table';
import { iData } from '../../../../../Shared/Types/interfaces';
import { getFilteredleftovers } from '../../../Shared/Table/Helpers/getFilteredleftovers';

export const useColumns = (filters: Record<string, FilterValue | null>) => {
    const { OperationStore, loginStore } = useStores();
    const { leftovers } = OperationStore;

    const isMSC = loginStore.user.storeId == STORES.Moscow.id;

    const data = leftovers.map((item, index) => ({ ...item, key: index }));

    const filteredleftovers = getFilteredleftovers({ data, filters });

    const getColumnPropsHoc = (dataIndex: string) =>
        getColumnProps<iData>(dataIndex, filteredleftovers, filters);

    const columns: ColumnsType<iData> = [];
    columns.push({
        ...getColumnPropsHoc(KEYSLEFTOVERS.workpieceType.key),
        title: KEYSLEFTOVERS.workpieceType.title,
        width: 150,
    });
    if (isMSC)
        columns.push({
            ...getColumnPropsHoc(KEYSLEFTOVERS.fullModel.key),
            title: KEYSLEFTOVERS.fullModel.title,
        });
    columns.push({
        ...getColumnPropsHoc(KEYSLEFTOVERS.state.key),
        title: KEYSLEFTOVERS.state.title,
    });
    if (!isMSC)
        columns.push({
            ...getColumnPropsHoc(KEYSLEFTOVERS.type.key),
            title: KEYSLEFTOVERS.type.title,
            width: 110,
        });
    if (!isMSC)
        columns.push({
            ...getColumnPropsHoc(KEYSLEFTOVERS.fraction.key),
            title: KEYSLEFTOVERS.fraction.title,
            width: 100,
        });
    if (!isMSC)
        columns.push({
            ...getColumnPropsHoc(KEYSLEFTOVERS.materialGroup.key),
            title: KEYSLEFTOVERS.materialGroup.title,
        });

    columns.push({
        ...getColumnPropsHoc(KEYSLEFTOVERS.color.key),
        title: KEYSLEFTOVERS.color.title,
        width: 85,
    });
    columns.push({
        ...getColumnPropsHoc(KEYSLEFTOVERS.sizeRange.key),
        title: KEYSLEFTOVERS.sizeRange.title,
        width: 130,
    });
    columns.push({
        ...getColumnPropsHoc(KEYSLEFTOVERS.length.key),
        title: KEYSLEFTOVERS.length.title,
        width: 110,
    });
    columns.push({
        ...getColumnPropsHoc(KEYSLEFTOVERS.grade.key),
        title: KEYSLEFTOVERS.grade.title,
        width: 65,
    });
    if (isMSC) {
        columns.push({
            ...getColumnPropsHoc(KEYSLEFTOVERS.channel.key),
            title: KEYSLEFTOVERS.channel.title,
        });
        columns.push({
            ...getColumnPropsHoc(KEYSLEFTOVERS.type.key),
            title: KEYSLEFTOVERS.type.title,
        });
    }
    columns.push({
        ...getColumnPropsHoc(KEYSLEFTOVERS.lot.key),
        title: KEYSLEFTOVERS.lot.title,
        width: 65,
    });
    columns.push({
        ...getColumnPropsHoc(KEYSLEFTOVERS.productionId.key),
        title: KEYSLEFTOVERS.productionId.title,
        width: 100,
    });
    columns.push({
        ...getColumnPropsHoc(KEYSLEFTOVERS.width.key),
        title: KEYSLEFTOVERS.width.title,
        width: 80,
    });
    if (isMSC)
        columns.push({
            ...getColumnPropsHoc(KEYSLEFTOVERS.count.key),
            title: KEYSLEFTOVERS.count.title,
            width: 50,
        });

    return { columns, data, filteredleftovers };
};
