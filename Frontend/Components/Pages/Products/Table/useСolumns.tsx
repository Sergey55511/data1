import { STORES } from '../../../../../Shared/constants';
import { useStores } from '../../../../Store/useStores';
import { KEYSLEFTOVERS } from '../../../Shared/Table/constants';
import { getColumnProps } from '../../../Shared/Table/Helpers/getColumnProps';
import { FilterValue } from 'antd/es/table/interface';
import type { ColumnsType } from 'antd/es/table';
import { iData, iDataProduct } from '../../../../../Shared/Types/interfaces';
import { getFilteredleftovers } from '../../../Shared/Table/Helpers/getFilteredleftovers';
import { useData } from './useData';

export const useColumns = (filters: Record<string, FilterValue | null>) => {
    const { products } = useData();

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
        ...getColumnPropsHoc('width'),
        title: 'Остаток гр.',
    });
    columns.push({
        ...getColumnPropsHoc('count'),
        title: 'Остаток шт.',
    });

    columns.push({
        dataIndex: 'code',
        title: 'code',
    });

    return { columns, data };
};
