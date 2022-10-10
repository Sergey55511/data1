import { CheckOutlined, MinusOutlined } from '@ant-design/icons';
import { Button, notification, Tooltip } from 'antd';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { STATE, WORKPIECETYPE } from '../../../../../../../../Shared/constants';
import { prepareDataTable } from '../../../../../../../../Shared/Helpers';
import { iData } from '../../../../../../../../Shared/Types/interfaces';
import { useStores } from '../../../../../../../Store/useStores';
import { getLosseObject } from '../../../../../../Helpers';
import { confirmAction } from '../../../../../../Shared/ConfirmSubbmit';
import { InputField } from '../../../../../../Shared/InputField';
import { InputNumber } from '../../../../../../Shared/InputNumber';
import { SelectField } from '../../../../../../Shared/SelectField';
import { Wrapper } from './style';

interface iField {
    key: string;
    placeholder: string;
    value: string | number;
    isError: boolean;
}
interface iState {
    typeId: iField;
    gradeId: iField;
    colorId: iField;
    sizeRangeId: iField;
    widthIn: iField;
}
class Field implements iField {
    key;
    placeholder;
    value = '';
    isError = false;
    constructor(key: string, placeholder: string) {
        this.key = key;
        this.placeholder = placeholder;
    }
}

export const Sorting = observer(({ record }: { record: iData }) => {
    const { ListsStore, OperationStore } = useStores();
    const [state, setState] = useState<iState[]>([]);
    const [losses, setLosses] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const getTotalSum = () =>
        state.reduce((res, item) => {
            return (res += +item.widthIn.value || 0);
        }, 0);

    useEffect(() => {
        const totalSum = getTotalSum();
        const res = (record?.widthOut || 0) - totalSum;
        setLosses(isNaN(res) ? 0 : res);
    }, [state]);

    const addRowHandler = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        setState((prev) => {
            const res: iState[] = [
                ...prev,
                {
                    typeId: new Field('typeId', 'Тип'),
                    gradeId: new Field('gradeId', 'Сорт'),
                    colorId: new Field('colorId', 'Цвет'),
                    sizeRangeId: new Field('sizeRangeId', 'Размерный ряд'),
                    widthIn: new Field('widthIn', 'Вес гр.'),
                },
            ];
            return res;
        });
    };

    const removeRow = (index: number) => {
        setState((prev) => prev.filter((_, i) => i != index));
    };

    const validation = () => {
        let isError = false;
        setState((prev) => {
            const res = prev.map((item) => {
                for (const k in item) {
                    const key = k as keyof iState;
                    if (!item[key].value) {
                        isError = true;
                        item[key].isError = true;
                    } else item[key].isError = false;
                }
                return { ...item };
            });
            return res;
        });
        return isError;
    };

    const confirmSubbmit = () => {
        confirmAction({ subbmitHandler });
    };

    const subbmitHandler = async () => {
        const errorNote = () => {
            notification.error({
                message: 'Ошибка!',
                description: 'Не верно заполнены поля!',
            });
        };
        if (!state.length) {
            errorNote();
            return;
        }

        const isError = validation();
        if (isError) {
            errorNote();
            return;
        }

        const totalSum = getTotalSum();
        if (!totalSum) {
            errorNote();
            return;
        }
        if (losses < 0) {
            errorNote();
            return;
        }

        const data: iData[] = state.map((item) => ({
            ...record,
            typeId: +item.typeId.value,
            gradeId: +item.gradeId.value,
            colorId: +item.colorId.value,
            sizeRangeId: +item.sizeRangeId.value,
            widthOut: undefined,
            widthIn: +item.widthIn.value!,
            stateId: STATE.sorted.id,
        }));
        if (losses) {
            data.push(getLosseObject(record, WORKPIECETYPE.losses.id, losses));
        }

        const dataTable = data.map((item) => prepareDataTable(item));
        setIsLoading(true);
        await OperationStore.postOrderResult(dataTable);
        notification.success({
            message: 'Сохранение прошло успешно',
        });
        router.push('/orders');
        setIsLoading(false);
    };

    return (
        <Wrapper>
            <div className="title">
                <Tooltip title="Сохранить">
                    <Button
                        shape="circle"
                        icon={<CheckOutlined />}
                        onClick={confirmSubbmit}
                        loading={isLoading}
                    />
                </Tooltip>
                <a href="#" onClick={addRowHandler}>
                    Добавить строку
                </a>
                <div className={losses < 0 ? 'red' : ''}>потеря: {losses}</div>
            </div>
            <div>
                {state.map((item, index) => {
                    const onChange = (
                        v: string | number,
                        index: number,
                        fieldName: keyof iState,
                    ) => {
                        setState((prev) => {
                            prev[index][fieldName].value = v;
                            return [...prev];
                        });
                    };
                    return (
                        <div key={index} className="row">
                            <Tooltip title="Удалить строку">
                                <Button
                                    shape="circle"
                                    icon={<MinusOutlined />}
                                    onClick={() => removeRow(index)}
                                    loading={isLoading}
                                />
                            </Tooltip>
                            <div className="item">
                                <InputField isError={item.typeId.isError}>
                                    <SelectField
                                        placeholder={item.typeId.placeholder}
                                        value={+item.typeId.value || undefined}
                                        onChange={(v) => onChange(v, index, 'typeId')}
                                        options={ListsStore.types.map((item) => ({
                                            value: item.id,
                                            caption: item.type,
                                        }))}
                                    />
                                </InputField>
                            </div>
                            <div className="item">
                                <InputField isError={item.gradeId.isError}>
                                    <SelectField
                                        placeholder={item.gradeId.placeholder}
                                        value={+item.gradeId.value || undefined}
                                        onChange={(v) => onChange(v, index, 'gradeId')}
                                        options={ListsStore.grades.map((item) => ({
                                            value: item.id,
                                            caption: item.grade,
                                        }))}
                                    />
                                </InputField>
                            </div>
                            <div className="item">
                                <InputField isError={item.colorId.isError}>
                                    <SelectField
                                        placeholder={item.colorId.placeholder}
                                        value={+item.colorId.value || undefined}
                                        onChange={(v) => onChange(v, index, 'colorId')}
                                        options={ListsStore.colors.map((item) => ({
                                            value: item.id,
                                            caption: item.color,
                                        }))}
                                    />
                                </InputField>
                            </div>
                            <div className="item">
                                <InputField isError={item.sizeRangeId.isError}>
                                    <SelectField
                                        placeholder={item.sizeRangeId.placeholder}
                                        value={+item.sizeRangeId.value || undefined}
                                        onChange={(v) =>
                                            onChange(v, index, 'sizeRangeId')
                                        }
                                        options={ListsStore.sizeRange.map((item) => ({
                                            value: item.id,
                                            caption: item.sizeRange,
                                        }))}
                                    />
                                </InputField>
                            </div>
                            <div className="item">
                                <InputField isError={item.widthIn.isError}>
                                    <InputNumber
                                        placeholder={item.widthIn.placeholder}
                                        onChangeHandler={(v) => {
                                            onChange(v!, index, 'widthIn');
                                        }}
                                        value={item.widthIn.value || ''}
                                    />
                                </InputField>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Wrapper>
    );
});
