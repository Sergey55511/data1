import { notification } from 'antd';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { iData, iField } from '../../../../../../../../Shared/Types/interfaces';
import { useStores } from '../../../../../../../Store/useStores';
import { tValue } from '../../../../../../Shared/InputNumber';
import { Row } from './Components/Row';
import { Wrapper } from './style';
import { getTotalSum, sendData, validation } from '../../../../../../Helpers';
import { Title } from '../../Shared/Title';
import { Field } from '../../../../../../Helpers/classes';
import { usePostData } from './Components/Hooks/usePostData';
import { OPERATIONS, STATE } from '../../../../../../../../Shared/constants';

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

        const postData = usePostData();

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
                if (operationId == OPERATIONS.slice.id) newRow.stateId.value = stateId;
                const res: iState[] = [...prev, newRow];
                return res;
            });
        };

        const removeRow = (index: number) => {
            setState((prev) => prev.filter((_, i) => i != index));
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
                    losses={losses}
                    isLoading={postData?.isLoading}
                />
                <div>
                    {state.map((item, index) => (
                        <Row
                            index={index}
                            state={item}
                            removeRow={removeRow}
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
