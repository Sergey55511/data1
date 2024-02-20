import { iData } from '../../../../../../../../../Shared/Types/interfaces';
import { InputField } from '../../../../../../../Shared/InputField';
import { InputNumber } from '../../../../../../../Shared/InputNumber';
import { Row } from '../../../../../../../Shared/Row';
import { SelectField } from '../../../../../../../Shared/SelectField';
import { iState, useProps } from '../useProps';
import { useData } from './useData';

export const RowWrapper = ({
    state,
    index,
    isLoading,
    onChange,
    removeRow,
    copyRow,
    keyArrowHandlers,
    record,
}: {
    state: iState;
    index: number;
    isLoading: boolean;
    onChange: ReturnType<typeof useProps>['onChange'];
    copyRow: (index: number) => void;
    removeRow: (index: number) => void;
    keyArrowHandlers: ReturnType<typeof useProps>['keyArrowHandlers'];
    record: iData;
}) => {
    const { sizeRange, workpieceType } = useData(record, state);
    return (
        <Row
            key={index}
            isLoading={isLoading}
            copyRow={() => copyRow(index)}
            fields={[
                <InputField key="workpieceType" isError={state.workpieceType.isError}>
                    <SelectField
                        placeholder={state.workpieceType.placeholder}
                        value={+state.workpieceType.value || undefined}
                        onChange={(v) => onChange(v, index, 'workpieceType')}
                        options={workpieceType.data?.map((item) => ({
                            value: item.id,
                            caption: item.workpieceType,
                        }))}
                    />
                </InputField>,
                <InputField key="sizeRange" isError={state.sizeRange.isError}>
                    <SelectField
                        placeholder={state.sizeRange.placeholder}
                        value={+state.sizeRange.value || undefined}
                        onChange={(v) => onChange(v, index, 'sizeRange')}
                        options={sizeRange.data?.map((item) => ({
                            value: item.id,
                            caption: item.sizeRange,
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
                        ref={(r) => keyArrowHandlers.refHandler(r, index)}
                        onKeyDown={keyArrowHandlers.onKeyDown}
                        onFocus={() => keyArrowHandlers.onFocus(index)}
                    />
                </InputField>,
            ]}
            removeRow={() => removeRow(index)}
            isDuplicate={state.duplicate}
        />
    );
};
