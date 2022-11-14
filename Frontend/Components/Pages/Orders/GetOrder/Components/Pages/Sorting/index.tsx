import { CheckOutlined } from '@ant-design/icons';
import { Button, notification, Tooltip } from 'antd';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
    OPERATIONS,
    STATE,
    WORKPIECETYPE,
} from '../../../../../../../../Shared/constants';
import { prepareDataTable } from '../../../../../../../../Shared/Helpers';
import { iData, iGrade } from '../../../../../../../../Shared/Types/interfaces';
import { useStores } from '../../../../../../../Store/useStores';
import { getLosseObject, getMoveBackMoney } from '../../../../../../Helpers';
import { confirmAction } from '../../../../../../Shared/ConfirmSubbmit';
import { InputNumber, tValue } from '../../../../../../Shared/InputNumber';
import { Title } from '../../Shared/Title';
import { getRootLists } from './Components/Hooks';
import { Row } from './Components/Row';
import { Wrapper } from './style';

interface iField {
    key: string;
    placeholder: string;
    value: string | number;
    isError: boolean;
}
export interface iState {
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

export const Sorting = observer(
    ({ record, stateId }: { record: iData; stateId: number }) => {
        const { ListsStore, OperationStore, loginStore } = useStores();
        const [state, setState] = useState<iState[]>([]);
        const [grade, setGrade] = useState<iGrade[]>([]);
        const [moveBack, setMoveBack] = useState<tValue>(undefined);
        const [losses, setLosses] = useState<number>(0);
        const [isLoading, setIsLoading] = useState(false);
        const router = useRouter();
        const getTotalSum = () =>
            state.reduce((res, item) => {
                return (res += +item.widthIn.value || 0);
            }, 0);

        useEffect(() => {
            getRootLists(ListsStore, setGrade, loginStore.user.storeId);
        }, [loginStore.user.storeId]);

        useEffect(() => {
            const totalSum = getTotalSum();
            const res = (record?.widthOut || 0) - totalSum - (moveBack ? +moveBack : 0);
            setLosses(isNaN(res) ? 0 : res);
        }, [state, moveBack]);

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
            const code = record.code ? record.code * -1 : 0;
            const codeOneItem = record.width ? code / totalSum : 0;
            const data: iData[] = state.map((item) => ({
                ...record,
                typeId: +item.typeId.value,
                gradeId: +item.gradeId.value,
                colorId: +item.colorId.value,
                sizeRangeId: +item.sizeRangeId.value,
                widthOut: undefined,
                widthIn: +item.widthIn.value!,
                stateId,
                moneyIn: item.widthIn.value ? codeOneItem * +item.widthIn.value : 0,
            }));
            if (losses) {
                data.push(getLosseObject(record, WORKPIECETYPE.losses.id, losses));
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
                <Title
                    subbmitHandler={subbmitHandler}
                    addRowHandler={addRowHandler}
                    setMoveBack={setMoveBack}
                    moveBack={moveBack}
                    losses={losses}
                    isLoading={isLoading}
                />
                <div>
                    {state.map((item, index) => {
                        return (
                            <Row
                                key={index}
                                grade={grade}
                                index={index}
                                state={item}
                                setState={setState}
                                isLoading={isLoading}
                                removeRow={removeRow}
                            />
                        );
                    })}
                </div>
            </Wrapper>
        );
    },
);
