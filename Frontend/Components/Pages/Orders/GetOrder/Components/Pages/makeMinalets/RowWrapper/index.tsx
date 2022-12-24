import { InputField } from '../../../../../../../Shared/InputField';
import { SelectField } from '../../../../../../../Shared/SelectField';
import { InputNumber } from '../../../../../../../Shared/InputNumber';
import { useStores } from '../../../../../../../../Store/useStores';
import { Dispatch, SetStateAction, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { iData } from '../../../../../../../../../Shared/Types/interfaces';
import { Row } from '../../../Shared/Row';
import { iState } from '../useProps';
import { useProps } from './useProps';
import { Button } from 'antd';
import { ModalFullModel } from './ModalFullModel';

export const RowWrapper = observer(
    (props: {
        isLoading?: boolean;
        index: number;
        removeRow: (i: number) => void;
        copyRow: (i: number) => void;
        state: iState;
        setState: Dispatch<SetStateAction<iState[]>>;
        record: iData;
    }) => {
        const { loginStore } = useStores();

        const [isShowModalFullModel, setIsShowModalFullModel] = useState(false);

        const onChange = (v: string | number, index: number, fieldName: keyof iState) => {
            props.setState((prev) => {
                prev[index][fieldName].value = v;
                return [...prev];
            });
        };

        const storeId = loginStore.user.storeId;

        const paraps = useProps(storeId, props.state);

        return (
            <>
                {isShowModalFullModel && (
                    <ModalFullModel state={props.state} index={props.index} onCancel={() => setIsShowModalFullModel(false)} />
                )}
                <Row
                    key={props.index}
                    isLoading={props.isLoading}
                    removeRow={() => props.removeRow(props.index)}
                    copyRow={() => props.copyRow(props.index)}
                    fields={[
                        <InputField
                            key="workpieceType"
                            isError={props.state.workpieceType.isError}
                        >
                            <SelectField
                                placeholder={props.state.workpieceType.placeholder}
                                value={+props.state.workpieceType.value || undefined}
                                onChange={(v) =>
                                    onChange(v, props.index, 'workpieceType')
                                }
                                options={paraps.data.workpieceType.data?.map((item) => ({
                                    value: item.id,
                                    caption: item.workpieceType,
                                }))}
                                selectProps={{
                                    disabled: paraps.data.workpieceType.isLoading,
                                    loading: paraps.data.workpieceType.isFetching,
                                }}
                            />
                        </InputField>,
                        // <InputField key="profile" isError={props.state.profile.isError}>
                        //     <SelectField
                        //         placeholder={props.state.profile.placeholder}
                        //         value={+props.state.profile.value || undefined}
                        //         onChange={(v) => onChange(v, props.index, 'profile')}
                        //         options={paraps.data.profile.data?.map((item) => ({
                        //             value: item.id,
                        //             caption: item.profile,
                        //         }))}
                        //         selectProps={{
                        //             disabled: paraps.data.profile.isLoading,
                        //             loading: paraps.data.profile.isFetching,
                        //         }}
                        //     />
                        // </InputField>,
                        // <InputField key="model" isError={props.state.model.isError}>
                        //     <SelectField
                        //         placeholder={props.state.model.placeholder}
                        //         value={+props.state.model.value || undefined}
                        //         onChange={(v) => onChange(v, props.index, 'model')}
                        //         options={paraps.data.model.data?.map((item) => ({
                        //             value: item.id,
                        //             caption: item.model,
                        //         }))}
                        //         selectProps={{
                        //             disabled: paraps.data.model.isLoading,
                        //             loading: paraps.data.model.isFetching,
                        //         }}
                        //     />
                        // </InputField>,
                        // <InputField key="sizeRangeModel" isError={props.state.sizeRangeModel.isError}>
                        //     <SelectField
                        //         placeholder={props.state.sizeRangeModel.placeholder}
                        //         value={+props.state.sizeRangeModel.value || undefined}
                        //         onChange={(v) => onChange(v, props.index, 'sizeRangeModel')}
                        //         options={paraps.data.sizeRangeModel.data?.map((item) => ({
                        //             value: item.id,
                        //             caption: item.sizeRange,
                        //         }))}
                        //         selectProps={{
                        //             disabled: paraps.data.sizeRangeModel.isLoading,
                        //             loading: paraps.data.sizeRangeModel.isFetching,
                        //         }}
                        //     />
                        // </InputField>,
                        // <InputField key="fullModel" isError={props.state.fullModel.isError}>
                        //     <SelectField
                        //         placeholder={props.state.fullModel.placeholder}
                        //         value={+props.state.fullModel.value || undefined}
                        //         onChange={(v) => onChange(v, props.index, 'fullModel')}
                        //         options={paraps.data.fullModel.data?.map((item) => ({
                        //             value: item.id,
                        //             caption: item.fullModel,
                        //         }))}
                        //         selectProps={{
                        //             disabled: paraps.data.fullModel.isLoading,
                        //             loading: paraps.data.fullModel.isFetching,
                        //         }}
                        //     />
                        // </InputField>,
                        <Button
                            key="fullModel"
                            type="link"
                            disabled={!props.state.workpieceType.value}
                            onClick={() => setIsShowModalFullModel(true)}
                        >
                            {props.state.fullModel.placeholder}
                        </Button>,
                        <InputField key="color" isError={props.state.color.isError}>
                            <SelectField
                                placeholder={props.state.color.placeholder}
                                value={+props.state.color.value || undefined}
                                onChange={(v) => onChange(v, props.index, 'color')}
                                options={paraps.data.color.data?.map((item) => ({
                                    value: item.id,
                                    caption: item.color,
                                }))}
                                selectProps={{
                                    disabled: paraps.data.color.isLoading,
                                    loading: paraps.data.color.isFetching,
                                }}
                            />
                        </InputField>,
                        <InputField key="grade" isError={props.state.grade.isError}>
                            <SelectField
                                placeholder={props.state.grade.placeholder}
                                value={+props.state.grade.value || undefined}
                                onChange={(v) => onChange(v, props.index, 'grade')}
                                options={paraps.data.grade.data?.map((item) => ({
                                    value: item.id,
                                    caption: item.grade,
                                }))}
                                selectProps={{
                                    disabled: paraps.data.grade.isLoading,
                                    loading: paraps.data.grade.isFetching,
                                }}
                            />
                        </InputField>,
                        <InputField key="widthIn" isError={props.state.widthIn.isError}>
                            <InputNumber
                                placeholder={props.state.widthIn.placeholder}
                                onChangeHandler={(v) => {
                                    onChange(v!, props.index, 'widthIn');
                                }}
                                value={props.state.widthIn.value || ''}
                            />
                        </InputField>,
                    ]}
                />
            </>
        );
    },
);
