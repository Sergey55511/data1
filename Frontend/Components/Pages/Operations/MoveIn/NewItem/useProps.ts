import { notification } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { iItem, initData, initPrimeData, iPrimeData } from './constants';
import { useStores } from '../../../../../Store/useStores';
import { iData, iField } from '../../../../../../Shared/Types/interfaces';
import { STATE, WORKPIECETYPE } from '../../../../../../Shared/constants';
import { tValue } from '../../../../Shared/InputNumber';
import { checkDuplicate, getTotalSum, validation } from '../../../../Helpers';
import { useKeyArrow } from '../../../Orders/GetOrder/Components/Shared/Hooks/useKeyArrow';
import { useQuery } from '@tanstack/react-query';
import { getFraction, getMaterialGroup } from '../../../../../Store/Lists/api';
import { Moment } from 'moment';
import moment from 'moment';

export interface iState {
    fractionId: iField;
    materialGroupId: iField;
    widthInDocument: iField;
    widthIn: iField;
    moneyIn: iField;
    duplicate: boolean;
}

export const useProps = () => {
    const [primeData, setPrimeData] = useState<iPrimeData>(initPrimeData());
    const [date, setDate] = useState<Moment | undefined | null>(moment());
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<iState[]>([]);
    const tuched = useRef(false);
    const { OperationStore, loginStore } = useStores();
    const { onKeyDown, onFocus, refHandler } = useKeyArrow();

    useEffect(() => {
        OperationStore.getMaxLot();
    }, []);

    const addRowHandler = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        setData((prev) => {
            const newRow = initData();
            return [...prev, newRow];
        });
    };

    const removeHandler = (index: number) => {
        setData((prev) => prev.filter((_, i) => i != index));
    };

    const setItemValue = (item: iItem, value: any) => {
        item.value = value;
        item.isError = value ? false : true;
    };

    const onChange = (index: number, v: string | number, fieldName: keyof iState) => {
        setData((prev) => {
            const field = prev[index][fieldName] as iField;
            field.value = v;
            return [...prev];
        });
    };

    const setPrameValue = <T extends keyof iPrimeData>(key: T, value: tValue) => {
        setPrimeData((prev) => {
            setItemValue(prev[key], value);
            return { ...prev };
        });
    };

    const subbmitHandler = async () => {
        tuched.current = true;
        const isError = validation(setData);
        const errorNote = () => {
            notification.error({
                message: 'Ошибка!',
                description: 'Не верно заполнены поля!',
            });
        };
        if (!date) {
            errorNote();
            throw { error: 'error date' };
        }
        if (!data.length) {
            errorNote();
            throw { error: 'error count row' };
        }
        if (isError) {
            errorNote();
            throw { error: 'validation error' };
        }

        const totalSum = getTotalSum(data);
        if (!totalSum) {
            errorNote();
            throw { error: 'error total sym' };
        }
        setIsLoading(true);
        const preparedData: iData[] = data.map((item) => {
            item.widthInDocument.value;
            const res: iData = {
                date,
                lot: +primeData.lot.value,
                numDocument: `${primeData.numDocument.value}`,
                operationId: 1,
                workpieceTypeId: WORKPIECETYPE.stone.id,
                userId: loginStore.user.id,
                storeId: loginStore.user.storeId,
                stateId: STATE.stone.id,
                widthInDocument: +item.widthInDocument.value,
                widthIn: +item.widthIn.value,
                moneyIn: +item.moneyIn.value,
                materialGroupId: +item.materialGroupId.value,
                fractionId: +item.fractionId.value,
            };
            return res;
        });

        await OperationStore.postNewItems(preparedData, () => {
            setPrimeData(initPrimeData());
            setData([]);
            notification.success({
                message: 'Успешно',
                description: 'Приход сохранен успешно',
            });
        });
        setIsLoading(false);
    };

    const copyRow = (index: number) => {
        setData((prev) => {
            const elem: iState = JSON.parse(JSON.stringify(prev[index]));
            elem.widthIn.value = '';
            prev.splice(index + 1, 0, elem);
            return [...prev];
        });
    };

    const storeId = loginStore.user.storeId;
    const fraction = useQuery(['fraction', storeId], getFraction, { enabled: !!storeId });
    const materialGroup = useQuery(
        ['getMaterialGroup', storeId],
        () => getMaterialGroup(),
        {
            enabled: !!storeId,
        },
    );

    const stateDuplicate: iState[] = checkDuplicate(data);

    const maxLot = OperationStore.maxLot;

    return {
        maxLot,
        primeData,
        setPrameValue,
        date,
        setDate,
        subbmitHandler,
        isLoading,
        addRowHandler,
        stateDuplicate,
        copyRow,
        removeHandler,
        onChange,
        fraction,
        materialGroup,
        refHandler,
        onKeyDown,
        onFocus,
    };
};
