import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { iData, iField } from '../../../../../../../../Shared/Types/interfaces';
import { tValue } from '../../../../../../Shared/InputNumber';
import { Row } from './Components/Row';
import { Wrapper } from './style';
import { getTotalSum } from '../../../../../../Helpers';
import { Title } from '../../Shared/Title';
import { Field } from '../../../../../../Helpers/classes';
import { usePostData } from './Components/Hooks/usePostData';
import { OPERATIONS } from '../../../../../../../../Shared/constants';
import { round } from '../../../../../../../../Shared/Helpers';

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
        operationId,
    }: {
        record: iData;
        stateId: number;
        isShowState?: boolean;
        operationId: number;
    }) => {
        const [state, setState] = useState<iState[]>([]);
        const [losses, setLosses] = useState<number>(0);
        const [garbage, setGarbage] = useState<number | undefined>(undefined);
        const [moveBack, setMoveBack] = useState<tValue>(undefined);
        const [defect, setDefect] = useState<tValue>(undefined);
        const postData = usePostData();

        useEffect(() => {
            const totalSum = getTotalSum(state);
            let res =
                (record?.widthOut || 0) -
                totalSum -
                (garbage || 0) -
                (moveBack ? +moveBack : 0);
            res = isNaN(res) ? 0 : res;
            res = round(res);
            setLosses(res);
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
                if (operationId == OPERATIONS.slice.id) newRow.stateId.value = stateId;
                const res: iState[] = [...prev, newRow];
                return res;
            });
        };

        const removeRow = (index: number) => {
            setState((prev) => prev.filter((_, i) => i != index));
        };
        const copyRow = (index: number) => {
            setState((prev) => {
                const elem: iState = JSON.parse(JSON.stringify(prev[index]));
                elem.widthIn.value = '';
                prev.splice(index + 1, 0, elem);
                return [...prev];
            });
        };

        const subbmitHandler = () => {
            postData?.mutate({
                state,
                setState,
                losses,
                record,
                garbage,
                moveBack,
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
                    setDefect={setDefect}
                    defect={defect}
                    losses={losses}
                    isLoading={postData?.isLoading}
                />
                <div>
                    {state.map((item, index) => (
                        <Row
                            index={index}
                            state={item}
                            removeRow={removeRow}
                            copyRow={copyRow}
                            setState={setState}
                            key={index}
                            isShowState={isShowState}
                            operationId={operationId}
                        />
                    ))}
                </div>
            </Wrapper>
        );
    },
);
