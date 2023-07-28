import { getColumnProps } from '../../../Shared/Table/Helpers/getColumnProps';
import { FilterValue } from 'antd/es/table/interface';
import type { ColumnsType } from 'antd/es/table';
import { iDataProduct } from '../../../../../Shared/Types/interfaces';
import { getFilteredleftovers } from '../../../Shared/Table/Helpers/getFilteredleftovers';
import { UseQueryResult } from '@tanstack/react-query';

export const useColumns = (
    filters: Record<string, FilterValue | null>,
    products: UseQueryResult<iDataProduct[], unknown>,
) => {
    const data = products.data?.map((item, index) => ({ ...item, key: index })) || [];

    const filteredleftovers = getFilteredleftovers<iDataProduct>({ data, filters });

    const getColumnPropsHoc = (dataIndex: string) =>
        getColumnProps<iDataProduct>(dataIndex, filteredleftovers, filters);

    const columns: ColumnsType<iDataProduct> = [];

    columns.push({
        ...getColumnPropsHoc('workpieceType'),
        title: 'Тип изделия',
    });
    columns.push({
        ...getColumnPropsHoc('model'),
        title: 'Модель',
    });
    columns.push({
        ...getColumnPropsHoc('articleId'),
        title: 'Номер изделия',
    });
    columns.push({
        ...getColumnPropsHoc('state'),
        title: 'Состояние',
    });
    columns.push({
        ...getColumnPropsHoc('grade'),
        title: 'Сорт',
    });
    columns.push({
        ...getColumnPropsHoc('color'),
        title: 'Цвет',
    });
    columns.push({
        ...getColumnPropsHoc('length'),
        title: 'Длинна',
    });
    columns.push({
        ...getColumnPropsHoc('profile'),
        title: 'Профиль',
    });
    columns.push({
        ...getColumnPropsHoc('sizeRange'),
        title: 'Размер бусины',
    });
    columns.push({
        ...getColumnPropsHoc('width'),
        title: 'Остаток гр.',
    });
    columns.push({
        ...getColumnPropsHoc('count'),
        title: 'Остаток шт.',
    });

    return { columns, data };
};
