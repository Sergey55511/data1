import { Button, Modal } from 'antd';
import { useStores } from '../../../../../../../../../Store/useStores';
import { InputField } from '../../../../../../../../Shared/InputField';
import { SelectField } from '../../../../../../../../Shared/SelectField';
import { iState } from '../../useProps';
import { Wrapper } from './style';
import { useProps } from './useProps';

export const ModalFullModel = (props: {
    state: iState;
    index: number;
    onCancel: () => void;
}) => {
    const paraps = useProps(props);

    const onChange = (v: string | number, index: number, fieldName: keyof iState) => {
        // props.setState((prev) => {
        //     prev[index][fieldName].value = v;
        //     return [...prev];
        // });
    };

    return (
        <Modal title="Задать модель заготовки" open onCancel={props.onCancel}>
            <Wrapper>
                <InputField key="profile" isError={props.state.profile.isError}>
                    <SelectField
                        placeholder={props.state.profile.placeholder}
                        value={+props.state.profile.value || undefined}
                        onChange={(v) => onChange(v, props.index, 'profile')}
                        options={paraps.data.profile.data?.map((item) => ({
                            value: item.id,
                            caption: item.profile,
                        }))}
                        selectProps={{
                            disabled: paraps.data.profile.isLoading,
                            loading: paraps.data.profile.isFetching,
                        }}
                    />
                </InputField>
                <InputField key="model" isError={props.state.model.isError}>
                    <SelectField
                        placeholder={props.state.model.placeholder}
                        value={+props.state.model.value || undefined}
                        onChange={(v) => onChange(v, props.index, 'model')}
                        options={paraps.data.model.data?.map((item) => ({
                            value: item.id,
                            caption: item.model,
                        }))}
                        selectProps={{
                            disabled: paraps.data.model.isLoading,
                            loading: paraps.data.model.isFetching,
                        }}
                    />
                </InputField>
                <InputField
                    key="sizeRangeModel"
                    isError={props.state.sizeRangeModel.isError}
                >
                    <SelectField
                        placeholder={props.state.sizeRangeModel.placeholder}
                        value={+props.state.sizeRangeModel.value || undefined}
                        onChange={(v) => onChange(v, props.index, 'sizeRangeModel')}
                        options={paraps.data.sizeRangeModel.data?.map((item) => ({
                            value: item.id,
                            caption: item.sizeRange,
                        }))}
                        selectProps={{
                            disabled: paraps.data.sizeRangeModel.isLoading,
                            loading: paraps.data.sizeRangeModel.isFetching,
                        }}
                    />
                </InputField>
                <InputField key="fullModel" isError={props.state.fullModel.isError}>
                    <SelectField
                        placeholder={props.state.fullModel.placeholder}
                        value={+props.state.fullModel.value || undefined}
                        onChange={(v) => onChange(v, props.index, 'fullModel')}
                        options={paraps.data.fullModel.data?.map((item) => ({
                            value: item.id,
                            caption: item.fullModel,
                        }))}
                        selectProps={{
                            disabled: paraps.data.fullModel.isLoading,
                            loading: paraps.data.fullModel.isFetching,
                        }}
                    />
                </InputField>
            </Wrapper>
        </Modal>
    );
};
