import { Button, InputRef, Tooltip } from 'antd';
import { MinusOutlined, CopyOutlined } from '@ant-design/icons';
import { InputField } from '../../../../../../../../Shared/InputField';
import { SelectField } from '../../../../../../../../Shared/SelectField';
import { InputNumber } from '../../../../../../../../Shared/InputNumber';
import { useStores } from '../../../../../../../../../Store/useStores';
import { Dispatch, SetStateAction } from 'react';
import { observer } from 'mobx-react-lite';
import {
    iField,
    iGrade,
    iLength,
    iSizeRange,
} from '../../../../../../../../../../Shared/Types/interfaces';
import { useData } from '../Hooks/useData';
import { STATE } from '../../../../../../../../../../Shared/constants';
import { iState, useProps } from '../../useProps';

export interface iLists {
    sizeRange: iSizeRange[];
    length: iLength[];
    grade: iGrade[];
}
export const Row = observer(
    ({
        operationId,
        index,
        removeRow,
        copyRow,
        state,
        setState,
        isShowState,
        onKeyDown,
        onFocus,
        refHandler,
    }: {
        operationId: number;
        index: number;
        removeRow: (i: number) => void;
        copyRow: (i: number) => void;
        state: iState;
        setState: Dispatch<SetStateAction<iState[]>>;
        isShowState?: boolean;
        onKeyDown: ReturnType<typeof useProps>['onKeyDown'];
        onFocus: ReturnType<typeof useProps>['onFocus'];
        refHandler: ReturnType<typeof useProps>['refHandler'];
    }) => {
        const { loginStore } = useStores();

        const onChange = (v: string | number, fieldName: keyof iState) => {
            setState((prev) => {
                const field = prev[index][fieldName] as iField;
                field.value = v;
                return [...prev];
            });
        };

        const { workpieceType, color, sizeRange, grade, stateResult } = useData(
            operationId,
            loginStore.user.storeId,
            +state.workpieceTypeId.value,
            +state.sizeRangeId.value,
            onChange,
            isShowState ? [STATE.sliced.id, STATE.balled.id] : undefined,
        );

        return (
            <div className={`row ${state.duplicate ? 'duplicate' : ''}`}>
                <Tooltip title="Удалить строку">
                    <Button
                        shape="circle"
                        icon={<MinusOutlined />}
                        onClick={() => removeRow(index)}
                    />
                </Tooltip>
                <Tooltip title="Копировать строку">
                    <Button
                        shape="circle"
                        icon={<CopyOutlined />}
                        onClick={() => copyRow(index)}
                    />
                </Tooltip>
                {isShowState && (
                    <div className="item">
                        <InputField isError={state.stateId.isError}>
                            <SelectField
                                placeholder={state.stateId.placeholder}
                                value={+state.stateId.value || undefined}
                                onChange={(v) => onChange(v, 'stateId')}
                                selectProps={{ loading: stateResult.isLoading }}
                                options={stateResult.data?.map((item) => ({
                                    value: item.id,
                                    caption: item.state,
                                }))}
                            />
                        </InputField>
                    </div>
                )}
                <div className="item">
                    <InputField isError={state.workpieceTypeId.isError}>
                        <SelectField
                            placeholder={state.workpieceTypeId.placeholder}
                            value={+state.workpieceTypeId.value || undefined}
                            onChange={(v) => onChange(v, 'workpieceTypeId')}
                            selectProps={{ loading: workpieceType.isLoading }}
                            options={workpieceType.data?.map((item) => ({
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
                            onChange={(v) => onChange(v, 'sizeRangeId')}
                            selectProps={{ loading: sizeRange.isLoading }}
                            options={sizeRange.data?.map((item) => ({
                                value: item.id,
                                caption: item.sizeRange,
                            }))}
                        />
                    </InputField>
                </div>
                <div className="item">
                    <InputField isError={state.colorId.isError}>
                        <SelectField
                            placeholder={state.colorId.placeholder}
                            value={+state.colorId.value || undefined}
                            onChange={(v) => onChange(v, 'colorId')}
                            selectProps={{ loading: color.isLoading }}
                            options={color.data?.map((item) => ({
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
                            onChange={(v) => onChange(v, 'gradeId')}
                            selectProps={{ loading: grade.isLoading }}
                            options={grade.data?.map((item) => ({
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
                                onChange(v!, 'widthIn');
                            }}
                            value={state.widthIn.value || ''}
                            ref={(r) => refHandler(r, index)}
                            onKeyDown={onKeyDown}
                            onFocus={() => onFocus(index)}
                        />
                    </InputField>
                </div>
            </div>
        );
    },
);
