import { InputField } from '../../../../../../../../Shared/InputField';
import { SelectField } from '../../../../../../../../Shared/SelectField';
import { InputNumber } from '../../../../../../../../Shared/InputNumber';
import { useStores } from '../../../../../../../../../Store/useStores';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { iState } from '../..';
import { observer } from 'mobx-react-lite';
import {
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
        sizeRange,
        workpieceTypeId,
    }: {
        isLoading?: boolean;
        index: number;
        removeRow: (i: number) => void;
        state: iState;
        setState: Dispatch<SetStateAction<iState[]>>;
        sizeRange: iSizeRange[];
        workpieceTypeId?: number;
    }) => {
        const { ListsStore, loginStore } = useStores();
        const [lists, setLists] = useState<iLists | undefined>(undefined);
        const [isLoadinglength, setIsLoadinglength] = useState<boolean>(false);
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
                    sizeRangeId: state.sizeRange?.value as number,
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
        }, [storeId, workpieceTypeId, state.sizeRange?.value]);

        return (
            <Row
                key={index}
                isLoading={isLoading}
                removeRow={() => removeRow(index)}
                fields={[
                    <InputField key="sizeRange" isError={state.sizeRange.isError}>
                        <SelectField
                            placeholder={state.sizeRange.placeholder}
                            value={+state.sizeRange.value || undefined}
                            onChange={(v) => onChange(v, index, 'sizeRange')}
                            options={sizeRange?.map((item) => ({
                                value: item.id,
                                caption: item.sizeRange,
                            }))}
                        />
                    </InputField>,
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
