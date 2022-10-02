import { Button, notification, Tooltip } from 'antd';
import { Title } from '../../../../Shared/Title';
import { Wrapper } from './style';
import { CheckOutlined, MinusOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState } from 'react';
import { iItem, initData, initPrimeData, iPrimeData, iRow, Item } from './constants';
import { Field, PrimeField, SelectField } from './Components/fields';
import isNumber from 'lodash/isNumber';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../../../../Store/useStores';
import { iNewItems } from '../../../../../../Shared/Types/interfaces';
import { Frame } from '../../../../Shared/Frame';

export const NewItem = observer(() => {
    const [primeData, setPrimeData] = useState<iPrimeData>(initPrimeData());
    const [data, setData] = useState<iRow[]>([]);
    const tuched = useRef(false);
    const { ListsStore, OperationStore, loginStore } = useStores();

    useEffect(() => {
        ListsStore.getMaterialGroup();
        ListsStore.getSizeRange();
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

    const setPrameValue = <T extends keyof iPrimeData>(
        key: T,
        value: iPrimeData[T]['value'],
    ) => {
        const isNum = isNumber(+value);
        if (isNum) {
            if (+value < 0) return;
        }
        setPrimeData((prev) => {
            setItemValue(prev[key], key == 'lot' ? +value : value);
            return { ...prev };
        });
    };

    const subbmitHandler = async () => {
        tuched.current = true;

        if (isValid()) {
            const preparedData: iNewItems[] = data.map((item) => {
                const res: any = {
                    [primeData.lot.field]: primeData.lot.value,
                    [primeData.numDocument.field]: primeData.numDocument.value,
                    operationId: 39,
                    workpieceTypeId: 1,
                    userId: loginStore.user.id,
                    managerId: loginStore.user.id,
                    storeId: loginStore.user.storeId,
                };
                for (const key in item) {
                    const keyField = key as keyof typeof item;
                    res[item[keyField].field] = item[keyField].value;
                }
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

    const sizeRange = ListsStore.sizeRange.map((item) => ({
        value: item.id,
        caption: item.sizeRange,
    }));

    return (
        <Wrapper>
            <Title text="Приход сырья:" />
            <Frame legend="Общие данные">
                <div className="primeData">
                    <div>
                        <Tooltip placement="right" title="Сохранить">
                            <Button
                                size="small"
                                shape="circle"
                                icon={<CheckOutlined />}
                                onClick={() => subbmitHandler()}
                            />
                        </Tooltip>
                    </div>
                    <Tooltip
                        placement="top"
                        title={`Макс партия: ${OperationStore.maxLot}`}
                    >
                        <PrimeField
                            {...{ primeData, setPrameValue }}
                            fieldName={'lot'}
                            type={primeData.lot.type}
                            step={primeData.lot.step}
                        />
                    </Tooltip>
                    <PrimeField
                        {...{ primeData, setPrameValue }}
                        fieldName={'numDocument'}
                        type={primeData.numDocument.type}
                        step={primeData.numDocument.step}
                    />
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
                        item={item.sizeRangeId}
                        onChangeHandler={(v) =>
                            setValue(index, 'sizeRangeId', v as string)
                        }
                        options={sizeRange}
                    />
                    <SelectField
                        item={item.materialGroup}
                        onChangeHandler={(v) => setValue(index, 'materialGroup', +v)}
                        options={materialGroup}
                    />
                    <Field
                        item={item.widthInDocument}
                        onChangeHandler={(v) => setValue(index, 'widthInDocument', +v)}
                        type={item.widthInDocument.type}
                        step={item.widthInDocument.step}
                    />
                    <Field
                        item={item.widthIn}
                        onChangeHandler={(v) => setValue(index, 'widthIn', +v)}
                        type={item.widthIn.type}
                        step={item.widthIn.step}
                    />
                </div>
            ))}
        </Wrapper>
    );
});
