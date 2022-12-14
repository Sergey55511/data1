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
        const [isLoadinglength, setIsLoadinglength] = useState<boolean>(false);

        const onChange = (v: string | number, index: number, fieldName: keyof iState) => {
            props.setState((prev) => {
                prev[index][fieldName].value = v;
                return [...prev];
            });
        };

        const storeId = loginStore.user.storeId;

        const paraps = useProps(storeId);

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
                            options={paraps.data.color.data?.map((item) => ({
                                value: item.id,
                                caption: item.color,
                            }))}
                            selectProps={{
                                disabled: isLoadinglength,
                                loading: isLoadinglength,
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
                                disabled: isLoadinglength,
                                loading: isLoadinglength,
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
        );
    },
);
