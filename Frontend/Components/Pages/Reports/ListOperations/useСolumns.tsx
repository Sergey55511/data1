import { ColumnsType, FilterValue } from 'antd/es/table/interface';
import moment from 'moment';
import { STORES } from '../../../../../Shared/constants';
import { iData } from '../../../../../Shared/Types/interfaces';
import { useStores } from '../../../../Store/useStores';
import { KEYSLEFTOVERS } from '../../../Shared/Table/constants';
import { getColumnProps } from '../../../Shared/Table/Helpers/getColumnProps';
import { getFilteredleftovers } from '../../../Shared/Table/Helpers/getFilteredleftovers';

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
        ...getColumnPropsHoc(KEYSLEFTOVERS.date.key),
        title: KEYSLEFTOVERS.date.title,
        width:80
    });
    columns.push({
        ...getColumnPropsHoc(KEYSLEFTOVERS.manager.key),
        title: KEYSLEFTOVERS.manager.title,
    });
    columns.push({
        ...getColumnPropsHoc(KEYSLEFTOVERS.lot.key),
        title: KEYSLEFTOVERS.lot.title,
        width:70
    });
    if (isMSC)
        columns.push({
            ...getColumnPropsHoc(KEYSLEFTOVERS.numProduction.key),
            title: KEYSLEFTOVERS.numProduction.title,
        });
    columns.push({
        ...getColumnPropsHoc(KEYSLEFTOVERS.pp.key),
        title: KEYSLEFTOVERS.pp.title,
        width:65
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
        ...getColumnPropsHoc(KEYSLEFTOVERS.operation.key),
        title: KEYSLEFTOVERS.operation.title,
    });
    columns.push({
        ...getColumnPropsHoc(KEYSLEFTOVERS.state.key),
        title: KEYSLEFTOVERS.state.title,
    });
    columns.push({
        ...getColumnPropsHoc(KEYSLEFTOVERS.type.key),
        title: KEYSLEFTOVERS.type.title,
        width:90
    });
    columns.push({
        ...getColumnPropsHoc(KEYSLEFTOVERS.color.key),
        title: KEYSLEFTOVERS.color.title,
        width:75
    });
    columns.push({
        ...getColumnPropsHoc(KEYSLEFTOVERS.grade.key),
        title: KEYSLEFTOVERS.grade.title,
        width:75
    });
    columns.push({
        ...getColumnPropsHoc(KEYSLEFTOVERS.sizeRange.key),
        title: KEYSLEFTOVERS.sizeRange.title,
    });
    columns.push({
        ...getColumnPropsHoc(KEYSLEFTOVERS.length.key),
        title: KEYSLEFTOVERS.length.title,
    });

    if (isMSC)
        columns.push({
            ...getColumnPropsHoc(KEYSLEFTOVERS.channel.key),
            title: KEYSLEFTOVERS.channel.title,
        });

    columns.push({
        ...getColumnPropsHoc(KEYSLEFTOVERS.widthIn.key),
        title: KEYSLEFTOVERS.widthIn.title,
        width:80
    });
    columns.push({
        ...getColumnPropsHoc(KEYSLEFTOVERS.widthOut.key),
        title: KEYSLEFTOVERS.widthOut.title,
        width:80
    });
    if (isMSC) {
        columns.push({
            ...getColumnPropsHoc(KEYSLEFTOVERS.countItemsIn.key),
            title: KEYSLEFTOVERS.countItemsIn.title,
            width: 100,
        });
        columns.push({
            ...getColumnPropsHoc(KEYSLEFTOVERS.countItemsOut.key),
            title: KEYSLEFTOVERS.countItemsOut.title,
            width: 100,
        });
    }

    return { columns };
};
