import { iData } from '../../../../../Shared/Types/interfaces';
import type { ColumnsType } from 'antd/es/table';
import { FilterValue } from 'antd/es/table/interface';
import { getColumnProps } from '../../../Shared/Table/Helpers/getColumnProps';
import { KEYSLEFTOVERS } from '../../../Shared/Table/constants';
import { getFilteredleftovers } from '../../../Shared/Table/Helpers/getFilteredleftovers';

export const useColumns = ({
    data,
    filters,
}: {
    data?: iData[];
    filters: Record<string, FilterValue | null>;
}) => {
    const filteredleftovers = getFilteredleftovers({ data, filters });

    const getColumnPropsHoc = (
        dataIndex: typeof KEYSLEFTOVERS.workpieceType,
        width?: number,
    ) => {
        return {
            ...getColumnProps(dataIndex.key, filteredleftovers, filters),
            title: dataIndex.title,
            width,
        };
    };

    const columns: ColumnsType<iData> = [
        getColumnPropsHoc(KEYSLEFTOVERS.workpieceType),
        getColumnPropsHoc(KEYSLEFTOVERS.fullModel),
        getColumnPropsHoc(KEYSLEFTOVERS.sizeRange, 100),
        getColumnPropsHoc(KEYSLEFTOVERS.color, 150),
        getColumnPropsHoc(KEYSLEFTOVERS.length, 70),
        getColumnPropsHoc(KEYSLEFTOVERS.channel, 65),
        getColumnPropsHoc(KEYSLEFTOVERS.grade, 80),
        getColumnPropsHoc(KEYSLEFTOVERS.state, 180),
        getColumnPropsHoc(KEYSLEFTOVERS.type, 70),
        getColumnPropsHoc(KEYSLEFTOVERS.lot, 70),
        getColumnPropsHoc(KEYSLEFTOVERS.production),
        getColumnPropsHoc(KEYSLEFTOVERS.width, 75),
        getColumnPropsHoc(KEYSLEFTOVERS.count, 50),
    ];

    return { columns };
};
