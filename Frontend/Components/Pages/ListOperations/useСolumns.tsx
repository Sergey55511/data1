import { ColumnsType, FilterValue } from 'antd/es/table/interface';
import { STORES } from '../../../../Shared/constants';
import { iData } from '../../../../Shared/Types/interfaces';
import { useStores } from '../../../Store/useStores';
import { KEYSLEFTOVERS } from '../../Shared/Table/constants';
import { getColumnProps } from '../../Shared/Table/Helpers/getColumnProps';
import { getFilteredleftovers } from '../../Shared/Table/Helpers/getFilteredleftovers';

export const useColumns = (
    filters: Record<string, FilterValue | null>,
    data?: iData[],
) => {
    const { loginStore } = useStores();
    const filteredleftovers = getFilteredleftovers({ data, filters });

    const isMSC = loginStore.user.storeId == STORES.Moscow.id;

    const getColumnPropsHoc = (dataIndex: string) =>
        getColumnProps<iData>(dataIndex, filteredleftovers, filters);

    const columns: ColumnsType<iData> = [];
    columns.push({
        ...getColumnPropsHoc(KEYSLEFTOVERS.pp.key),
        title: KEYSLEFTOVERS.pp.title,
    });
    columns.push({
        ...getColumnPropsHoc(KEYSLEFTOVERS.workpieceType.key),
        title: KEYSLEFTOVERS.workpieceType.title,
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
    if (isMSC)
        columns.push({
            ...getColumnPropsHoc(KEYSLEFTOVERS.channel.key),
            title: KEYSLEFTOVERS.channel.title,
        });
    columns.push({
        ...getColumnPropsHoc(KEYSLEFTOVERS.lot.key),
        title: KEYSLEFTOVERS.lot.title,
    });
    if (isMSC)
        columns.push({
            ...getColumnPropsHoc(KEYSLEFTOVERS.productionId.key),
            title: KEYSLEFTOVERS.productionId.title,
            width: 100,
        });
    columns.push({
        ...getColumnPropsHoc(KEYSLEFTOVERS.widthIn.key),
        title: KEYSLEFTOVERS.widthIn.title,
    });
    columns.push({
        ...getColumnPropsHoc(KEYSLEFTOVERS.widthOut.key),
        title: KEYSLEFTOVERS.widthOut.title,
    });
    if (isMSC) {
        columns.push({
            ...getColumnPropsHoc(KEYSLEFTOVERS.countItemsIn.key),
            title: KEYSLEFTOVERS.countItemsIn.title,
            width: 50,
        });
        columns.push({
            ...getColumnPropsHoc(KEYSLEFTOVERS.countItemsOut.key),
            title: KEYSLEFTOVERS.countItemsOut.title,
            width: 50,
        });
    }

    return { columns };
};
