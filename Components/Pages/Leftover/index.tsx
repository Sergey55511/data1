import { LayOut } from '../../LayOut';
import { Button, DatePicker, Input, Select, Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { Wrapper } from './style';
import { Title } from '../../Title';
import { useEffect, useState } from 'react';
import { useStores } from '../../../Store/useStores';
import { observer } from 'mobx-react-lite';

interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
}

const onChange: TableProps<DataType>['onChange'] = (
    pagination,
    filters,
    sorter,
    extra,
) => {
    console.log('params', pagination, filters, sorter, extra);
};

export default observer(() => {
    const { OperationStore } = useStores();
    const { leftovers, operations } = OperationStore;
    const [opereytion, setOperation] = useState(undefined);

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

    const columns = [
        {
            title: 'Тип заготовки',
            dataIndex: 'workpieceType',
        },
        {
            title: 'Модель',
            dataIndex: 'model',
        },
        {
            title: 'Размерный ряд',
            dataIndex: 'sizeRange',
        },
        {
            title: 'Цвет',
            dataIndex: 'colorType',
        },
        {
            title: 'Длина',
            dataIndex: 'length',
        },
        {
            title: 'канал',
            dataIndex: 'channel',
        },
        {
            title: 'Сорт',
            dataIndex: 'grade',
        },
        {
            title: 'Состояние',
            dataIndex: 'state',
        },
        {
            title: 'Партия',
            dataIndex: 'lot',
        },
        {
            title: '№ производства',
            dataIndex: 'numProduction',
        },
        {
            title: 'Остаток гр.',
            dataIndex: 'width',
        },
        {
            title: 'Остаток шт.',
            dataIndex: 'count',
        },
        {
            title: 'Выдать гр.',
            dataIndex: 'action',
            width: '90px',
            render: () => <Input />,
        },
        {
            title: 'Выдать шт.',
            dataIndex: 'action',
            width: '90px',
            render: () => <Input />,
        },
    ];

    return (
        <LayOut>
            <Wrapper>
                <div className="params">
                    <Title text="Остатки товара:" />
                    <div className="settings">
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

                <Table columns={columns} dataSource={data} />
            </Wrapper>
        </LayOut>
    );
});
