import { Button, DatePicker, Input, Select, Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { Wrapper } from './style';
import { Title } from '../../Shared/Title';
import { useEffect, useState } from 'react';
import { useStores } from '../../../Store/useStores';
import { observer } from 'mobx-react-lite';
import { iLeftovers } from '../../../Store/interfaces';
import { KEYSLEFTOVERS } from './constants';
import { getColumnProps } from './Helpers/getColumnProps';
import { FilterValue } from 'antd/es/table/interface';

export default observer(() => {
    const { OperationStore } = useStores();
    const { leftovers, operations } = OperationStore;
    const [opereytion, setOperation] = useState(undefined);
    const [filters, setFilters] = useState<Record<string, FilterValue | null>>({});

    const isShowAdditionalParams = ['Распил', 'Сверление таблетки'].includes(
        opereytion || '',
    );

    useEffect(() => {
        OperationStore.getLeftovers();
    }, []);

    const data = leftovers.map((item, index) => ({
        key: index,
        workpieceType: item.workpieceType,
        model: item.model,
        sizeRange: item.sizeRange,
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
        { ...getColumnPropsHoc(KEYSLEFTOVERS.colorType), title: 'Цвет' },
        {
            ...getColumnPropsHoc(KEYSLEFTOVERS.length),
            title: 'Длина',
        },
        {
            ...getColumnPropsHoc(KEYSLEFTOVERS.channel),
            title: 'канал',
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
            render: () => <Input />,
        },
        {
            title: 'Выдать шт.',
            dataIndex: 'countOut',
            width: '90px',
            render: () => <Input />,
        },
    ];

    const handleChange: TableProps<iLeftovers>['onChange'] = (
        pagination,
        filters,
        sorter,
    ) => {
        setFilters(filters);
        // setSortedInfo(sorter as SorterResult<DataType>);
    };

    const cliarFiltersHandler = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setFilters({});
    };

    return (
        <Wrapper>
            <div className="params">
                <Title text="Остатки товара:" />
                <div className="settings">
                    <a href="#" onClick={cliarFiltersHandler}>
                        Очистить фильтры
                    </a>
                    <div>
                        Крайний номер производства: <strong>50</strong>
                    </div>
                    <div>
                        <Input
                            type="number"
                            min={0}
                            placeholder="№ пр-ва"
                            style={{ width: '100px' }}
                        />
                        {isShowAdditionalParams && (
                            <div
                                style={{
                                    height: '46px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    fontWeight: 600,
                                }}
                            >
                                Задание:
                            </div>
                        )}
                    </div>
                    <div>
                        <Select
                            placeholder="Выбрать операцию"
                            style={{ width: '200px' }}
                            value={opereytion}
                            onChange={(v) => setOperation(v)}
                        >
                            {operations.map((item, index) => (
                                <Select.Option key={index} value={item.opereytion}>
                                    {item.opereytion}
                                </Select.Option>
                            ))}
                        </Select>
                        {isShowAdditionalParams && (
                            <div className="additionalsParams">
                                <div>
                                    <Select placeholder="Модель">
                                        <Select.Option>Раз</Select.Option>
                                        <Select.Option>Два</Select.Option>
                                        <Select.Option>Три</Select.Option>
                                    </Select>
                                </div>
                                <div>
                                    <Select placeholder="Размер">
                                        <Select.Option>Раз</Select.Option>
                                        <Select.Option>Два</Select.Option>
                                        <Select.Option>Три</Select.Option>
                                    </Select>
                                </div>
                            </div>
                        )}
                    </div>
                    <div>
                        <DatePicker placeholder="Дата операции" />
                    </div>
                    <div>
                        <Button type="primary">Выдать</Button>
                    </div>
                </div>
            </div>

            <Table columns={columns} dataSource={data} onChange={handleChange} />
        </Wrapper>
    );
});
