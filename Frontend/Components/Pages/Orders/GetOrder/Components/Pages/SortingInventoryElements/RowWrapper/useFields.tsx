import { InputField } from '../../../../../../../Shared/InputField';
import { SelectField } from '../../../../../../../Shared/SelectField';
import { InputNumber } from '../../../../../../../Shared/InputNumber';
import { iProps, useProps } from './useProps';

export const useFields = ({
    props,
    params,
}: {
    props: iProps;
    params: ReturnType<typeof useProps>;
}) => {
    const fields = [
        <InputField key="model" isError={props.state.model.isError}>
            <SelectField
                placeholder={props.state.model.placeholder}
                value={+props.state.model.value || undefined}
                onChange={(v) => params.onChange(v, props.index, 'model')}
                options={params.model.data?.map((item) => ({
                    value: item.id,
                    caption: item.model,
                }))}
                selectProps={{
                    disabled: params.model.isLoading,
                    loading: params.model.isFetching,
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
        <InputField key="color" isError={props.state.grade.isError}>
            <SelectField
                placeholder={props.state.color.placeholder}
                value={+props.state.color.value || undefined}
                onChange={(v) => params.onChange(v, props.index, 'color')}
                options={params.color.data?.map((item) => ({
                    value: item.id,
                    caption: item.color,
                }))}
                selectProps={{
                    disabled: params.color.isLoading,
                    loading: params.color.isFetching,
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
                ref={(r) => params.refHandler(r, props.index)}
                onKeyDown={params.onKeyDown}
                onFocus={() => params.onFocus(props.index)}
            />
        </InputField>,
    ];
    if (props.isMinaret) {
        fields.push(
            <InputField key="countItemsIn" isError={props.state.countItemsIn?.isError}>
                <InputNumber
                    placeholder={props.state.countItemsIn?.placeholder}
                    onChangeHandler={(v) => {
                        params.onChange(v!, props.index, 'countItemsIn');
                    }}
                    value={props.state.countItemsIn?.value || ''}
                />
            </InputField>,
        );
    }

    return fields;
};
