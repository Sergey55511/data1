import { Button, notification, Tooltip } from 'antd';
import { Title } from '../../../../Shared/Title';
import { Wrapper } from './style';
import { useEffect, useRef, useState } from 'react';
import { iItem, initData, initPrimeData, iPrimeData } from './constants';
import { PrimeField } from './Components/fields';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../../../../Store/useStores';
import { iData, iField } from '../../../../../../Shared/Types/interfaces';
import { Frame } from '../../../../Shared/Frame';
import { STATE, WORKPIECETYPE } from '../../../../../../Shared/constants';
import { InputNumber, tValue } from '../../../../Shared/InputNumber';
import { Row } from '../../../../Shared/Row';
import { checkDuplicate, getTotalSum, validation } from '../../../../Helpers';
import { InputField } from '../../../../Shared/InputField';
import { SelectField } from '../../../../Shared/SelectField';
import { useKeyArrow } from '../../../Orders/GetOrder/Components/Shared/Hooks/useKeyArrow';
import { useQuery } from '@tanstack/react-query';
import { getFraction, getMaterialGroup } from '../../../../../Store/Lists/api';

export interface iState {
    fractionId: iField;
    materialGroupId: iField;
    widthInDocument: iField;
    widthIn: iField;
    moneyIn: iField;
    duplicate: boolean;
}

export const NewItem = observer(() => {
    const [primeData, setPrimeData] = useState<iPrimeData>(initPrimeData());
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<iState[]>([]);
    const tuched = useRef(false);
    const { OperationStore, loginStore } = useStores();
    const { onKeyDown, onFocus, refHandler } = useKeyArrow();

    useEffect(() => {
        OperationStore.getMaxLot();
    }, []);

    const addRowHandler = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        setData((prev) => {
            const newRow = initData();
            return [...prev, newRow];
        });
    };

    const removeHandler = (index: number) => {
        setData((prev) => prev.filter((_, i) => i != index));
    };

    const setItemValue = (item: iItem, value: any) => {
        item.value = value;
        item.isError = value ? false : true;
    };

    const onChange = (index: number, v: string | number, fieldName: keyof iState) => {
        setData((prev) => {
            const field = prev[index][fieldName] as iField;
            field.value = v;
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
        const isError = validation(setData);
        const errorNote = () => {
            notification.error({
                message: 'Ошибка!',
                description: 'Не верно заполнены поля!',
            });
        };
        if (!data.length) {
            errorNote();
            throw { error: 'error count row' };
        }
        if (isError) {
            errorNote();
            throw { error: 'validation error' };
        }

        const totalSum = getTotalSum(data);
        if (!totalSum) {
            errorNote();
            throw { error: 'error total sym' };
        }
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
                materialGroupId: +item.materialGroupId.value,
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
    };

    const copyRow = (index: number) => {
        setData((prev) => {
            const elem: iState = JSON.parse(JSON.stringify(prev[index]));
            elem.widthIn.value = '';
            prev.splice(index + 1, 0, elem);
            return [...prev];
        });
    };

    const storeId = loginStore.user.storeId;
    const fraction = useQuery(['fraction', storeId], getFraction, { enabled: !!storeId });
    const materialGroup = useQuery(['getMaterialGroup', storeId], getMaterialGroup, {
        enabled: !!storeId,
    });

    const stateDuplicate: iState[] = checkDuplicate(data);

    return (
        <Wrapper>
            <Title text="Приход сырья:" />
            <Frame legend="Общие данные">
                <div className="primeData">
                    <div>
                        <Tooltip
                            placement="top"
                            title={`Макс партия: ${OperationStore.maxLot || 0}`}
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
            {stateDuplicate.map((item, index) => (
                <Row
                    key={index}
                    copyRow={() => copyRow(index)}
                    removeRow={() => removeHandler(index)}
                    isDuplicate={item.duplicate}
                    fields={[
                        <InputField key="fractionId" isError={item.fractionId.isError}>
                            <SelectField
                                placeholder={item.fractionId.placeholder}
                                value={+item.fractionId.value || undefined}
                                onChange={(v) => onChange(index, v, 'fractionId')}
                                options={fraction.data?.map((item) => ({
                                    value: item.id,
                                    caption: item.fraction,
                                }))}
                                selectProps={{
                                    disabled: fraction.isLoading,
                                    loading: fraction.isFetching,
                                }}
                            />
                        </InputField>,
                        <InputField key="gradeId" isError={item.materialGroupId.isError}>
                            <SelectField
                                placeholder={item.materialGroupId.placeholder}
                                value={+item.materialGroupId.value || undefined}
                                onChange={(v) => onChange(index, v, 'materialGroupId')}
                                options={materialGroup.data?.map((item) => ({
                                    value: item.id,
                                    caption: item.materialGroup,
                                }))}
                                selectProps={{
                                    disabled: materialGroup.isLoading,
                                    loading: materialGroup.isFetching,
                                }}
                            />
                        </InputField>,
                        <InputField
                            key="widthInDocument"
                            isError={item.widthInDocument.isError}
                        >
                            <InputNumber
                                placeholder={item.widthInDocument.placeholder}
                                onChangeHandler={(v) => {
                                    onChange(index, v!, 'widthInDocument');
                                }}
                                value={item.widthInDocument.value || ''}
                            />
                        </InputField>,
                        <InputField key="widthIn" isError={item.widthIn.isError}>
                            <InputNumber
                                placeholder={item.widthIn.placeholder}
                                onChangeHandler={(v) => {
                                    onChange(index, v!, 'widthIn');
                                }}
                                value={item.widthIn.value || ''}
                                ref={(r) => refHandler(r, index)}
                                onKeyDown={onKeyDown}
                                onFocus={() => onFocus(index)}
                            />
                        </InputField>,
                        <InputField key="moneyIn" isError={item.moneyIn.isError}>
                            <InputNumber
                                placeholder={item.moneyIn.placeholder}
                                onChangeHandler={(v) => {
                                    onChange(index, v!, 'moneyIn');
                                }}
                                value={item.moneyIn.value || ''}
                            />
                        </InputField>,
                    ]}
                />
            ))}
        </Wrapper>
    );
});
