import { Button, Tooltip } from 'antd';
import { InputField } from '../../../../../../../../Shared/InputField';
import { InputNumber } from '../../../../../../../../Shared/InputNumber';
import { SelectField } from '../../../../../../../../Shared/SelectField';
import { MinusOutlined } from '@ant-design/icons';
import { Wrapper } from './style';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../../../../../../../../Store/useStores';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { getSizeRange } from '../Hooks';
import { WORKPIECETYPE } from '../../../../../../../../../../Shared/constants';
import {
    iGrade,
    iSizeRange,
} from '../../../../../../../../../../Shared/Types/interfaces';
import { iState } from '../../useProps';

export const Row = observer(
    ({
        state,
        index,
        isLoading,
        removeRow,
        setState,
        grade,
    }: {
        state: iState;
        index: number;
        isLoading?: boolean;
        removeRow: (index: number) => void;
        setState: Dispatch<SetStateAction<iState[]>>;
        grade: iGrade[];
    }) => {
        const { ListsStore, loginStore } = useStores();
        const [sizeRange, setSizeRange] = useState<iSizeRange[]>([]);
        const onChange = (v: string | number, index: number, fieldName: keyof iState) => {
            setState((prev) => {
                prev[index][fieldName].value = v;
                return [...prev];
            });
        };

        const storeId = loginStore.user.storeId;
        useEffect(() => {
            getSizeRange(ListsStore, setState, setSizeRange, index, storeId);
        }, [storeId, WORKPIECETYPE.stone.id]);

        return (
            <Wrapper>
                <Tooltip title="Удалить строку">
                    <Button
                        shape="circle"
                        icon={<MinusOutlined />}
                        onClick={() => removeRow(index)}
                        loading={isLoading}
                    />
                </Tooltip>
                <div className="item">
                    <InputField isError={state.typeId.isError}>
                        <SelectField
                            placeholder={state.typeId.placeholder}
                            value={+state.typeId.value || undefined}
                            onChange={(v) => onChange(v, index, 'typeId')}
                            options={ListsStore.types.map((item) => ({
                                value: item.id,
                                caption: item.type,
                            }))}
                        />
                    </InputField>
                </div>
                <div className="item">
                    <InputField isError={state.gradeId.isError}>
                        <SelectField
                            placeholder={state.gradeId.placeholder}
                            value={+state.gradeId.value || undefined}
                            onChange={(v) => onChange(v, index, 'gradeId')}
                            options={grade?.map((item) => ({
                                value: item.id,
                                caption: item.grade,
                            }))}
                        />
                    </InputField>
                </div>
                <div className="item">
                    <InputField isError={state.colorId.isError}>
                        <SelectField
                            placeholder={state.colorId.placeholder}
                            value={+state.colorId.value || undefined}
                            onChange={(v) => onChange(v, index, 'colorId')}
                            options={ListsStore.colors.map((item) => ({
                                value: item.id,
                                caption: item.color,
                            }))}
                        />
                    </InputField>
                </div>
                <div className="item">
                    <InputField isError={state.sizeRangeId.isError}>
                        <SelectField
                            placeholder={state.sizeRangeId.placeholder}
                            value={+state.sizeRangeId.value || undefined}
                            onChange={(v) => onChange(v, index, 'sizeRangeId')}
                            options={sizeRange.map((item) => ({
                                value: item.id,
                                caption: item.sizeRange,
                            }))}
                        />
                    </InputField>
                </div>
                <div className="item">
                    <InputField isError={state.widthIn.isError}>
                        <InputNumber
                            placeholder={state.widthIn.placeholder}
                            onChangeHandler={(v) => {
                                onChange(v!, index, 'widthIn');
                            }}
                            value={state.widthIn.value || ''}
                        />
                    </InputField>
                </div>
            </Wrapper>
        );
    },
);
