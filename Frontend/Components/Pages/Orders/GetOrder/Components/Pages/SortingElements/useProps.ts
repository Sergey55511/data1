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
import { round } from '../../../../../../../../Shared/Helpers';

export interface iState {
    color: iField;
    grade: iField;
    widthIn: iField;
}

export const useProps = ({ record, stateId }: { record: iData; stateId: number }) => {
    const { OperationStore, ListsStore, loginStore } = useStores();
    const [state, setState] = useState<iState[]>([]);
    const [sizeRagne, setSizeRagne] = useState<iSizeRange[]>([]);
    const [losses, setLosses] = useState<number>(0);
    const [moveBack, setMoveBack] = useState<tValue>(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {}, [loginStore.user.storeId]);

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
                    color: new Field('color', 'Цвет', false),
                    grade: new Field('grade', 'Сорт'),
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
            colorId: item.color.value ? +item.color.value : undefined,
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
    return {
        addRowHandler,
        removeRow,
        subbmitHandler,
        setMoveBack,
        losses,
        isLoading,
        moveBack,
        state,
        setState,
    };
};
