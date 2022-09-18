import { Button, DatePicker, Input, Select } from 'antd';
import { Wrapper } from './style';
import { Title } from '../../../Shared/Title';
import { Dispatch, SetStateAction, useState } from 'react';
import { useStores } from '../../../../Store/useStores';
import { observer } from 'mobx-react-lite';
import { FilterValue } from 'antd/es/table/interface';

export const MenuLeftovers = observer(
    ({
        setFilters,
    }: {
        setFilters: Dispatch<SetStateAction<Record<string, FilterValue | null>>>;
    }) => {
        const { OperationStore } = useStores();
        const { operations } = OperationStore;
        const [opereytion, setOperation] = useState(undefined);

        const isShowAdditionalParams = ['Распил', 'Сверление таблетки'].includes(
            opereytion || '',
        );

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
            </Wrapper>
        );
    },
);
