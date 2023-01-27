import { InputField } from '../../../../../../../Shared/InputField';
import { SelectField } from '../../../../../../../Shared/SelectField';
import { InputNumber } from '../../../../../../../Shared/InputNumber';
import { observer } from 'mobx-react-lite';
import { Row } from '../../../Shared/Row';
import { iProps, useProps } from './useProps';

export const RowWrapper = observer((props: iProps) => {
    const params = useProps(props);

    return (
        <Row
            key={props.index}
            isLoading={props.isLoading}
            removeRow={() => props.removeRow(props.index)}
            copyRow={() => props.copyRow(props.index)}
            fields={[
                <InputField key="sizeRange" isError={props.state.length.isError}>
                    <SelectField
                        placeholder={props.state.sizeRange.placeholder}
                        value={+props.state.sizeRange.value || undefined}
                        onChange={(v) => params.onChange(v, props.index, 'sizeRange')}
                        options={params.sizeRange.data?.map((item) => ({
                            value: item.id,
                            caption: item.sizeRange,
                        }))}
                        selectProps={{
                            disabled: params.sizeRange.isLoading,
                            loading: params.sizeRange.isFetching,
                        }}
                    />
                </InputField>,
                <InputField key="length" isError={props.state.length.isError}>
                    <SelectField
                        placeholder={props.state.length.placeholder}
                        value={+props.state.length.value || undefined}
                        onChange={(v) => params.onChange(v, props.index, 'length')}
                        options={params.length.data?.map((item) => ({
                            value: item.id,
                            caption: item.length,
                        }))}
                        selectProps={{
                            disabled: params.length.isLoading,
                            loading: params.length.isFetching,
                        }}
                    />
                </InputField>,
                <InputField key="grade" isError={props.state.grade.isError}>
                    <SelectField
                        placeholder={props.state.grade.placeholder}
                        value={+props.state.grade.value || undefined}
                        onChange={(v) => params.onChange(v, props.index, 'grade')}
                        options={params.grade.data?.map((item) => ({
                            value: item.id,
                            caption: item.grade,
                        }))}
                        selectProps={{
                            disabled: params.grade.isLoading,
                            loading: params.grade.isFetching,
                        }}
                    />
                </InputField>,
                <InputField key="widthIn" isError={props.state.widthIn.isError}>
                    <InputNumber
                        placeholder={props.state.widthIn.placeholder}
                        onChangeHandler={(v) => {
                            params.onChange(v!, props.index, 'widthIn');
                        }}
                        value={props.state.widthIn.value || ''}
                    />
                </InputField>,
            ]}
        />
    );
});
