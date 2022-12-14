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
import moment from 'moment';

export interface iState {
    stateId: iField;
    workpieceTypeId: iField;
    gradeId: iField;
    colorId: iField;
    sizeRangeId: iField;
    widthIn: iField;
    duplicate: boolean;
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
        const [garbage, setGarbage] = useState<tValue>(undefined);
        const [date, setDate] = useState<moment.Moment | undefined>(moment());
        const [defect, setDefect] = useState<tValue>(undefined);
        const [moveBack, setMoveBack] = useState<tValue>(undefined);
        const postData = usePostData();

        const checkDuplicate = (state: iState[]): iState[] => {
            let rows = state.map((item, index) => {
                const itemString = JSON.stringify({
                    stateId: item.stateId,
                    workpieceTypeId: item.workpieceTypeId,
                    gradeId: item.gradeId,
                    colorId: item.colorId,
                    sizeRangeId: item.sizeRangeId,
                });
                return { index, itemString, count: 0 };
            });

            rows.forEach((item) => {
                const find = rows.filter((itm) => itm.itemString == item.itemString);
                if (!find[0].count) {
                    const count = find.length;
                    find.forEach((itm) => (itm.count = count));
                }
            });

            let isNeedRefresh = false;

            return state.map((item, index) => {
                if (rows[index].count > 1) {
                    isNeedRefresh = true;
                    item.duplicate = true;
                } else {
                    item.duplicate = false;
                }
                return { ...item };
            });

            // if (isNeedRefresh) setState([...res]);
        };

        useEffect(() => {
            const totalSum = getTotalSum(state);
            let res =
                (record?.widthOut || 0) -
                totalSum -
                (garbage ? +garbage : 0) -
                (defect ? +defect : 0) -
                (moveBack ? +moveBack : 0);
            res = isNaN(res) ? 0 : res;
            res = round(res);
            setLosses(res);
        }, [state, garbage, moveBack, defect]);

        const addRowHandler = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
            e.preventDefault();
            setState((prev) => {
                const newRow: iState = {
                    stateId: new Field('stateId', '??????????????????'),
                    workpieceTypeId: new Field('workpieceTypeId', '?????? ??????????????????'),
                    gradeId: new Field('gradeId', '????????'),
                    colorId: new Field('colorId', '????????'),
                    sizeRangeId: new Field('sizeRangeId', '?????????????????? ??????'),
                    widthIn: new Field('widthIn', '?????? ????.'),
                    duplicate: false,
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
                defect,
                moveBack,
                date
            });
        };

        const data = checkDuplicate(state);

        return (
            <Wrapper>
                <Title
                    subbmitHandler={subbmitHandler}
                    addRowHandler={addRowHandler}
                    setMoveBack={setMoveBack}
                    garbage={garbage}
                    setGarbage={setGarbage}
                    defect={defect}
                    setDefect={setDefect}
                    moveBack={moveBack}
                    losses={losses}
                    isLoading={postData?.isLoading}
                    date={date}
                    setDate={setDate}
                />
                <div>
                    {data.map((item, index) => (
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
