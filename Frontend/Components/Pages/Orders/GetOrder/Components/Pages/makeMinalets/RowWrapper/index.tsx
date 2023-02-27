import { InputField } from '../../../../../../../Shared/InputField';
import { SelectField } from '../../../../../../../Shared/SelectField';
import { InputNumber } from '../../../../../../../Shared/InputNumber';
import { observer } from 'mobx-react-lite';
import { useProps } from './useProps';
import { FullModelButton } from './fullModelButton';
import { iProps } from './useProps';
import { Row } from '../../../../../../../Shared/Row';

export const RowWrapper = observer((props: iProps) => {
    const paraps = useProps(props);

    return (
        <>
            <Row
                key={props.index}
                isLoading={props.isLoading}
                removeRow={() => props.removeRow(props.index)}
                copyRow={() => props.copyRow(props.index)}
                width={[undefined, undefined, undefined, '100px', '100px', '100px']}
                fields={[
                    <InputField
                        key="workpieceType"
                        isError={props.state.workpieceType.isError}
                    >
                        <SelectField
                            placeholder={props.state.workpieceType.placeholder}
                            value={+props.state.workpieceType.value || undefined}
                            onChange={(v) =>
                                paraps.onChange(v, props.index, 'workpieceType')
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
                    <InputField
                        key="FullModelButton"
                        isError={props.state.fullModelId.isError}
                    >
                        <FullModelButton
                            state={props.state}
                            setState={props.setState}
                            index={props.index}
                            onChange={paraps.onChange}
                            record={props.record}
                        />
                    </InputField>,
                    <InputField key="color" isError={props.state.color.isError}>
                        <SelectField
                            placeholder={props.state.color.placeholder}
                            value={+props.state.color.value || undefined}
                            onChange={(v) => paraps.onChange(v, props.index, 'color')}
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
                            onChange={(v) => paraps.onChange(v, props.index, 'grade')}
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
                                paraps.onChange(v!, props.index, 'widthIn');
                            }}
                            value={props.state.widthIn.value || ''}
                            ref={(r) => paraps.refHandler(r, props.index)}
                            onKeyDown={paraps.onKeyDown}
                            onFocus={() => paraps.onFocus(props.index)}
                        />
                    </InputField>,
                    <InputField key="countIn" isError={props.state.countIn.isError}>
                        <InputNumber
                            placeholder={props.state.countIn.placeholder}
                            isInt
                            onChangeHandler={(v) => {
                                paraps.onChange(v!, props.index, 'countIn');
                            }}
                            value={props.state.countIn.value || ''}
                        />
                    </InputField>,
                ]}
            />
        </>
    );
});
