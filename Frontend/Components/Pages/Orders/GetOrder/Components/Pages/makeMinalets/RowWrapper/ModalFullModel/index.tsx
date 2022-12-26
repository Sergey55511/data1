import { Button, Modal } from 'antd';
import { isArray } from 'lodash';
import { SetStateAction } from 'react';
import { useStores } from '../../../../../../../../../Store/useStores';
import { InputField } from '../../../../../../../../Shared/InputField';
import { SelectField } from '../../../../../../../../Shared/SelectField';
import { iState } from '../../useProps';
import { Wrapper } from './style';
import { useProps } from './useProps';

export const ModalFullModel = (props: {
    state: iState;
    setState: (value: SetStateAction<iState[]>) => void;
    index: number;
    onCancel: () => void;
    onChange: (v: string | number, index: number, fieldName: keyof iState) => void;
}) => {
    const paraps = useProps({
        state: props.state,
        resetValue: (fieldName: keyof iState) =>
            props.onChange('', props.index, fieldName),
    });

    return (
        <Modal
            title="Задать модель заготовки"
            open
            onCancel={props.onCancel}
            footer={[
                <Button key="close" onClick={props.onCancel}>
                    Закрыть
                </Button>,
            ]}
        >
            <Wrapper>
                <SelectField
                    placeholder={props.state.profile.placeholder}
                    value={+props.state.profile.value || undefined}
                    onChange={(v) => props.onChange(v, props.index, 'profile')}
                    options={paraps.data.profile.data?.map((item) => ({
                        value: item.id,
                        caption: item.profile,
                    }))}
                    selectProps={{
                        disabled: paraps.data.profile.isLoading,
                        loading: paraps.data.profile.isFetching,
                    }}
                />
                <SelectField
                    placeholder={props.state.model.placeholder}
                    value={+props.state.model.value || undefined}
                    onChange={(v) => props.onChange(v, props.index, 'model')}
                    options={paraps.data.model.data?.map((item) => ({
                        value: item.id,
                        caption: item.model,
                    }))}
                    selectProps={{
                        disabled: paraps.data.model.isLoading,
                        loading: paraps.data.model.isFetching,
                    }}
                />
                <SelectField
                    placeholder={props.state.sizeRangeModel.placeholder}
                    value={+props.state.sizeRangeModel.value || undefined}
                    onChange={(v) => props.onChange(v, props.index, 'sizeRangeModel')}
                    options={paraps.data.sizeRangeModel.data?.map((item) => ({
                        value: item.id,
                        caption: item.sizeRange,
                    }))}
                    selectProps={{
                        disabled: paraps.data.sizeRangeModel.isLoading,
                        loading: paraps.data.sizeRangeModel.isFetching,
                    }}
                />
                <SelectField
                    placeholder={props.state.fullModelId.placeholder}
                    value={+props.state.fullModelId.value || undefined}
                    onChange={(v, options) => {
                        const fullModelName = isArray(options) ? '' : options.children;
                        props.setState((prev) => {
                            prev[props.index].fullModelName = fullModelName as string;
                            return [...prev];
                        });
                        props.onChange(v, props.index, 'fullModelId');
                    }}
                    options={paraps.data.fullModel.data?.map((item) => ({
                        value: item.id,
                        caption: item.fullModel,
                    }))}
                    selectProps={{
                        disabled: paraps.data.fullModel.isLoading,
                        loading: paraps.data.fullModel.isFetching,
                    }}
                />
            </Wrapper>
        </Modal>
    );
};
