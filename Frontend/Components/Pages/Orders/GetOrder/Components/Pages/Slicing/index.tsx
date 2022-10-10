import { CheckOutlined, MinusOutlined } from '@ant-design/icons';
import { Button, Input, notification, Tooltip } from 'antd';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { STATE, WORKPIECETYPE } from '../../../../../../../../Shared/constants';
import { prepareDataTable } from '../../../../../../../../Shared/Helpers';
import { iData, iLength } from '../../../../../../../../Shared/Types/interfaces';
import { useStores } from '../../../../../../../Store/useStores';
import { InputField } from '../../../../../../Shared/InputField';
import { InputNumber } from '../../../../../../Shared/InputNumber';
import { SelectField } from '../../../../../../Shared/SelectField';
import { Row } from './Components/Row';
import { Wrapper } from './style';

interface iField {
    key: string;
    placeholder: string;
    value: string | number;
    isError: boolean;
    isReqired: boolean;
}
export interface iState {
    workpieceTypeId: iField;
    gradeId: iField;
    colorId: iField;
    length: iField;
    sizeRangeId: iField;
    widthIn: iField;
}
class Field implements iField {
    key;
    placeholder;
    value = '';
    isError = false;
    isReqired = true;
    constructor(key: string, placeholder: string, isReqired = true) {
        this.key = key;
        this.placeholder = placeholder;
        this.isReqired = isReqired;
    }
}

export const Slicing = observer(
    ({ record, stateId }: { record: iData; stateId: number }) => {
        const { ListsStore, OperationStore } = useStores();
        const [state, setState] = useState<iState[]>([]);
        const [length, setLength] = useState<iLength[]>([]);
        const [losses, setLosses] = useState<number>(0);
        const [garbage, setGarbage] = useState<number | undefined>(undefined);
        const [isLoading, setIsLoading] = useState(false);
        const router = useRouter();
        const getTotalSum = () =>
            state.reduce((res, item) => {
                return (res += +item.widthIn.value || 0);
            }, 0);

        useEffect(() => {
            const totalSum = getTotalSum();
            const res = (record?.widthOut || 0) - totalSum - (garbage || 0);
            setLosses(isNaN(res) ? 0 : res);
        }, [state, garbage]);

        const addRowHandler = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
            e.preventDefault();
            setState((prev) => {
                const res: iState[] = [
                    ...prev,
                    {
                        workpieceTypeId: new Field('workpieceTypeId', 'Тип загатовки'),
                        length: new Field('length', 'Длинна', false),
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
                        if (item[key].isReqired) {
                            if (!item[key].value) {
                                isError = true;
                                item[key].isError = true;
                            } else item[key].isError = false;
                        }
                    }
                    return { ...item };
                });
                return res;
            });
            return isError;
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
                workpieceTypeId: +item.workpieceTypeId.value,
                gradeId: +item.gradeId.value,
                colorId: +item.colorId.value,
                lengthId: item.length.value ? +item.length.value : undefined,
                sizeRangeId: +item.sizeRangeId.value,
                widthOut: undefined,
                widthIn: +item.widthIn.value!,
                stateId,
            }));
            if (losses) {
                data.push({
                    ...record,
                    workpieceTypeId: WORKPIECETYPE.losses.id,
                    widthOut: undefined,
                    widthIn: +losses.toFixed(2),
                    stateId: undefined,
                });
            }

            if (garbage) {
                data.push({
                    ...record,
                    workpieceTypeId: WORKPIECETYPE.garbage.id,
                    widthOut: undefined,
                    widthIn: +garbage.toFixed(2),
                    stateId: undefined,
                });
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

        const getLengthValue = (index: string | number) => {
            if (index) return ListsStore.lengthes[+index].length;
        };

        return (
            <Wrapper>
                <div className="title">
                    <Tooltip title="Сохранить">
                        <Button
                            shape="circle"
                            icon={<CheckOutlined />}
                            onClick={subbmitHandler}
                            loading={isLoading}
                        />
                    </Tooltip>
                    <a href="#" onClick={addRowHandler}>
                        Добавить строку
                    </a>
                    <div>
                        <InputNumber
                            placeholder="Отход"
                            onChangeHandler={(v) => setGarbage(v ? +v : undefined)}
                            value={garbage}
                        />
                    </div>
                    <div className={losses < 0 ? 'red' : ''}>потеря: {losses}</div>
                </div>
                <div>
                    {state.map((item, index) => (
                        <Row
                            index={index}
                            state={item}
                            removeRow={removeRow}
                            setState={setState}
                            isLoading={isLoading}
                            key={index}
                        />
                    ))}
                </div>
            </Wrapper>
        );
    },
);
