import { getColumnProps } from '../../../Shared/Table/Helpers/getColumnProps';
import { FilterValue } from 'antd/es/table/interface';
import type { ColumnsType } from 'antd/es/table';
import { iBijouterie } from '../../../../../Shared/Types/interfaces';
import { getFilteredleftovers } from '../../../Shared/Table/Helpers/getFilteredleftovers';
import { UseQueryResult } from '@tanstack/react-query';
import moment from 'moment';
import { getUniqueData } from '../../../Shared/Table/Helpers/getUniqueData';

export const useColumns = (
    filters: Record<string, FilterValue | null>,
    bijouterie: UseQueryResult<iBijouterie[], unknown>,
) => {
    const data = bijouterie.data?.map((item, index) => ({ ...item, key: index })) || [];

    const filteredleftovers = getFilteredleftovers<iBijouterie>({ data, filters });

    const getColumnPropsHoc = (dataIndex: keyof iBijouterie) =>
        getColumnProps<iBijouterie>(dataIndex, filteredleftovers, filters);

    const columns: ColumnsType<iBijouterie> = [];

    const dateFormat = (date: string) => moment(date).format('MM.DD.YYYY');

    columns.push({
        ...getColumnPropsHoc('date'),
        title: 'Дата',
        filters: getUniqueData(data, 'date', dateFormat),
        render: dateFormat,
    });
    columns.push({
        ...getColumnPropsHoc('resultAssemble'),
        title: 'Тип изделия',
    });
    columns.push({
        ...getColumnPropsHoc('typeAssemble'),
        title: 'Тип',
    });
    columns.push({
        ...getColumnPropsHoc('variant'),
        title: 'Вариант',
    });
    columns.push({
        ...getColumnPropsHoc('length'),
        title: 'Длинна',
    });
    columns.push({
        ...getColumnPropsHoc('width'),
        title: 'Вес',
    });
    columns.push({
        ...getColumnPropsHoc('count'),
        title: 'Кол-во',
    });

    return { columns, data, filteredleftovers };
};
