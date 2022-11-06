import { CheckOutlined } from '@ant-design/icons';
import { Button, notification, Tooltip } from 'antd';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { OPERATIONS, WORKPIECETYPE } from '../../../../../../../../Shared/constants';
import { prepareDataTable } from '../../../../../../../../Shared/Helpers';
import { iData } from '../../../../../../../../Shared/Types/interfaces';
import { useStores } from '../../../../../../../Store/useStores';
import { InputNumber, tValue } from '../../../../../../Shared/InputNumber';
import { Row } from './Components/Row';
import { Wrapper } from './style';
import { Modal } from 'antd';
import { confirmAction } from '../../../../../../Shared/ConfirmSubbmit';
import { getLosseObject, getMoveBackMoney } from '../../../../../../Helpers';

const { confirm } = Modal;

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
        const { OperationStore, ListsStore, loginStore } = useStores();
        const [state, setState] = useState<iState[]>([]);
        const [losses, setLosses] = useState<number>(0);
        const [garbage, setGarbage] = useState<number | undefined>(undefined);
        const [moveBack, setMoveBack] = useState<tValue>(undefined);
        const [isLoading, setIsLoading] = useState(false);
        const router = useRouter();
        const getTotalSum = () =>
            state.reduce((res, item) => {
                return (res += +item.widthIn.value || 0);
            }, 0);

        useEffect(() => {
            if (loginStore.user.storeId)
                ListsStore.getWorkpieceType({
                    storeId: loginStore.user.storeId,
                    operationId: OPERATIONS.slice.id,
                });
        }, [loginStore.user.storeId]);

        useEffect(() => {
            const totalSum = getTotalSum();
            const res =
                (record?.widthOut || 0) -
                totalSum -
                (garbage || 0) -
                (moveBack ? +moveBack : 0);
            setLosses(isNaN(res) ? 0 : res);
        }, [state, garbage, moveBack]);

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
            const code = record.code ? record.code * -1 : 0;
            const codeOneItem = record.width ? code / totalSum : 0;
            const data: iData[] = state.map((item) => ({
                ...record,
                workpieceTypeId: +item.workpieceTypeId.value,
                gradeId: +item.gradeId.value,
                colorId: +item.colorId.value,
                lengthId: item.length.value ? +item.length.value : undefined,
                sizeRangeId: +item.sizeRangeId.value,
                widthOut: undefined,
                widthIn: +item.widthIn.value!,
                fractionId: undefined,
                grade: undefined,
                workpieceType: undefined,
                productionId: undefined,
                stateId,
                moneyIn: item.widthIn.value ? codeOneItem * +item.widthIn.value : 0,
            }));
            if (losses) {
                data.push(getLosseObject(record, WORKPIECETYPE.losses.id, losses));
            }

            if (garbage) {
                data.push(getLosseObject(record, WORKPIECETYPE.garbage.id, garbage));
            }

            if (moveBack) {
                const moveBackMoney = getMoveBackMoney(
                    record.code,
                    record.width,
                    moveBack ? +moveBack : undefined,
                );
                data.push({
                    ...record,
                    widthOut: +moveBack * -1,
                    moneyOut: moveBackMoney,
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
                    <div>
                        <InputNumber
                            placeholder="Отход"
                            onChangeHandler={(v) => setGarbage(v ? +v : undefined)}
                            value={garbage}
                        />
                    </div>
                    <div>
                        <InputNumber
                            placeholder="Возврат"
                            value={moveBack}
                            onChangeHandler={(v) => {
                                setMoveBack(v);
                            }}
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
