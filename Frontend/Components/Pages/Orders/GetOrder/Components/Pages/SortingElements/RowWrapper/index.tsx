import { InputField } from '../../../../../../../Shared/InputField';
import { SelectField } from '../../../../../../../Shared/SelectField';
import { InputNumber } from '../../../../../../../Shared/InputNumber';
import { useStores } from '../../../../../../../../Store/useStores';
import { Dispatch, SetStateAction } from 'react';
import { observer } from 'mobx-react-lite';
import { iData } from '../../../../../../../../../Shared/Types/interfaces';
import { iState } from '../useProps';
import { useProps } from './useProps';
import { Row } from '../../../../../../../Shared/Row';

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

        const onChange = (v: string | number, index: number, fieldName: keyof iState) => {
            props.setState((prev) => {
                prev[index][fieldName].value = v;
                return [...prev];
            });
        };

        const storeId = loginStore.user.storeId;

        const params = useProps(storeId, props.record);

        return (
            <Row
                key={props.index}
                isLoading={props.isLoading}
                removeRow={() => props.removeRow(props.index)}
                copyRow={() => props.copyRow(props.index)}
                fields={[
                    <InputField key="state" isError={props.state.color.isError}>
                        <SelectField
                            placeholder={props.state.color.placeholder}
                            value={+props.state.color.value || undefined}
                            onChange={(v) => onChange(v, props.index, 'color')}
                            options={params.data.color.data?.map((item) => ({
                                value: item.id,
                                caption: item.color,
                            }))}
                            selectProps={{
                                disabled: !params.data.color.isFetched,
                                loading: !params.data.color.isFetched,
                            }}
                        />
                    </InputField>,
                    <InputField key="grade" isError={props.state.grade.isError}>
                        <SelectField
                            placeholder={props.state.grade.placeholder}
                            value={+props.state.grade.value || undefined}
                            onChange={(v) => onChange(v, props.index, 'grade')}
                            options={params.data.grade.data?.map((item) => ({
                                value: item.id,
                                caption: item.grade,
                            }))}
                            selectProps={{
                                disabled: !params.data.grade.isFetched,
                                loading: !params.data.grade.isFetched,
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
                            ref={(r) => params.refHandler(r, props.index)}
                            onKeyDown={params.onKeyDown}
                            onFocus={() => params.onFocus(props.index)}
                        />
                    </InputField>,
                ]}
            />
        );
    },
);
