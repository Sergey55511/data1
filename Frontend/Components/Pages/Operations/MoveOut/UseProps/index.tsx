import { ChangeEvent, useEffect, useState } from 'react';
import { iData } from '../../../../../../Shared/Types/interfaces';
import { FilterValue } from 'antd/lib/table/interface';
import { useStores } from '../../../../../Store/useStores';
import { GRADE, OPERATIONS, STATE } from '../../../../../../Shared/constants';
import { myModal } from '../../../../Shared/MyModal';
import { ModalContent } from '../AddRecipient';
import { message, notification } from 'antd';
import { prepareDataTable } from '../../../../Helpers';
import { dataInventoryPrepare } from './dataInventoryPrepare';
import moment from 'moment';

export interface iDataIndex extends iData {
    index?: number;
}
export interface iProps {
    title: string;
    type?:
        | 'moveOut'
        | 'shareItems'
        | 'mixingGrade'
        | 'mixingSize'
        | 'mixingState'
        | 'mixingLot'
        | 'mixingProduction'
        | 'inventory';
}

export const useProps = ({ type }: iProps) => {
    const [isRecipientLoading, setIsRecipientLoading] = useState(false);
    const [numDocument, setNumDocument] = useState('');
    const [date, setDate] = useState<moment.Moment | null>(null);
    const [isSubmitLoading, setIsSubmitLoading] = useState(false);
    const [recipient, setRecipient] = useState<number | undefined>(undefined);
    const [data, setData] = useState<iDataIndex[]>([]);
    const [filters, setFilters] = useState<Record<string, FilterValue | null>>({});
    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const [buttonState, setButtonState] = useState<'lefovers' | 'prepare'>('lefovers');
    const { ListsStore, loginStore, OperationStore } = useStores();
    const { leftovers } = OperationStore;

    const mixingTypes: iProps['type'][] = [
        'mixingGrade',
        'mixingSize',
        'mixingState',
        'mixingLot',
        'mixingProduction',
    ];
    const isMixing = mixingTypes.includes(type);

    const getNum = (v: any) => (v ? +v : 0);

    const isInventory = type == 'inventory';

    useEffect(() => {
        let data: iDataIndex[] = leftovers;
        if (type == 'mixingGrade') {
            data = leftovers.filter((item) => {
                if (item.gradeId != GRADE.mix.id) {
                    if (item.stateId == STATE.sliced.id) return true;
                    if (item.stateId == STATE.balled.id) return true;
                }
                return false;
            });
        }
        if (type == 'mixingSize') {
            data = leftovers.filter((item) =>
                [STATE.polished.id, STATE.gluedBlank.id].includes(item.stateId ?? 0),
            );
        }
        if (type == 'mixingState') {
            data = leftovers.filter((item) =>
                [STATE.polished.id, STATE.gluedBlank.id].includes(item.stateId ?? 0),
            );
        }
        if (type == 'mixingLot') {
            data = leftovers.filter((item) => item.lot);
        }
        if (type == 'mixingProduction') {
            data = leftovers.filter((item) => item.productionId);
        }
        data = data.map((item, index) => {
            return { ...item, index };
        });
        setData(data);
    }, [leftovers]);

    useEffect(() => {
        if (loginStore.user.storeId) {
            OperationStore.getLeftovers(loginStore.user.storeId);
            ListsStore.getRecipient(
                type == 'shareItems' ? loginStore.user.storeId : undefined,
            );
        }
    }, [loginStore.user.storeId]);

    useEffect(() => {
        if (!date) {
            setDate(moment());
        }
    }, []);

    const onChange = (
        record: iDataIndex,
        key: keyof iDataIndex,
        value: iDataIndex[keyof iDataIndex],
    ) => {
        setData((prev) => {
            prev[record.index!][key] = value;
            return [...prev];
        });
    };

    const moveOutData: iDataIndex[] = data?.filter((_, index) =>
        selectedRows.includes(index),
    );

    const addRecipient = () => {
        myModal({
            children: (
                <ModalContent
                    submit={async (v: string) => {
                        setIsRecipientLoading(true);
                        await ListsStore.postRecipient([{ recipient: v }]);
                        setIsRecipientLoading(false);
                        notification.success({ message: 'Получатель добавлен' });
                    }}
                />
            ),
        });
    };

    const dataSend = moveOutData.filter((item) => {
        return item.widthOut || item.countItemsOut;
    });

    const isDisabled = (() => {
        let res = false;
        if (!(isMixing || isInventory)) {
            if (!recipient) res = true;
            if (!numDocument) res = true;
        }
        if (!moveOutData.length) res = true;
        if (!moveOutData.find((item) => item.widthOut || item.countItemsOut)) res = true;
        if (!isInventory)
            if (
                moveOutData.find(
                    (item) =>
                        (item.width || 0) - (item.widthOut || 0) < 0 ||
                        (item.count || 0) - (item.countItemsOut || 0) < 0,
                )
            )
                res = true;

        if (
            dataSend.some((item) => {
                if (getNum(item.count)) {
                    if (!getNum(item.countItemsOut)) return true;
                }
            })
        )
            res = true;

        return res;
    })();

    const submitData = async () => {
        let nDocUniq = `${numDocument}_(${Date.now()})`;

        let operationId = OPERATIONS.sale.id;

        switch (type) {
            case 'shareItems':
                operationId = OPERATIONS.shareItems.id;
                break;
            case 'mixingGrade':
                operationId = OPERATIONS.mixingGrade.id;
                nDocUniq = '';
                break;
            case 'mixingSize':
                operationId = OPERATIONS.mixingSize.id;
                nDocUniq = '';
                break;
            case 'mixingState':
                operationId = OPERATIONS.mixingState.id;
                nDocUniq = '';
                break;
            case 'mixingLot':
                operationId = OPERATIONS.mixingLot.id;
                nDocUniq = '';
                break;
            case 'mixingProduction':
                operationId = OPERATIONS.mixingProduction.id;
                nDocUniq = '';
                break;
        }

        const getMoney = (data: iData) => {
            return (getNum(data.code) / getNum(data.width)) * getNum(data.widthOut);
        };

        if (!date) {
            notification.error({ message: 'Не введена дата операции' });
            return;
        }

        const dataSendPrepared = dataSend.map((item) => {
            if (item.widthOut) item.widthOut = +item.widthOut;
            if (item.countItemsOut) item.countItemsOut = +item.countItemsOut;
            item.numDocument = nDocUniq;
            item.recipientId = recipient;
            item.operationId = operationId;
            item.userId = loginStore.user.id;
            item.storeId = loginStore.user.storeId;
            item.moneyOut = getMoney(item);
            item.date = date;
            return prepareDataTable(item);
        });
        setIsSubmitLoading(true);

        const noteSuccess = (message: string) => {
            notification.success({ message });
        };

        if (type == 'mixingProduction')
            await OperationStore.mixingProduction(dataSendPrepared, () =>
                noteSuccess('Смешивание прошла успешно'),
            );
        if (type == 'mixingLot')
            await OperationStore.mixingLot(dataSendPrepared, () =>
                noteSuccess('Смешивание прошла успешно'),
            );
        if (type == 'mixingGrade')
            await OperationStore.mixingGrade(dataSendPrepared, () =>
                noteSuccess('Смешивание прошла успешно'),
            );

        if (type == 'mixingSize')
            await OperationStore.mixingSize(dataSendPrepared, () =>
                noteSuccess('Смешивание прошла успешно'),
            );
        if (type == 'mixingState')
            await OperationStore.mixingState(dataSendPrepared, () =>
                noteSuccess('Смешивание прошла успешно'),
            );
        if (type == 'inventory')
            await OperationStore.inventory(
                dataInventoryPrepare(dataSend, loginStore.user),
                () => noteSuccess('Инвентаризация прошла успешно'),
            );

        if (!(isMixing || isInventory)) {
            await OperationStore.moveToWork(
                dataSendPrepared,
                () => noteSuccess('Отгрузка прошла успешно'),
                false,
            );
        }

        await OperationStore.getLeftovers(loginStore.user.storeId);
        setIsSubmitLoading(false);
        setRecipient(undefined);
        setSelectedRows([]);
        setNumDocument('');
        setButtonState('lefovers');
    };

    const selectRow = (i: number) => {
        if (selectedRows.length) {
            setSelectedRows([...selectedRows, i]);
        } else {
            setSelectedRows([i]);
        }
    };

    const setNumDocumentHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.split('/').length > 1) {
            message.error('Не допустим ввод символа /');
            return;
        }
        setNumDocument(e.target.value);
    };

    return {
        isMixing,
        recipient,
        recipientList: ListsStore.recipient,
        isRecipientLoading,
        setRecipient,
        addRecipient,
        numDocument,
        setNumDocumentHandler,
        buttonState,
        setButtonState,
        selectedRows,
        isDisabled,
        submitData,
        isSubmitLoading,
        filters,
        setFilters,
        selectRow,
        moveOutData,
        onChange,
        setSelectedRows,
        data,
        isInventory,
        date,
        setDate,
    };
};
