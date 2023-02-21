import { Button, notification, Tooltip } from 'antd';
import { Title } from '../../../../Shared/Title';
import { Wrapper } from './style';
import { MinusOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState } from 'react';
import { iItem, initData, initPrimeData, iPrimeData, iRow } from './constants';
import { Field, PrimeField, SelectField } from './Components/fields';
import isNumber from 'lodash/isNumber';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../../../../Store/useStores';
import { iData } from '../../../../../../Shared/Types/interfaces';
import { Frame } from '../../../../Shared/Frame';
import { STATE, WORKPIECETYPE } from '../../../../../../Shared/constants';
import { tValue } from '../../../../Shared/InputNumber';

export const NewItem = observer(() => {
    const [primeData, setPrimeData] = useState<iPrimeData>(initPrimeData());
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<iRow[]>([]);
    const tuched = useRef(false);
    const { ListsStore, OperationStore, loginStore } = useStores();

    useEffect(() => {
        OperationStore.getMaxLot();
    }, []);

    const addRowHandler = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        setData((prev) => [...prev, initData()]);
    };

    const removeHandler = (index: number) => {
        setData((prev) => prev.filter((_, i) => i != index));
    };

    const setItemValue = (item: iItem, value: any) => {
        item.value = value;
        item.isError = value ? false : true;
    };

    const setValue = (indexRow: number, key: keyof iRow, value: any) => {
        if (isNumber(+value)) {
            if (+value < 0) return;
        }
        setData((prev) => {
            setItemValue(prev[indexRow][key], value);
            return [...prev];
        });
    };

    const setPrameValue = <T extends keyof iPrimeData>(key: T, value: tValue) => {
        setPrimeData((prev) => {
            setItemValue(prev[key], value);
            return { ...prev };
        });
    };

    const subbmitHandler = async () => {
        tuched.current = true;

        if (isValid()) {
            setIsLoading(true);
            const preparedData: iData[] = data.map((item) => {
                item.widthInDocument.value;
                const res: iData = {
                    lot: +primeData.lot.value,
                    numDocument: `${primeData.numDocument.value}`,
                    operationId: 1,
                    workpieceTypeId: WORKPIECETYPE.stone.id,
                    userId: loginStore.user.id,
                    storeId: loginStore.user.storeId,
                    stateId: STATE.stone.id,
                    widthInDocument: +item.widthInDocument.value,
                    widthIn: +item.widthIn.value,
                    moneyIn: +item.moneyIn.value,
                    materialGroupId: +item.materialGroup.value,
                    fractionId: +item.fractionId.value,
                };
                return res;
            });

            await OperationStore.postNewItems(preparedData, () => {
                setPrimeData(initPrimeData());
                setData([]);
                notification.success({
                    message: 'Успешно',
                    description: 'Приход сохранен успешно',
                });
            });
            setIsLoading(false);
        } else {
            notification.error({
                message: 'Ошибка',
                description: 'Заполните обязательные поля',
            });
        }
    };

    const isValid = () => {
        let result = true;

        if (!tuched.current) return result;
        if (!data.length) return false;
        const findErrors = <T extends object>(item: T) => {
            for (const key in item) {
                const fieldName = key as keyof T;
                const field: any = item[fieldName];
                if (field.value) {
                    field.isError = false;
                } else {
                    field.isError = true;
                    result = false;
                }
            }
        };
        setPrimeData((prev) => {
            findErrors(prev);

            setData((prev) => {
                prev = prev.map((item) => {
                    findErrors(item);
                    return item;
                });
                return [...prev];
            });

            return { ...prev };
        });

        return result;
    };

    const materialGroup = ListsStore.materialGroup.map((item) => ({
        value: item.id,
        caption: item.materialGroup,
    }));

    const fraction = ListsStore.fraction.map((item) => ({
        value: item.id,
        caption: item.fraction,
    }));

    return (
        <Wrapper>
            <Title text="Приход сырья:" />
            <Frame legend="Общие данные">
                <div className="primeData">
                    <div>
                        <Tooltip
                            placement="top"
                            title={`Макс партия: ${OperationStore.maxLot || 0}`}
                            onOpenChange={() => console.log('onOpenChange')}
                        >
                            <div>
                                <PrimeField
                                    {...{ primeData, setPrameValue }}
                                    fieldName={'lot'}
                                />
                            </div>
                        </Tooltip>
                        <PrimeField
                            {...{ primeData, setPrameValue }}
                            fieldName={'numDocument'}
                            type={primeData.numDocument.type}
                            step={primeData.numDocument.step}
                        />
                    </div>
                    <div>
                        <Button
                            type="primary"
                            onClick={() => subbmitHandler()}
                            loading={isLoading}
                        >
                            Сохранить
                        </Button>
                    </div>
                </div>
            </Frame>
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
                    <SelectField
                        item={item.fractionId}
                        onChangeHandler={(v) =>
                            setValue(index, 'fractionId', v as string)
                        }
                        options={fraction}
                    />
                    <SelectField
                        item={item.materialGroup}
                        onChangeHandler={(v) => setValue(index, 'materialGroup', v)}
                        options={materialGroup}
                    />
                    <Field
                        item={item.widthInDocument}
                        onChangeHandler={(v) => setValue(index, 'widthInDocument', v)}
                        type={item.widthInDocument.type}
                        step={item.widthInDocument.step}
                    />
                    <Field
                        item={item.widthIn}
                        onChangeHandler={(v) => setValue(index, 'widthIn', v)}
                        type={item.widthIn.type}
                        step={item.widthIn.step}
                    />
                    <Field
                        item={item.moneyIn}
                        onChangeHandler={(v) => setValue(index, 'moneyIn', v)}
                        type={item.moneyIn.type}
                        step={item.moneyIn.step}
                    />
                </div>
            ))}
        </Wrapper>
    );
});
