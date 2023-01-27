import { useEffect, useState } from 'react';
import { iData } from '../../../../../Shared/Types/interfaces';
import { FilterValue } from 'antd/lib/table/interface';
import { useStores } from '../../../../Store/useStores';
import { OPERATIONS, STATE } from '../../../../../Shared/constants';
import { myModal } from '../../../Shared/MyModal';
import { ModalContent } from './AddRecipient';
import { notification } from 'antd';
import { prepareDataTable } from '../../../Helpers';

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
        | 'mixingLot'
        | 'mixingProduction';
}

export const useProps = ({ type }: iProps) => {
    const [isRecipientLoading, setIsRecipientLoading] = useState(false);
    const [numDocument, setNumDocument] = useState('');
    const [isSubmitLoading, setIsSubmitLoading] = useState(false);
    const [recipient, setRecipient] = useState<number | undefined>(undefined);
    const [data, setData] = useState<iDataIndex[]>([]);
    const [filters, setFilters] = useState<Record<string, FilterValue | null>>({});
    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const [buttonState, setButtonState] = useState<'lefovers' | 'prepare'>('lefovers');
    const { ListsStore, loginStore, OperationStore } = useStores();
    const { leftovers } = OperationStore;

    const isMixing = [
        'mixingGrade',
        'mixingSize',
        'mixingLot',
        'mixingProduction',
    ].includes(type || '');

    useEffect(() => {
        let data: iDataIndex[] = leftovers;
        if (type == 'mixingGrade') {
            data = leftovers.filter((item) => item.stateId == STATE.sliced.id);
        }
        if (type == 'mixingSize') {
            data = leftovers.filter((item) =>
                [STATE.polished.id, STATE.glued.id].includes(item.stateId ?? 0),
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

    const isDisabled = (() => {
        let res = false;
        if (!isMixing) {
            if (!recipient) res = true;
            if (!numDocument) res = true;
        }
        if (!moveOutData.length) res = true;
        if (!moveOutData.find((item) => item.widthOut || item.countItemsOut)) res = true;
        if (
            moveOutData.find(
                (item) =>
                    (item.width || 0) - (item.widthOut || 0) < 0 ||
                    (item.count || 0) - (item.countItemsOut || 0) < 0,
            )
        )
            res = true;

        return res;
    })();

    const submitData = async () => {
        const dataSend = data.filter((item) => {
            return item.widthOut || item.countItemsOut;
        });

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
            const getNum = (v: any) => (v ? +v : 0);
            return (getNum(data.code) / getNum(data.width)) * getNum(data.widthOut);
        };

        const dataSendPrepared = dataSend.map((item) => {
            if (item.widthOut) item.widthOut = +item.widthOut;
            if (item.countItemsOut) item.countItemsOut = +item.countItemsOut;
            item.numDocument = nDocUniq;
            item.recipientId = recipient;
            item.operationId = operationId;
            item.userId = loginStore.user.id;
            item.storeId = loginStore.user.storeId;
            item.moneyOut = getMoney(item);
            return prepareDataTable(item);
        });
        setIsSubmitLoading(true);

        const noteMixingSuccess = () =>
            notification.success({ message: 'Смешивание прошла успешно' });

        if (type == 'mixingProduction')
            await OperationStore.mixingProduction(dataSendPrepared, noteMixingSuccess);
        if (type == 'mixingLot')
            await OperationStore.mixingLot(dataSendPrepared, noteMixingSuccess);
        if (type == 'mixingGrade')
            await OperationStore.mixingGrade(dataSendPrepared, noteMixingSuccess);

        if (type == 'mixingSize')
            await OperationStore.mixingSize(dataSendPrepared, noteMixingSuccess);

        if (!isMixing) {
            await OperationStore.moveToWork(
                dataSendPrepared,
                () => {
                    notification.success({ message: 'Отгрузка прошла успешно' });
                },
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

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: iData[]) => {
            setSelectedRows(selectedRowKeys.map((item) => +item));
        },
        selectedRowKeys: selectedRows,
    };

    return {
        rowSelection,
        isMixing,
        recipient,
        recipientList: ListsStore.recipient,
        isRecipientLoading,
        setRecipient,
        addRecipient,
        numDocument,
        setNumDocument,
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
    };
};
