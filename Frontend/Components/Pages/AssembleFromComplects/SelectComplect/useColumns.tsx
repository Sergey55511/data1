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
    const getColumnPropsHoc = (dataIndex: string) =>
        getColumnProps<iDataProduct>(dataIndex, filteredleftovers, filters);

    const columns: ColumnsType<iDataProduct> = [
        {
            ...getColumnPropsHoc('workpieceType'),
            title: 'Тип изделия',
        },
        {
            ...getColumnPropsHoc('typeAssemble'),
            title: 'Тип сборки',
        },
        {
            ...getColumnPropsHoc('model'),
            title: 'Модель',
        },
        {
            ...getColumnPropsHoc('articleId'),
            title: 'Номер изделия',
        },
        {
            ...getColumnPropsHoc('state'),
            title: 'Состояние',
        },
        {
            ...getColumnPropsHoc('grade'),
            title: 'Сорт',
        },
        {
            ...getColumnPropsHoc('color'),
            title: 'Цвет',
        },
        {
            ...getColumnPropsHoc('length'),
            title: 'Длинна',
        },
        {
            ...getColumnPropsHoc('profile'),
            title: 'Профиль',
        },
        {
            ...getColumnPropsHoc('sizeRange'),
            title: 'Размер бусины',
        },
        {
            ...getColumnPropsHoc('width'),
            title: 'Остаток гр.',
        },
        {
            ...getColumnPropsHoc('count'),
            title: 'Остаток шт.',
        },
    ];

    return { columns };
};
