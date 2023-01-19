import { notification } from 'antd';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { OPERATIONS } from '../../../../../../../../Shared/constants';
import { round } from '../../../../../../../../Shared/Helpers';
import {
    iData,
    iField,
    iGrade,
    iSizeRange,
} from '../../../../../../../../Shared/Types/interfaces';
import { useStores } from '../../../../../../../Store/useStores';
import {
    getTotalSum,
    validation,
    sendData,
    getCodeOneItem,
} from '../../../../../../Helpers';
import { Field } from '../../../../../../Helpers/classes';
import { tValue } from '../../../../../../Shared/InputNumber';

export interface iState {
    sizeRange: iField;
    grade: iField;
    widthIn: iField;
}
export interface iProps {
    record: iData;
    stateId: number;
}

export const useProps = ({ record, stateId }: iProps) => {
    const [moveBack, setMoveBack] = useState<tValue>(undefined);
    const { ListsStore, loginStore, OperationStore } = useStores();
    const [grades, setGrades] = useState<iGrade[]>([]);
    const [nextType, setNextType] = useState<number | undefined>(undefined);
    const [date, setDate] = useState<moment.Moment | undefined>(moment());
    const [state, setState] = useState<iState[]>([]);
    const [defect, setDefect] = useState<tValue>(undefined);
    const [losses, setLosses] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(false);
    const [sizeRange, setSizeRange] = useState<iSizeRange[]>([]);

    const router = useRouter();

    const removeRow = (index: number) => {
        setState((prev) => prev.filter((_, i) => i != index));
    };

    useEffect(() => {
        const totalSum = getTotalSum(state);
        let res =
            (record?.widthOut || 0) -
            totalSum -
            (defect ? +defect : 0) -
            (moveBack ? +moveBack : 0);
        res = isNaN(res) ? 0 : res;
        res = round(res);
        setLosses(res);
    }, [state, defect, moveBack]);

    useEffect(() => {
        if (loginStore.user.storeId) {
            ListsStore.getWorkpieceType({
                storeId: loginStore.user.storeId,
            });
        }
    }, [loginStore.user.storeId]);

    useEffect(() => {
        const getSizeRange = async () => {
            if (loginStore.user.storeId && ListsStore.workpieceType.length) {
                const nextType = ListsStore.workpieceType.find(
                    (item) => item.id == record.workpieceTypeId,
                )?.nextTypeId;

                setNextType(nextType);

                let sizeRange: iSizeRange[] = await ListsStore.getSizeRange({
                    storeId: loginStore.user.storeId,
                    operationId: OPERATIONS.makeBall.id,
                    workpieceTypeId: nextType,
                });

                const Grades: iGrade[] = await ListsStore.getGrades({
                    storeId: loginStore.user.storeId,
                    operationId: OPERATIONS.makeBall.id,
                    workpieceTypeId: nextType,
                });

                setGrades(Grades);

                let sizeRangeRecord = sizeRange.find(
                    (item) => item.id == record.sizeRangeId,
                );

                const sizeRecord = sizeRangeRecord ? sizeRangeRecord.size : 9999;

                sizeRange = sizeRange.filter((item) => item.size <= sizeRecord);

                setSizeRange(sizeRange);
            }
        };
        getSizeRange();
    }, [loginStore.user.storeId, ListsStore.workpieceType.length]);

    const onChange = (v: string | number, index: number, fieldName: keyof iState) => {
        setState((prev) => {
            prev[index][fieldName].value = v;
            return [...prev];
        });
    };

    const addRowHandler = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        setState((prev) => {
            const res: iState[] = [
                ...prev,
                {
                    sizeRange: new Field('sizeRangeId', 'Размерный ряд'),
                    grade: new Field('gradeId', 'Сорт', false),
                    widthIn: new Field('widthIn', 'Вес гр.'),
                },
            ];
            return res;
        });
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

        const codeOneItem = getCodeOneItem({
            recordCode: record.code,
            recordWidth: record.width,
            moveBack,
            totalSum,
        });

        const data: iData[] = state.map((item) => ({
            ...record,
            date,
            workpieceTypeId: nextType,
            sizeRangeId: +item.sizeRange.value,
            gradeId: +item.grade.value,
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
            defect,
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
        setDefect,
        defect,
        losses,
        isLoading,
        state,
        onChange,
        copyRow,
        sizeRange,
        grades,
        removeRow,
        date,
        setDate,
    };
};
