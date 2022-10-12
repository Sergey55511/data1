import { Badge, Button, Radio } from 'antd';
import { FilterValue } from 'antd/lib/table/interface';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { iData } from '../../../../../Shared/Types/interfaces';
import { useStores } from '../../../../Store/useStores';
import { InputField } from '../../../Shared/InputField';
import { SelectField } from '../../../Shared/SelectField';
import { Title } from '../../../Shared/Title';
import { Wrapper } from './style';
import { TableLeftOvers } from './TableLeftovers';
import { TableMoveOut } from './TableMoveOut';

export interface iDataIndex extends iData {
    index?: number;
}

export const MoveOut = observer(({ title }: { title: string }) => {
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
                            options={[]}
                            // options={ListsStore.workpieceType.map((item) => ({
                            //     value: item.id,
                            //     caption: item.workpieceType,
                            // }))}
                        />
                    </InputField>
                </div>
                <a href="#" onClick={(e) => e.preventDefault()}>
                    Добавить получателя
                </a>
            </div>
            <div className="buttonGroup">
                <Radio.Group
                    value={buttonState}
                    onChange={(e) => setButtonState(e.target.value)}
                >
                    <Radio.Button value="lefovers">Остаток</Radio.Button>
                    <Badge count={selectedRows.length}>
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
