import { Badge, Button, Input, Modal, notification, Radio } from 'antd';
import { FilterValue } from 'antd/lib/table/interface';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { iData } from '../../../../../Shared/Types/interfaces';
import { useStores } from '../../../../Store/useStores';
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

export const MoveOut = observer(({ title }: { title: string }) => {
    const [isRecipientLoading, setIsRecipientLoading] = useState(false);
    const [data, setData] = useState<iDataIndex[]>([]);
    const [filters, setFilters] = useState<Record<string, FilterValue | null>>({});
    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const [buttonState, setButtonState] = useState<'lefovers' | 'prepare'>('lefovers');
    const { ListsStore, loginStore } = useStores();
    const { leftovers } = ListsStore;

    useEffect(() => {
        const data: iDataIndex[] = leftovers.map((item, index) => {
            return { ...item, index };
        });
        setData(data);
    }, [leftovers]);

    useEffect(() => {
        if (loginStore.user.storeId) ListsStore.getLeftovers(loginStore.user.storeId);
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

    return (
        <Wrapper>
            <div className="header">
                <Title text={title} />
                <div className="recipientWrapper">
                    <InputField isError={false}>
                        <SelectField
                            placeholder="получатель"
                            // value={1}
                            onChange={(v) => console.log(v)}
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
                {buttonState == 'prepare' && <Button type="primary">Провести</Button>}
            </div>
            <div>
                {buttonState == 'lefovers' && (
                    <TableLeftOvers
                        {...{
                            filters,
                            setFilters,
                            leftovers: leftoversData,
                            selectRow: (i: number) =>
                                setSelectedRows((prev) => [...prev, i]),
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
});
