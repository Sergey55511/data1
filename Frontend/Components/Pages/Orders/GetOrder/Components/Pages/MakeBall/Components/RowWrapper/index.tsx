import { useEffect, useState } from 'react';
import { iState } from '../..';
import { OPERATIONS } from '../../../../../../../../../../Shared/constants';
import {
    iGrade,
    iLength,
    iSizeRange,
} from '../../../../../../../../../../Shared/Types/interfaces';
import { useStores } from '../../../../../../../../../Store/useStores';
import { InputField } from '../../../../../../../../Shared/InputField';
import { InputNumber } from '../../../../../../../../Shared/InputNumber';
import { SelectField } from '../../../../../../../../Shared/SelectField';
import { Row } from '../../../../Shared/Row';

export const RowWrapper = ({
    state,
    index,
    isLoading,
    onChange,
    sizeRange,
    storeId,
    grades,
    removeRow,
}: {
    state: iState;
    index: number;
    isLoading: boolean;
    onChange: (v: string | number, index: number, fieldName: keyof iState) => void;
    sizeRange: iSizeRange[];
    storeId?: number;
    grades: iGrade[];
    removeRow: (index: number) => void;
}) => {
    const { ListsStore } = useStores();
    const [length, setLength] = useState<iLength[]>([]);

    useEffect(() => {
        const getSizeRange = async () => {
            if (storeId && state.sizeRange.value) {
                const length = await ListsStore.getLength({
                    storeId,
                    operationId: OPERATIONS.makeBall.id,
                    sizeRangeId: +state.sizeRange.value,
                });

                setLength(length);
            }
        };
        getSizeRange();
    }, [storeId, state.sizeRange.value]);

    return (
        <Row
            key={index}
            isLoading={isLoading}
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
                        options={length?.map((item) => ({
                            value: item.id,
                            caption: item.length,
                        }))}
                    />
                </InputField>,
                <InputField key="grade" isError={state.grade.isError}>
                    <SelectField
                        placeholder={state.grade.placeholder}
                        value={+state.grade.value || undefined}
                        onChange={(v) => onChange(v, index, 'grade')}
                        options={grades?.map((item) => ({
                            value: item.id,
                            caption: item.grade,
                        }))}
                    />
                </InputField>,
                <InputField key="key" isError={state.widthIn.isError}>
                    <InputNumber
                        placeholder={state.widthIn.placeholder}
                        onChangeHandler={(v) => {
                            onChange(v!, index, 'widthIn');
                        }}
                        value={state.widthIn.value || ''}
                    />
                </InputField>,
            ]}
            removeRow={() => removeRow(index)}
        />
    );
};
