import { InputField } from '../../../../../../../../Shared/InputField';
import { SelectField } from '../../../../../../../../Shared/SelectField';
import { InputNumber } from '../../../../../../../../Shared/InputNumber';
import { useStores } from '../../../../../../../../../Store/useStores';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { iState } from '../..';
import { observer } from 'mobx-react-lite';
import {
    iData,
    iLength,
    iSizeRange,
} from '../../../../../../../../../../Shared/Types/interfaces';
import { Row } from '../../../../Shared/Row';

export interface iLists {
    length: iLength[];
}
export const RowWrapper = observer(
    ({
        isLoading,
        index,
        removeRow,
        state,
        setState,
        record,
    }: {
        isLoading?: boolean;
        index: number;
        removeRow: (i: number) => void;
        state: iState;
        setState: Dispatch<SetStateAction<iState[]>>;
        record: iData;
    }) => {
        const { ListsStore, loginStore } = useStores();
        const [lists, setLists] = useState<iLists | undefined>(undefined);
        const [isLoadinglength, setIsLoadinglength] = useState<boolean>(false);

        const workpieceTypeId = record.workpieceTypeId;
        const sizeRangeId = record.sizeRangeId;

        const onChange = (v: string | number, index: number, fieldName: keyof iState) => {
            setState((prev) => {
                prev[index][fieldName].value = v;
                return [...prev];
            });
        };

        const storeId = loginStore.user.storeId;

        useEffect(() => {
            if (!storeId) return;
            if (!workpieceTypeId) return;

            const fetchList = async () => {
                setIsLoadinglength(true);
                onChange('', index, 'length');
                const length = await ListsStore.getLength({
                    storeId: storeId,
                    workpieceTypeId: +workpieceTypeId,
                    sizeRangeId: record.sizeRangeId,
                });

                setLists((prev) => {
                    if (prev) {
                        prev.length = length;
                        return prev;
                    }
                    return { length } as iLists;
                });

                setIsLoadinglength(false);
            };
            fetchList();
        }, [storeId, workpieceTypeId, sizeRangeId]);

        return (
            <Row
                key={index}
                isLoading={isLoading}
                removeRow={() => removeRow(index)}
                fields={[
                    <InputField key="length" isError={state.length.isError}>
                        <SelectField
                            placeholder={state.length.placeholder}
                            value={+state.length.value || undefined}
                            onChange={(v) => onChange(v, index, 'length')}
                            options={lists?.length?.map((item) => ({
                                value: item.id,
                                caption: item.length,
                            }))}
                            selectProps={{
                                disabled: isLoadinglength,
                                loading: isLoadinglength,
                            }}
                        />
                    </InputField>,
                    <InputField key="widthIn" isError={state.widthIn.isError}>
                        <InputNumber
                            placeholder={state.widthIn.placeholder}
                            onChangeHandler={(v) => {
                                onChange(v!, index, 'widthIn');
                            }}
                            value={state.widthIn.value || ''}
                        />
                    </InputField>,
                ]}
            />
        );
    },
);
