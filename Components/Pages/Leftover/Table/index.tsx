import { Input, Table } from 'antd';
import { iLeftovers } from '../../../../Store/interfaces';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { getColumnProps } from '../Helpers/getColumnProps';
import { KEYSLEFTOVERS } from './constants';
import { useStores } from '../../../../Store/useStores';
import { observer } from 'mobx-react-lite';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FilterValue } from 'antd/es/table/interface';
import { Wrapper } from './style';
import { InputWidth } from './Components/InputWidth';
import { iWidthOut } from './inerfaces';

export const TableLeftOvers = observer(
    ({
        filters,
        setFilters,
    }: {
        filters: Record<string, FilterValue | null>;
        setFilters: Dispatch<SetStateAction<Record<string, FilterValue | null>>>;
    }) => {
        const { OperationStore, loginStore } = useStores();
        const { leftovers } = OperationStore;
        const [widthOut, setWidthOut] = useState<iWidthOut[]>([]);
        console.log('widthOut', widthOut);

        useEffect(() => {
            if (loginStore.user.storeId)
                OperationStore.getLeftovers(loginStore.user.storeId);
        }, [loginStore.user.storeId]);

        const data = leftovers.map((item, index) => ({
            key: index,
            workpieceType: item.workpieceType,
            model: item.model,
            sizeRange: item.sizeRange,
            materialGroup: item.materialGroup,
            colorType: item.colorType,
            length: item.length,
            channel: item.channel,
            grade: item.grade,
            state: item.state,
            lot: item.lot,
            numProduction: item.numProduction,
            width: item.width,
            count: item.count,
            code: item.code,
        }));

        const filteredleftovers = leftovers.filter((item) => {
            for (const key in item) {
                const value: any = item[key as keyof typeof item];
                if (filters[key]?.length) {
                    if (!filters[key]?.includes(value)) {
                        return false;
                    }
                }
            }
            return true;
        });
        const getColumnPropsHoc = (dataIndex: string) =>
            getColumnProps(dataIndex, filteredleftovers, filters);

        const columns: ColumnsType<iLeftovers> = [
            {
                ...getColumnPropsHoc(KEYSLEFTOVERS.workpieceType),
                title: 'Тип заготовки',
            },
            { ...getColumnPropsHoc(KEYSLEFTOVERS.model), title: 'Модель' },
            { ...getColumnPropsHoc(KEYSLEFTOVERS.sizeRange), title: 'Размерный ряд' },
            { ...getColumnPropsHoc(KEYSLEFTOVERS.materialGroup), title: 'Группа сырья' },
            { ...getColumnPropsHoc(KEYSLEFTOVERS.colorType), title: 'Цвет' },
            {
                ...getColumnPropsHoc(KEYSLEFTOVERS.length),
                title: 'Длина',
            },
            {
                ...getColumnPropsHoc(KEYSLEFTOVERS.channel),
                title: 'Канал',
            },
            {
                ...getColumnPropsHoc(KEYSLEFTOVERS.grade),
                title: 'Сорт',
            },
            { ...getColumnPropsHoc(KEYSLEFTOVERS.state), title: 'Состояние' },
            { ...getColumnPropsHoc(KEYSLEFTOVERS.lot), title: 'Партия' },
            {
                ...getColumnPropsHoc(KEYSLEFTOVERS.numProduction),
                title: '№ производства',
            },
            { ...getColumnPropsHoc(KEYSLEFTOVERS.width), title: 'Остаток гр.' },
            { ...getColumnPropsHoc(KEYSLEFTOVERS.count), title: 'Остаток шт.' },
            {
                title: 'Выдать гр.',
                dataIndex: 'widthOut',
                width: '90px',
                render: (_text, _record, index) => {
                    return (
                        <InputWidth
                            widthOutAll={widthOut}
                            widthOut={widthOut[index]}
                            index={index}
                            fieldName="width"
                            setWidthOut={setWidthOut}
                        />
                    );
                },
            },
            {
                title: 'Выдать шт.',
                dataIndex: 'countOut',
                width: '90px',
                render: () => <Input />,
            },
        ];

        const handleChange: TableProps<iLeftovers>['onChange'] = (
            _pagination,
            filters,
            _sorter,
        ) => {
            setFilters(filters);
            // setSortedInfo(sorter as SorterResult<DataType>);
        };

        return (
            <Wrapper>
                <Table columns={columns} dataSource={data} onChange={handleChange} />
            </Wrapper>
        );
    },
);
