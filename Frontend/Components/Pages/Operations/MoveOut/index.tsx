import { Button, Radio } from 'antd';
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

export interface iDataIndex extends iData {
    index?: number;
}

export const MoveOut = observer(({ title }: { title: string }) => {
    const [filters, setFilters] = useState<Record<string, FilterValue | null>>({});
    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const [buttonState, setButtonState] = useState<'lefovers' | 'prepare'>('lefovers');
    const { ListsStore, loginStore } = useStores();
    const { leftovers } = ListsStore;

    useEffect(() => {
        if (loginStore.user.storeId) ListsStore.getLeftovers(loginStore.user.storeId);
    }, [loginStore.user.storeId]);

    const leftoversData: iDataIndex[] = leftovers
        .map((item, index) => {
            return { ...item, index };
        })
        .filter((item, index) => !selectedRows.includes(index));

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
            </div>
            <div className="buttonGroup">
                <Radio.Group
                    value={buttonState}
                    onChange={(e) => setButtonState(e.target.value)}
                >
                    <Radio.Button value="lefovers">Остаток</Radio.Button>
                    <Radio.Button value="prepare">Подготовка</Radio.Button>
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
                {buttonState == 'prepare' && <div>prepare</div>}
            </div>
        </Wrapper>
    );
});
