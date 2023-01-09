import { notification } from 'antd';
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
import { getTotalSum, sendData, validation } from '../../../../../../Helpers';
import { Field } from '../../../../../../Helpers/classes';
import { round } from '../../../../../../../../Shared/Helpers';
import moment from 'moment';

export interface iState {
    length: iField;
    grade: iField;
    widthIn: iField;
}
export interface iProps {
    record: iData;
    stateId: number;
}

export const useProps = ({ record, stateId }: iProps) => {
    const { OperationStore, ListsStore, loginStore } = useStores();
    const [state, setState] = useState<iState[]>([]);
    const [sizeRagne, setSizeRagne] = useState<iSizeRange[]>([]);
    const [losses, setLosses] = useState<number>(0);
    const [date, setDate] = useState<moment.Moment | undefined>(moment());
    const [moveBack, setMoveBack] = useState<tValue>(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetch = async () => {
            if (loginStore.user.storeId) {
                const oneRowSizeRange = (await ListsStore.getSizeRange(
                    {},
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
                    length: new Field('length', 'Длинна'),
                    grade: new Field('grade', 'сорт'),
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
            date,
            lengthId: item.length.value ? +item.length.value : undefined,
            widthOut: undefined,
            widthIn: +item.widthIn.value!,
            fractionId: undefined,
            gradeId: item.grade.value ? +item.grade.value : undefined,
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

    const copyRow = (index: number) => {
        setState((prev) => {
            const elem: iState = JSON.parse(JSON.stringify(prev[index]));
            elem.widthIn.value = '';
            prev.splice(index + 1, 0, elem);
            return [...prev];
        });
    };

    return {
        subbmitHandler,
        addRowHandler,
        setMoveBack,
        moveBack,
        losses,
        isLoading,
        state,
        removeRow,
        copyRow,
        setState,
        record,
        date,
        setDate,
    };
};
