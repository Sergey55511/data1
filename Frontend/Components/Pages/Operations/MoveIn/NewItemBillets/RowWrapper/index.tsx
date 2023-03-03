import { InputNumber } from '../../../../../Shared/InputNumber';
import { Row } from '../../../../../Shared/Row';
import { InputField } from '../../../../../Shared/InputField';
import { SelectField } from '../../../../../Shared/SelectField';
import { iState } from '../useProps';
import { useData } from './useData';
import { useKeyArrow } from '../../../../Orders/GetOrder/Components/Shared/Hooks/useKeyArrow';

interface iProps extends ReturnType<typeof useKeyArrow> {
    state: iState;
    index: number;
    onChange: (index: number, v: string | number, fieldName: keyof iState) => void;
    copyRow: (index: number) => void;
    removeRow: (index: number) => void;
}

export const RowWrapper = ({
    state,
    index,
    onChange,
    copyRow,
    removeRow,
    onKeyDown,
    onFocus,
    refHandler,
}: iProps) => {
    const data = useData({ index, stateRow: state, onChange });
    return (
        <Row
            key={index}
            copyRow={() => copyRow(index)}
            removeRow={() => removeRow(index)}
            isDuplicate={state.duplicate}
            fields={[
                <InputField key="workpieceTypeId" isError={state.workpieceTypeId.isError}>
                    <SelectField
                        placeholder={state.workpieceTypeId.placeholder}
                        value={+state.workpieceTypeId.value || undefined}
                        onChange={(v) => onChange(index, v, 'workpieceTypeId')}
                        options={data.workpieceType?.data?.map((item) => ({
                            value: item.id,
                            caption: item.workpieceType,
                        }))}
                        selectProps={{
                            disabled: data.workpieceType.isLoading,
                            loading: data.workpieceType.isFetching,
                        }}
                    />
                </InputField>,
                <InputField key="gradeId" isError={state.gradeId.isError}>
                    <SelectField
                        placeholder={state.gradeId.placeholder}
                        value={+state.gradeId.value || undefined}
                        onChange={(v) => onChange(index, v, 'gradeId')}
                        options={data.grade?.data?.map((item) => ({
                            value: item.id,
                            caption: item.grade,
                        }))}
                        selectProps={{
                            disabled: data.grade.isLoading,
                            loading: data.grade.isFetching,
                        }}
                    />
                </InputField>,
                <InputField key="stateId" isError={state.stateId.isError}>
                    <SelectField
                        placeholder={state.stateId.placeholder}
                        value={+state.stateId.value || undefined}
                        onChange={(v) => onChange(index, v, 'stateId')}
                        options={data.state?.data?.map((item) => ({
                            value: item.id,
                            caption: item.state,
                        }))}
                        selectProps={{
                            disabled: data.state.isLoading,
                            loading: data.state.isFetching,
                        }}
                    />
                </InputField>,
                <InputField key="colorId" isError={state.colorId.isError}>
                    <SelectField
                        placeholder={state.colorId.placeholder}
                        value={+state.colorId.value || undefined}
                        onChange={(v) => onChange(index, v, 'colorId')}
                        options={data.color?.data?.map((item) => ({
                            value: item.id,
                            caption: item.color,
                        }))}
                        selectProps={{
                            disabled: data.color.isLoading,
                            loading: data.color.isFetching,
                        }}
                    />
                </InputField>,
                <InputField key="sizeRangeId" isError={state.sizeRangeId.isError}>
                    <SelectField
                        placeholder={state.sizeRangeId.placeholder}
                        value={+state.sizeRangeId.value || undefined}
                        onChange={(v) => onChange(index, v, 'sizeRangeId')}
                        options={data.sizeRange?.data?.map((item) => ({
                            value: item.id,
                            caption: item.sizeRange,
                        }))}
                        selectProps={{
                            disabled: data.sizeRange.isLoading,
                            loading: data.sizeRange.isFetching,
                        }}
                    />
                </InputField>,
                <InputField key="lengthId" isError={state.lengthId.isError}>
                    <SelectField
                        placeholder={state.lengthId.placeholder}
                        value={+state.lengthId.value || undefined}
                        onChange={(v) => onChange(index, v, 'lengthId')}
                        options={data.length?.data?.map((item) => ({
                            value: item.id,
                            caption: item.length,
                        }))}
                        selectProps={{
                            disabled: data.length.isLoading,
                            loading: data.length.isFetching,
                        }}
                    />
                </InputField>,
                <InputField key="channelId" isError={state.channelId.isError}>
                    <SelectField
                        placeholder={state.channelId.placeholder}
                        value={+state.channelId.value || undefined}
                        onChange={(v) => onChange(index, v, 'channelId')}
                        options={data.channel?.data?.map((item) => ({
                            value: item.id,
                            caption: item.channel,
                        }))}
                        selectProps={{
                            disabled: data.channel.isLoading,
                            loading: data.channel.isFetching,
                        }}
                    />
                </InputField>,
                <InputField key="typeId" isError={state.typeId.isError}>
                    <SelectField
                        placeholder={state.typeId.placeholder}
                        value={+state.typeId.value || undefined}
                        onChange={(v) => onChange(index, v, 'typeId')}
                        options={data.type?.data?.map((item) => ({
                            value: item.id,
                            caption: item.type,
                        }))}
                        selectProps={{
                            disabled: data.type.isLoading,
                            loading: data.type.isFetching,
                        }}
                    />
                </InputField>,
                <InputField key="widthIn" isError={state.widthIn.isError}>
                    <InputNumber
                        placeholder={state.widthIn.placeholder}
                        onChangeHandler={(v) => {
                            onChange(index, v!, 'widthIn');
                        }}
                        value={state.widthIn.value || ''}
                        ref={(r) => refHandler(r, index)}
                        onKeyDown={onKeyDown}
                        onFocus={() => onFocus(index)}
                    />
                </InputField>,
                <InputField key="widthInDocument" isError={state.widthInDocument.isError}>
                    <InputNumber
                        placeholder={state.widthInDocument.placeholder}
                        onChangeHandler={(v) => {
                            onChange(index, v!, 'widthInDocument');
                        }}
                        value={state.widthInDocument.value || ''}
                    />
                </InputField>,
                <InputField key="moneyIn" isError={state.moneyIn.isError}>
                    <InputNumber
                        placeholder={state.moneyIn.placeholder}
                        onChangeHandler={(v) => {
                            onChange(index, v!, 'moneyIn');
                        }}
                        value={state.moneyIn.value || ''}
                    />
                </InputField>,
            ]}
        />
    );
};
