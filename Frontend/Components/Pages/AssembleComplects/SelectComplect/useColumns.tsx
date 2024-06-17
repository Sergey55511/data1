import { iData, iDataProduct } from '../../../../../Shared/Types/interfaces';
import type { ColumnsType } from 'antd/es/table';
import { FilterValue } from 'antd/es/table/interface';
import { getColumnProps } from '../../../Shared/Table/Helpers/getColumnProps';
import { KEYSLEFTOVERS } from '../../../Shared/Table/constants';
import { getFilteredleftovers } from '../../../Shared/Table/Helpers/getFilteredleftovers';

export const useColumns = ({
    data,
    filters,
}: {
    data?: iDataProduct[];
    filters: Record<string, FilterValue | null>;
}) => {
    const filteredleftovers = getFilteredleftovers({ data, filters });

    const getColumnPropsHoc = (dataIndex: typeof KEYSLEFTOVERS.workpieceType) => {
        return {
            ...getColumnProps(dataIndex.key, filteredleftovers, filters),
            title: dataIndex.title,
        };
    };

    const columns: ColumnsType<iDataProduct> = [
        getColumnPropsHoc(KEYSLEFTOVERS.workpieceType),
        getColumnPropsHoc(KEYSLEFTOVERS.fullModel),
        getColumnPropsHoc(KEYSLEFTOVERS.sizeRange),
        getColumnPropsHoc(KEYSLEFTOVERS.color),
        getColumnPropsHoc(KEYSLEFTOVERS.length),
        getColumnPropsHoc(KEYSLEFTOVERS.channel),
        getColumnPropsHoc(KEYSLEFTOVERS.grade),
        getColumnPropsHoc(KEYSLEFTOVERS.state),
        getColumnPropsHoc(KEYSLEFTOVERS.model),
        getColumnPropsHoc(KEYSLEFTOVERS.type),
        getColumnPropsHoc(KEYSLEFTOVERS.lot),
        getColumnPropsHoc(KEYSLEFTOVERS.production),
        getColumnPropsHoc(KEYSLEFTOVERS.width),
        getColumnPropsHoc(KEYSLEFTOVERS.count),
    ];

    return { columns };
};
