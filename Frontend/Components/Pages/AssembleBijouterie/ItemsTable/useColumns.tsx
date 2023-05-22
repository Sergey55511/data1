import { Action } from './Action';
import { eKeysDataSource, tDataSource } from './useData';
import type { ColumnsType } from 'antd/es/table';

export const useColumns = () => {
    const columns: ColumnsType<tDataSource> = [
        {
            title: 'Тип заготовки',
            dataIndex: eKeysDataSource.workpieceType,
            key: eKeysDataSource.workpieceType,
        },
        {
            title: 'Размер',
            dataIndex: eKeysDataSource.sizeRange,
            key: eKeysDataSource.sizeRange,
        },
        {
            title: 'Цвет',
            dataIndex: eKeysDataSource.color,
            key: eKeysDataSource.color,
        },
        {
            title: 'Действие',
            dataIndex: eKeysDataSource.key,
            key: eKeysDataSource.key,
            render: (_v, item) => {
                console.log('item', item);

                return <Action item={item} />;
            },
        },
    ];

    return { columns };
};
