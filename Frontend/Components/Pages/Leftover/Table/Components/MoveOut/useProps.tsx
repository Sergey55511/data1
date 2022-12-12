import moment from 'moment';
import { SetStateAction, useEffect, useRef, useState } from 'react';
import { iData } from '../../../../../../../Shared/Types/interfaces';
import { useStores } from '../../../../../../Store/useStores';
import { prepareDataTable } from '../../../../../Helpers';
import { contentDrawer } from '../../../../../Shared/contentDrawer';
import { KEYSLEFTOVERS } from '../../../../../Shared/Table/constants';
import { NumProduction } from '../NumProduction';

export type tConstKeys = keyof typeof KEYSLEFTOVERS;
type tValue = number | string | undefined;

export const useProps = (record: iData, onClose?: () => void) => {
    const { OperationStore, loginStore, UIStore, ListsStore } = useStores();
    const [isShowSetTask, setIsShowSetTask] = useState(false);
    const [numProd, setNumProd] = useState(0);
    const isNewProductionId = useRef(false);
    const [operation, setOperation] = useState<number | undefined>(undefined);
    const [managerId, setManagerId] = useState<number | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const [width, setWidth] = useState<tValue>(undefined);
    const [count, setCount] = useState<tValue>(undefined);
    const [date, setDate] = useState<moment.Moment | null>(moment());
    const subbmitButton = useRef<HTMLElement>(null);

    useEffect(() => {
        setManagerId(undefined);
        ListsStore.resetManagers();
        if (loginStore.user.storeId) {
            ListsStore.getOperations(loginStore.user.storeId, record.stateId!);
            if (operation)
                ListsStore.getManagers({
                    storeId: loginStore.user.storeId,
                    operationId: operation,
                    active: true,
                });
        }
    }, [loginStore.user.storeId, operation]);

    const onPressEnterHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key != 'Enter') return;
        if (subbmitButton.current) subbmitButton.current.click();
    };

    const keys = Object.keys(record);
    const setNumProduction = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        contentDrawer({
            title: 'Производства',
            content: (
                <NumProduction
                    setValue={(v: number) => {
                        isNewProductionId.current = true;
                        setNumProd(v);
                    }}
                />
            ),
        });
    };

    const setTask = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        setIsShowSetTask(true);
    };

    const getValue = (v: string) => (isNaN(+v) ? undefined : +v);
    const setValue = (v: tValue, set: (value: SetStateAction<tValue>) => void) => {
        set((prev) => {
            if (!v) return undefined;
            v = `${v}`.replace(',', '.');
            const regexp = /^\d+[.|,]\d+$|^\d+[.|,]$|^\d+$/;

            if (regexp.test(v as string)) return v;

            if (getValue(v as string) == undefined) return prev ? prev : '';
            return v;
        });
    };

    const isValid = (() => {
        const test = (v: tValue) => /^\d+[.|,]$/.test(v as string);
        const isMinus = (recordValue: number, stateValue: tValue) => {
            if (stateValue) if ((recordValue ?? 0) - +stateValue < 0) return true;
        };

        if (test(width)) return false;
        if (test(count)) return false;
        if (isMinus(record.width!, width)) return false;
        if (count) if ((record.count ?? 0 - +count) < 0) return false;
        return operation && date && managerId && (width || count) ? true : false;
    })();

    const subbmitHandler = async () => {
        setIsLoading(true);
        const data = prepareDataTable(record);
        data.userId = loginStore.user.id;
        data.storeId = loginStore.user.storeId;
        data.managerId = managerId;
        data.date = date;
        data.countItemsOut = count ? +count : undefined;
        data.widthOut = width ? +width : undefined;
        data.operationId = operation;
        data.productionId = numProd || +record.productionId! || undefined;

        const code = record.code || 0;
        const moneyOut = (code / (record.width || code)) * (data.widthOut || 0);

        data.moneyOut = moneyOut;

        if (isNewProductionId.current)
            await OperationStore.changeNumProduction({
                ...data,
            });

        await OperationStore.moveToWork([data]);
        if (loginStore.user.storeId)
            await OperationStore.getOrders(loginStore.user.storeId!);

        setIsLoading(false);

        UIStore.setIsLoading(true);
        if (onClose) onClose();
        await OperationStore.getLeftovers(loginStore.user.storeId);
        UIStore.setIsLoading(false);
    };
    return {
        isShowSetTask,
        setIsShowSetTask,
        date,
        setDate,
        onPressEnterHandler,
        operation,
        setOperation,
        managerId,
        setManagerId,
        width,
        setWidth,
        setValue,
        count,
        setCount,
        setNumProduction,
        numProd,
        setTask,
        isValid,
        subbmitHandler,
        isLoading,
        subbmitButton,
        keys,
        operations: ListsStore.operations,
        managers: ListsStore.managers,
    };
};
