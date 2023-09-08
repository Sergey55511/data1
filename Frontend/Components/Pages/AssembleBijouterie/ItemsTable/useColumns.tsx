import { tDataSource } from './useData';
import type { ColumnsType } from 'antd/es/table';
import { InputNumber, tValue } from '../../../Shared/InputNumber';
import { Dispatch, SetStateAction } from 'react';

export const useColumns = (
    setDataSource: Dispatch<SetStateAction<tDataSource[] | undefined>>,
) => {
    const getFields = (key: keyof tDataSource) => ({
        dataIndex: key,
        key: key,
    });

    const setDataSourceHandler = (
        index: number,
        key: 'widthOut' | 'countItemsOut',
        v: tValue,
    ) => {
        setDataSource((state) => {
            if (!state) return state;
            state[index][key] = getNumber(v);

            return JSON.parse(JSON.stringify(state));
        });
    };

    const getNumber = (v: any) => (v ? +v : '');
    const columns: ColumnsType<tDataSource> = [
        {
            title: 'Тип заготовки',
            ...getFields('workpieceType'),
        },
        {
            title: 'Размер',
            ...getFields('sizeRange'),
        },
        {
            title: 'Цвет',
            ...getFields('color'),
        },
        {
            title: 'Канал',
            ...getFields('channel'),
        },
        {
            title: 'Модель',
            ...getFields('fullModels'),
        },
        {
            title: 'Состояние',
            ...getFields('state'),
        },
        {
            title: 'Тип',
            ...getFields('type'),
        },
        {
            title: 'Остаток гр.',
            ...getFields('width'),
            width: 120,
        },
        {
            title: 'Количество шт.',
            ...getFields('count'),
            width: 120,
        },
        {
            title: 'Выдать гр.',
            ...getFields('width'),
            width: 120,
            render: (v, item) => {
                return (
                    <InputNumber
                        defaultValue={v}
                        value={item.widthOut}
                        onChangeHandler={(v) => {
                            setDataSourceHandler(item.index, 'widthOut', v);
                        }}
                    />
                );
            },
        },
        {
            title: 'Выдать шт.',
            ...getFields('count'),
            width: 120,
            render: (v, item) => {
                return (
                    <InputNumber
                        defaultValue={v}
                        value={item.countItemsOut}
                        onChangeHandler={(v) => {
                            setDataSourceHandler(item.index, 'countItemsOut', v);
                        }}
                    />
                );
            },
        },
    ];

    return { columns };
};
