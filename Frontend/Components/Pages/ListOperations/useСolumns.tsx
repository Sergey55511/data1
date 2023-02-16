import { ColumnsType, FilterValue } from 'antd/es/table/interface';
import { iData } from '../../../../Shared/Types/interfaces';
import { KEYSLEFTOVERS } from '../../Shared/Table/constants';
import { getColumnProps } from '../../Shared/Table/Helpers/getColumnProps';
import { getFilteredleftovers } from '../../Shared/Table/Helpers/getFilteredleftovers';

export const useColumns = (
    filters: Record<string, FilterValue | null>,
    data?: iData[],
) => {
    const filteredleftovers = getFilteredleftovers({ data, filters });

    const getColumnPropsHoc = (dataIndex: string) =>
        getColumnProps<iData>(dataIndex, filteredleftovers, filters);

    const columns: ColumnsType<iData> = [];
    columns.push({
        ...getColumnPropsHoc(KEYSLEFTOVERS.workpieceType.key),
        title: KEYSLEFTOVERS.workpieceType.title,
    });

    return { columns };
};
