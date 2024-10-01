import { getColumnProps } from '../../../Shared/Table/Helpers/getColumnProps';
import { FilterValue } from 'antd/es/table/interface';
import type { ColumnsType } from 'antd/es/table';
import { iDataProduct } from '../../../../../Shared/Types/interfaces';
import { getFilteredleftovers } from '../../../Shared/Table/Helpers/getFilteredleftovers';
import { UseQueryResult } from '@tanstack/react-query';
import moment from 'moment';
import { getUniqueData } from '../../../Shared/Table/Helpers/getUniqueData';

export const useColumns = (
    filters: Record<string, FilterValue | null>,
    products: UseQueryResult<iDataProduct[], unknown>,
) => {
    const data = products.data?.map((item, index) => ({ ...item, key: index })) || [];

    const filteredleftovers = getFilteredleftovers<iDataProduct>({ data, filters });

    const getColumnPropsHoc = (dataIndex: string) =>
        getColumnProps<iDataProduct>(dataIndex, filteredleftovers, filters);

    const columns: ColumnsType<iDataProduct> = [];

    const dateFormat = (date: string) => moment(date).format('DD.MM.YYYY');

    columns.push({
        ...getColumnPropsHoc('date'),
        title: 'Дата',
        filters: getUniqueData(data, 'date', dateFormat),
        render: dateFormat,
        width: 100,
    });
    columns.push({
        ...getColumnPropsHoc('workpieceType'),
        title: 'Тип изделия',
        width: 100,
    });
    columns.push({
        ...getColumnPropsHoc('typeAssemble'),
        title: 'Тип сборки',
        width: 100,
    });
    columns.push({
        ...getColumnPropsHoc('model'),
        title: 'Модель',
        width: 150,
    });
    columns.push({
        ...getColumnPropsHoc('articleId'),
        title: 'Номер изделия',
        width: 100,
    });
    columns.push({
        ...getColumnPropsHoc('state'),
        title: 'Состояние',
        width: 150,
    });
    columns.push({
        ...getColumnPropsHoc('grade'),
        title: 'Сорт',
        width: 70,
    });
    columns.push({
        ...getColumnPropsHoc('color'),
        title: 'Цвет',
        width: 70,
    });
    columns.push({
        ...getColumnPropsHoc('length'),
        title: 'Длинна',
        width: 70,
    });
    columns.push({
        ...getColumnPropsHoc('profile'),
        title: 'Профиль',
        width: 100,
    });
    columns.push({
        ...getColumnPropsHoc('sizeRange'),
        title: 'Размер бусины',
        width: 100,
    });
    columns.push({
        ...getColumnPropsHoc('width'),
        title: 'Остаток гр.',
        width: 100,
    });
    columns.push({
        ...getColumnPropsHoc('count'),
        title: 'Остаток шт.',
        width: 100,
    });

    return { columns, data, filteredleftovers };
};
