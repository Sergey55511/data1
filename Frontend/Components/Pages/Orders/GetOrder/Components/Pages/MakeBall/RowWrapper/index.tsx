import { iGrade, iSizeRange } from '../../../../../../../../../Shared/Types/interfaces';
import { InputField } from '../../../../../../../Shared/InputField';
import { InputNumber } from '../../../../../../../Shared/InputNumber';
import { Row } from '../../../../../../../Shared/Row';
import { SelectField } from '../../../../../../../Shared/SelectField';
import { useKeyArrow } from '../../../Shared/Hooks/useKeyArrow';
import { iState } from '../useProps';

export const RowWrapper = ({
    state,
    index,
    isLoading,
    onChange,
    sizeRange,
    grades,
    removeRow,
    copyRow,
}: {
    state: iState;
    index: number;
    isLoading: boolean;
    onChange: (v: string | number, index: number, fieldName: keyof iState) => void;
    copyRow: (index: number) => void;
    sizeRange: iSizeRange[];
    grades: iGrade[];
    removeRow: (index: number) => void;
}) => {
    const { onKeyDown, onFocus, refHandler } = useKeyArrow();
    return (
        <Row
            key={index}
            isLoading={isLoading}
            copyRow={() => copyRow(index)}
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
                        ref={(r) => refHandler(r, index)}
                        onKeyDown={onKeyDown}
                        onFocus={() => onFocus(index)}
                    />
                </InputField>,
            ]}
            removeRow={() => removeRow(index)}
        />
    );
};
