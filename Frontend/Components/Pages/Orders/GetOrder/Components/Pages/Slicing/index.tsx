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
import { getTotalSum, sendData, validation } from '../../../../../../Helpers';
import { Title } from '../../Shared/Title';
import { Field } from '../../../../../../Helpers/classes';

export interface iState {
    stateId: iField;
    workpieceTypeId: iField;
    gradeId: iField;
    colorId: iField;
    sizeRangeId: iField;
    widthIn: iField;
}

export const Slicing = observer(
    ({
        record,
        stateId,
        isShowState,
    }: {
        record: iData;
        stateId: number;
        isShowState?: boolean;
    }) => {
        const { OperationStore } = useStores();
        const [state, setState] = useState<iState[]>([]);
        const [losses, setLosses] = useState<number>(0);
        const [garbage, setGarbage] = useState<number | undefined>(undefined);
        const [moveBack, setMoveBack] = useState<tValue>(undefined);
        const [isLoading, setIsLoading] = useState(false);
        const router = useRouter();

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
                const newRow: iState = {
                    stateId: new Field('stateId', 'Состояние'),
                    workpieceTypeId: new Field('workpieceTypeId', 'Тип загатовки'),
                    gradeId: new Field('gradeId', 'Сорт'),
                    colorId: new Field('colorId', 'Цвет'),
                    sizeRangeId: new Field('sizeRangeId', 'Размерный ряд'),
                    widthIn: new Field('widthIn', 'Вес гр.'),
                };
                newRow.stateId.value = stateId;
                const res: iState[] = [...prev, newRow];
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
                sizeRangeId: +item.sizeRangeId.value,
                widthOut: undefined,
                widthIn: +item.widthIn.value!,
                fractionId: undefined,
                materialGroupId: undefined,
                typeId: undefined,
                workpieceType: undefined,
                productionId: undefined,
                stateId: +item.stateId,
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
                garbage,
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
                            isShowState={isShowState}
                        />
                    ))}
                </div>
            </Wrapper>
        );
    },
);
