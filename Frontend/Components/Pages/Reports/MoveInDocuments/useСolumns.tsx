import { ColumnsType, FilterValue } from 'antd/es/table/interface';
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
    });
    columns.push({
        ...getColumnPropsHoc(KEYSLEFTOVERS.lot.key),
        title: KEYSLEFTOVERS.lot.title,
    });
    columns.push({
        ...getColumnPropsHoc(KEYSLEFTOVERS.numDocument.key),
        title: KEYSLEFTOVERS.numDocument.title,
    });

    return { columns };
};
