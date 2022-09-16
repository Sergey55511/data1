import { Button, notification, Tooltip } from 'antd';
import { Title } from '../../../../Shared/Title';
import { Wrapper } from './style';
import { CheckOutlined, MinusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { initData, initPrimeData, iPrimeData, iRow, Item } from './constants';
import { Field, PrimeField } from './Components/fields';

export const NewItem = () => {
    const [primeData, setPrimeData] = useState<iPrimeData>(initPrimeData());
    const [data, setData] = useState<iRow[]>([]);

    const addRowHandler = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        setData((prev) => [...prev, initData()]);
    };

    const removeHandler = (index: number) => {
        setData((prev) => prev.filter((_, i) => i != index));
    };

    const setValue = (indexRow: number, key: keyof iRow, value: string) => {
        setData((prev) => {
            prev[indexRow][key].value = value;
            return [...prev];
        });
    };

    const setPrameValue = <T extends keyof iPrimeData>(
        key: T,
        value: iPrimeData[T]['value'],
    ) => {
        setPrimeData((prev) => {
            prev[key].value = value;
            return { ...prev };
        });
    };

    const subbmitHandler = (type: 'success' | 'info' | 'warning' | 'error') => {
        setPrimeData(initPrimeData());
        setData([]);
        notification[type]({
            message: 'Успешно',
            description: 'Приход сохранен успешно',
        });
    };

    return (
        <Wrapper>
            <Title text="Приход сырья:" />
            <fieldset className="frame">
                <legend>Общие данные</legend>
                <div className="primeData">
                    <div>
                        <Tooltip placement="right" title="Сохранить">
                            <Button
                                size="small"
                                shape="circle"
                                icon={<CheckOutlined />}
                                onClick={() => subbmitHandler('success')}
                            />
                        </Tooltip>
                    </div>
                    {Object.keys(primeData).map((key) => (
                        <PrimeField
                            key={key}
                            {...{ primeData, setPrameValue }}
                            fieldName={key as keyof typeof primeData}
                        />
                    ))}
                </div>
            </fieldset>
            <div className="addRow">
                <a href="#" onClick={addRowHandler}>
                    Добавить строку
                </a>
            </div>
            {data.map((item, index) => (
                <div className="addItemWrapper" key={index}>
                    <div>
                        <Tooltip placement="right" title="Удалить запись">
                            <Button
                                size="small"
                                shape="circle"
                                icon={<MinusOutlined />}
                                onClick={() => removeHandler(index)}
                            />
                        </Tooltip>
                    </div>
                    {Object.keys(item).map((key) => {
                        const keyItem = key as keyof typeof item;
                        return (
                            <Field
                                key={key}
                                item={item[keyItem]}
                                onChange={(v) => setValue(index, keyItem, v)}
                            />
                        );
                    })}
                </div>
            ))}
        </Wrapper>
    );
};
