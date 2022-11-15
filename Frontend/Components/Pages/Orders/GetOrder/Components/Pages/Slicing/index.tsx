import { notification } from 'antd';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { OPERATIONS } from '../../../../../../../../Shared/constants';
import { iData, iField } from '../../../../../../../../Shared/Types/interfaces';
import { useStores } from '../../../../../../../Store/useStores';
import { tValue } from '../../../../../../Shared/InputNumber';
import { Row } from './Components/Row';
import { Wrapper } from './style';
import {
    getTotalSum,
    sendData,
    validation,
} from '../../../../../../Helpers';
import { Title } from '../../Shared/Title';
import { Field } from '../../../../../../Helpers/classes';

export interface iState {
    workpieceTypeId: iField;
    gradeId: iField;
    colorId: iField;
    length: iField;
    sizeRangeId: iField;
    widthIn: iField;
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

        useEffect(() => {
            if (loginStore.user.storeId) {
                ListsStore.getWorkpieceType({
                    storeId: loginStore.user.storeId,
                    operationId: OPERATIONS.slice.id,
                });
                ListsStore.getColors({
                    storeId: loginStore.user.storeId,
                });
            }
        }, [loginStore.user.storeId]);

        useEffect(() => {
            const totalSum = getTotalSum(state);
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

            sendData({
                data,
                record,
                setIsLoading,
                postOrderResult: OperationStore.postOrderResult,
                router,
                losses,
                moveBack,
                garbage
            });
        };

        return (
            <Wrapper>
                <Title
                    subbmitHandler={subbmitHandler}
                    addRowHandler={addRowHandler}
                    setGarbage={setGarbage}
                    setMoveBack={setMoveBack}
                    garbage={garbage}
                    moveBack={moveBack}
                    losses={losses}
                    isLoading={isLoading}
                />
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
