import { Badge, Button, Input, notification, Radio } from 'antd';
import { FilterValue } from 'antd/lib/table/interface';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { OPERATIONS, STATE } from '../../../../../Shared/constants';
import { iData } from '../../../../../Shared/Types/interfaces';
import { useStores } from '../../../../Store/useStores';
import { prepareDataTable } from '../../../Helpers';
import { InputField } from '../../../Shared/InputField';
import { myModal } from '../../../Shared/MyModal';
import { SelectField } from '../../../Shared/SelectField';
import { Title } from '../../../Shared/Title';
import { ModalContent } from './AddRecipient';
import { Wrapper } from './style';
import { TableLeftOvers } from './TableLeftovers';
import { TableMoveOut } from './TableMoveOut';

export interface iDataIndex extends iData {
    index?: number;
}

export const MoveOut = observer(
    ({
        title,
        type,
    }: {
        title: string;
        type?: 'moveOut' | 'shareItems' | 'mixingGrade' | 'mixingSize';
    }) => {
        const [isRecipientLoading, setIsRecipientLoading] = useState(false);
        const [numDocument, setNumDocument] = useState('');
        const [isSubmitLoading, setIsSubmitLoading] = useState(false);
        const [recipient, setRecipient] = useState<number | undefined>(undefined);
        const [data, setData] = useState<iDataIndex[]>([]);
        const [filters, setFilters] = useState<Record<string, FilterValue | null>>({});
        const [selectedRows, setSelectedRows] = useState<number[]>([]);
        const [buttonState, setButtonState] = useState<'lefovers' | 'prepare'>(
            'lefovers',
        );
        const { ListsStore, loginStore, OperationStore } = useStores();
        const { leftovers } = OperationStore;

        const isMixing = ['mixingGrade', 'mixingSize'].includes(type || '');

        useEffect(() => {
            let data: iDataIndex[] = leftovers;
            if (type == 'mixingGrade') {
                data = leftovers.filter((item) => item.stateId == STATE.sliced.id);
            }
            if (type == 'mixingSize') {
                data = leftovers.filter((item) => item.stateId == STATE.polished.id);
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

        const leftoversData: iDataIndex[] = data?.filter(
            (_, index) => !selectedRows.includes(index),
        );
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
            if (!moveOutData.find((item) => item.widthOut || item.countItemsOut))
                res = true;
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
            }

            const dataSendPrepared = dataSend.map((item) => {
                if (item.widthOut) item.widthOut = +item.widthOut;
                if (item.countItemsOut) item.countItemsOut = +item.countItemsOut;
                item.numDocument = nDocUniq;
                item.recipientId = recipient;
                item.operationId = operationId;
                item.userId = loginStore.user.id;
                item.storeId = loginStore.user.storeId;
                return prepareDataTable(item);
            });
            setIsSubmitLoading(true);
            if (isMixing) {
                await OperationStore.mixing(dataSendPrepared, () => {
                    notification.success({ message: 'Смешивание прошла успешно' });
                });
            } else {
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

        return (
            <Wrapper>
                <div className="header">
                    <Title text={title} />
                    {!isMixing && (
                        <div className="recipientWrapper">
                            <InputField isError={false}>
                                <SelectField
                                    placeholder="получатель"
                                    value={recipient}
                                    onChange={(v) => setRecipient(v)}
                                    selectProps={{
                                        loading: isRecipientLoading,
                                        disabled: isRecipientLoading,
                                    }}
                                    options={ListsStore.recipient.map((item) => ({
                                        value: item.id,
                                        caption: item.recipient,
                                    }))}
                                />
                            </InputField>
                        </div>
                    )}
                    {type == 'moveOut' && (
                        <div className="addRecipient">
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    addRecipient();
                                }}
                            >
                                Добавить получателя
                            </a>
                        </div>
                    )}
                    {!isMixing && (
                        <div className="numShipment">
                            <Input
                                value={numDocument}
                                onChange={(e) => setNumDocument(e.target.value)}
                                placeholder="Номер документа"
                            />
                        </div>
                    )}
                </div>
                <div className="buttonGroup">
                    <Radio.Group
                        value={buttonState}
                        onChange={(e) => setButtonState(e.target.value)}
                    >
                        <Radio.Button value="lefovers">Остаток</Radio.Button>
                        <Badge count={selectedRows.length} size="small">
                            <Radio.Button value="prepare">Подготовка</Radio.Button>
                        </Badge>
                    </Radio.Group>
                    {buttonState == 'prepare' && (
                        <Button
                            disabled={isDisabled}
                            type="primary"
                            onClick={submitData}
                            loading={isSubmitLoading}
                        >
                            Провести
                        </Button>
                    )}
                </div>
                <div>
                    {buttonState == 'lefovers' && (
                        <TableLeftOvers
                            {...{
                                filters,
                                setFilters,
                                leftovers: leftoversData,
                                selectRow,
                            }}
                        />
                    )}
                    {buttonState == 'prepare' && (
                        <TableMoveOut
                            {...{
                                filters,
                                setFilters,
                                leftovers: moveOutData,
                                onChange,
                                removeRow: (i: number) =>
                                    setSelectedRows((prev) => {
                                        const res = prev.filter((item) => item != i);
                                        return [...res];
                                    }),
                            }}
                        />
                    )}
                </div>
            </Wrapper>
        );
    },
);
