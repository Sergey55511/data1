import { notification } from 'antd';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { round } from '../../../../../../../../Shared/Helpers';
import { iData, iField, iGrade } from '../../../../../../../../Shared/Types/interfaces';
import { useStores } from '../../../../../../../Store/useStores';
import { getTotalSum, sendData, validation } from '../../../../../../Helpers';
import { Field } from '../../../../../../Helpers/classes';
import { tValue } from '../../../../../../Shared/InputNumber';
import { Title } from '../../Shared/Title';
import { getRootLists } from './Components/Hooks';
import { Row } from './Components/Row';
import { Wrapper } from './style';

export interface iState {
    typeId: iField;
    gradeId: iField;
    colorId: iField;
    sizeRangeId: iField;
    widthIn: iField;
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

        useEffect(() => {
            getRootLists(ListsStore, setGrade, loginStore.user.storeId);
        }, [loginStore.user.storeId]);

        useEffect(() => {
            const totalSum = getTotalSum(state);
            let res = (record?.widthOut || 0) - totalSum - (moveBack ? +moveBack : 0);
            res = isNaN(res) ? 0 : res;
            res = round(res);
            setLosses(res);
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

            const isError = validation(setState);
            console.log('isError', isError);

            if (isError) {
                errorNote();
                return;
            }

            const totalSum = getTotalSum(state);
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
            sendData({
                data,
                record,
                setIsLoading,
                postOrderResult: OperationStore.postOrderResult,
                router,
                losses,
                moveBack,
            });
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
