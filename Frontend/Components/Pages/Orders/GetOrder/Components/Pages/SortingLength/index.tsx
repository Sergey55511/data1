import { notification } from 'antd';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { OPERATIONS } from '../../../../../../../../Shared/constants';
import {
    iData,
    iField,
    iSizeRange,
} from '../../../../../../../../Shared/Types/interfaces';
import { useStores } from '../../../../../../../Store/useStores';
import { tValue } from '../../../../../../Shared/InputNumber';
import { RowWrapper } from './Components/RowWrapper';
import { Wrapper } from './style';
import { getTotalSum, sendData, validation } from '../../../../../../Helpers';
import { Title } from '../../Shared/Title';
import { Field } from '../../../../../../Helpers/classes';

export interface iState {
    sizeRange: iField;
    length: iField;
    widthIn: iField;
}

export const SortingLength = observer(
    ({ record, stateId }: { record: iData; stateId: number }) => {
        const { OperationStore, ListsStore, loginStore } = useStores();
        const [state, setState] = useState<iState[]>([]);
        const [sizeRagne, setSizeRagne] = useState<iSizeRange[]>([]);
        const [losses, setLosses] = useState<number>(0);
        const [moveBack, setMoveBack] = useState<tValue>(undefined);
        const [isLoading, setIsLoading] = useState(false);
        const router = useRouter();

        useEffect(() => {
            const fetch = async () => {
                if (loginStore.user.storeId) {
                    const oneRowSizeRange = (await ListsStore.getSizeRange(
                        {
                            storeId: loginStore.user.storeId,
                            operationId: OPERATIONS.sortingLength.id,
                            workpieceTypeId: record.workpieceTypeId,
                        },
                        record.sizeRangeId,
                    )) as iSizeRange[];

                    let sizeRange = (await ListsStore.getSizeRange({
                        storeId: loginStore.user.storeId,
                        operationId: OPERATIONS.sortingLength.id,
                        workpieceTypeId: record.workpieceTypeId,
                    })) as iSizeRange[];
                    sizeRange = sizeRange.filter(
                        (item) => item.size == oneRowSizeRange[0].size,
                    );
                    setSizeRagne(sizeRange);
                }
            };
            fetch();
        }, [loginStore.user.storeId]);

        useEffect(() => {
            const totalSum = getTotalSum(state);
            const res = (record?.widthOut || 0) - totalSum - (moveBack ? +moveBack : 0);
            setLosses(isNaN(res) ? 0 : res);
        }, [state, moveBack]);

        const addRowHandler = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
            e.preventDefault();
            setState((prev) => {
                const res: iState[] = [
                    ...prev,
                    {
                        sizeRange: new Field('sizeRangeId', 'Размер'),
                        length: new Field('length', 'Длинна', false),
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
                sizeRangeId: +item.sizeRange.value,
                lengthId: item.length.value ? +item.length.value : undefined,
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
                    {state.map((item, index) => (
                        <RowWrapper
                            index={index}
                            state={item}
                            removeRow={removeRow}
                            setState={setState}
                            isLoading={isLoading}
                            sizeRange={sizeRagne}
                            workpieceTypeId={record.workpieceTypeId}
                            key={index}
                        />
                    ))}
                </div>
            </Wrapper>
        );
    },
);
