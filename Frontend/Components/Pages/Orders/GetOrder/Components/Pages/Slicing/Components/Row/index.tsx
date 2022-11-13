import { Button, Tooltip } from 'antd';
import { MinusOutlined } from '@ant-design/icons';
import { InputField } from '../../../../../../../../Shared/InputField';
import { SelectField } from '../../../../../../../../Shared/SelectField';
import { InputNumber } from '../../../../../../../../Shared/InputNumber';
import { useStores } from '../../../../../../../../../Store/useStores';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { iState } from '../..';
import { observer } from 'mobx-react-lite';
import { useLists } from '../Hooks/useLists';
import {
    iGrade,
    iLength,
    iSizeRange,
} from '../../../../../../../../../../Shared/Types/interfaces';

export interface iLists {
    sizeRange: iSizeRange[];
    length: iLength[];
    grade: iGrade[];
}
export const Row = observer(
    ({
        isLoading,
        index,
        removeRow,
        state,
        setState,
    }: {
        isLoading?: boolean;
        index: number;
        removeRow: (i: number) => void;
        state: iState;
        setState: Dispatch<SetStateAction<iState[]>>;
    }) => {
        const { ListsStore, loginStore } = useStores();
        const [lists, setLists] = useState<iLists | undefined>(undefined);
        const [isLoadinglength, setIsLoadinglength] = useState<boolean>(false);
        const onChange = (v: string | number, index: number, fieldName: keyof iState) => {
            setState((prev) => {
                prev[index][fieldName].value = v;
                return [...prev];
            });
        };

        useLists(
            setLists,
            loginStore.user.storeId,
            state,
            index,
            setIsLoadinglength,
            onChange,
        );

        console.log('lists', lists);

        return (
            <div className="row">
                <Tooltip title="Удалить строку">
                    <Button
                        shape="circle"
                        icon={<MinusOutlined />}
                        onClick={() => removeRow(index)}
                        loading={isLoading}
                    />
                </Tooltip>
                <div className="item">
                    <InputField isError={state.workpieceTypeId.isError}>
                        <SelectField
                            placeholder={state.workpieceTypeId.placeholder}
                            value={+state.workpieceTypeId.value || undefined}
                            onChange={(v) => onChange(v, index, 'workpieceTypeId')}
                            options={ListsStore.workpieceType?.map((item) => ({
                                value: item.id,
                                caption: item.workpieceType,
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
                            options={lists?.sizeRange?.map((item) => ({
                                value: item.id,
                                caption: item.sizeRange,
                            }))}
                        />
                    </InputField>
                </div>
                <div className="item">
                    <InputField isError={state.length.isError}>
                        <SelectField
                            placeholder={state.length.placeholder}
                            value={+state.length.value || undefined}
                            onChange={(v) => onChange(v, index, 'length')}
                            options={lists?.length?.map((item) => ({
                                value: item.id,
                                caption: item.length,
                            }))}
                            selectProps={{
                                disabled: isLoadinglength,
                                loading: isLoadinglength,
                            }}
                        />
                    </InputField>
                </div>
                <div className="item">
                    <InputField isError={state.colorId.isError}>
                        <SelectField
                            placeholder={state.colorId.placeholder}
                            value={+state.colorId.value || undefined}
                            onChange={(v) => onChange(v, index, 'colorId')}
                            options={ListsStore.colors?.map((item) => ({
                                value: item.id,
                                caption: item.color,
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
                            options={lists?.grade?.map((item) => ({
                                value: item.id,
                                caption: item.grade,
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
            </div>
        );
    },
);
