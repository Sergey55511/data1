import { InputField } from '../../../../../../../../Shared/InputField';
import { InputNumber } from '../../../../../../../../Shared/InputNumber';
import { SelectField } from '../../../../../../../../Shared/SelectField';
import { useStores } from '../../../../../../../../../Store/useStores';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { getSizeRange } from '../Hooks';
import { WORKPIECETYPE } from '../../../../../../../../../../Shared/constants';
import {
    iGrade,
    iSizeRange,
} from '../../../../../../../../../../Shared/Types/interfaces';
import { iState } from '../../useProps';
import { useKeyArrow } from '../../../../Shared/Hooks/useKeyArrow';
import { useQuery } from '@tanstack/react-query';
import {
    getFraction,
    getMaterialGroup,
} from '../../../../../../../../../Store/Lists/api';
import { iProps as iRootProps } from '../../useProps';
import { iPropsRow } from '../../../../../../../../Shared/Row';
export interface iProps extends Omit<iRootProps, 'stateId'> {
    state: iState;
    index: number;
    isLoading?: boolean;
    removeRow: (index: number) => void;
    copyRow: (index: number) => void;
    setState: Dispatch<SetStateAction<iState[]>>;
    grade: iGrade[];
    arrowHandler: ReturnType<typeof useKeyArrow>;
}
export const useProps = ({
    state,
    index,
    setState,
    grade,
    arrowHandler,
    isMaterialGroup,
    isFraction,
    record,
}: iProps) => {
    const { ListsStore, loginStore } = useStores();
    const [sizeRange, setSizeRange] = useState<iSizeRange[]>([]);
    const onChange = (v: string | number, index: number, fieldName: keyof iState) => {
        setState((prev) => {
            if (fieldName == 'duplicate') return prev;
            prev[index][fieldName].value = v;
            return [...prev];
        });
    };

    const storeId = loginStore.user.storeId;
    useEffect(() => {
        if (record.fractionId) onChange(record.fractionId, index, 'fractionId');
    }, []);

    useEffect(() => {
        getSizeRange(ListsStore, setState, setSizeRange, index, storeId);
    }, [storeId, WORKPIECETYPE.stone.id]);

    const materialGroup = useQuery(['getMaterialGroup'], () => getMaterialGroup(true), {
        refetchOnMount: false,
        enabled: isMaterialGroup,
    });
    const fraction = useQuery(['fraction'], () => getFraction(), {
        refetchOnMount: false,
        enabled: isFraction,
    });

    const fields = [
        <InputField isError={state.gradeId.isError} key="grade">
            <SelectField
                placeholder={state.gradeId.placeholder}
                value={+state.gradeId.value || undefined}
                onChange={(v) => onChange(v, index, 'gradeId')}
                options={grade?.map((item) => ({
                    value: item.id,
                    caption: item.grade,
                }))}
            />
        </InputField>,
        <InputField isError={state.typeId.isError} key="type">
            <SelectField
                placeholder={state.typeId.placeholder}
                value={+state.typeId.value || undefined}
                onChange={(v) => onChange(v, index, 'typeId')}
                options={ListsStore.types.map((item) => ({
                    value: item.id,
                    caption: item.type,
                }))}
            />
        </InputField>,
        <InputField isError={state.colorId.isError} key="color">
            <SelectField
                placeholder={state.colorId.placeholder}
                value={+state.colorId.value || undefined}
                onChange={(v) => onChange(v, index, 'colorId')}
                options={ListsStore.colors.map((item) => ({
                    value: item.id,
                    caption: item.color,
                }))}
            />
        </InputField>,
        <InputField isError={state.sizeRangeId.isError} key="sizeRange">
            <SelectField
                placeholder={state.sizeRangeId.placeholder}
                value={+state.sizeRangeId.value || undefined}
                onChange={(v) => onChange(v, index, 'sizeRangeId')}
                options={sizeRange.map((item) => ({
                    value: item.id,
                    caption: item.sizeRange,
                }))}
            />
        </InputField>,
        <InputField isError={state.widthIn.isError} key="width">
            <InputNumber
                placeholder={state.widthIn.placeholder}
                onChangeHandler={(v) => {
                    onChange(v!, index, 'widthIn');
                }}
                value={state.widthIn.value || ''}
                ref={(r) => arrowHandler.refHandler(r, index)}
                onKeyDown={arrowHandler.onKeyDown}
                onFocus={() => arrowHandler.onFocus(index)}
            />
        </InputField>,
    ];

    const width: iPropsRow['width'] = ['100px'];

    if (isMaterialGroup) {
        fields.unshift(
            <InputField isError={state.materialGroupId.isError} key="materialGroup">
                <SelectField
                    placeholder={state.materialGroupId.placeholder}
                    value={+state.materialGroupId.value || undefined}
                    onChange={(v) => onChange(v, index, 'materialGroupId')}
                    options={materialGroup.data?.map((item) => ({
                        value: item.id,
                        caption: item.materialGroup,
                    }))}
                    selectProps={{ loading: materialGroup.isFetching }}
                />
            </InputField>,
        );
        width.unshift('120px');
    }
    if (isFraction) {
        fields.unshift(
            <InputField isError={state.fractionId.isError} key="fraction">
                <SelectField
                    placeholder={state.fractionId.placeholder}
                    value={
                        fraction.isFetching
                            ? undefined
                            : +state.fractionId.value || undefined
                    }
                    onChange={(v) => onChange(v, index, 'fractionId')}
                    options={fraction.data?.map((item) => ({
                        value: item.id,
                        caption: item.fraction,
                    }))}
                    selectProps={{ loading: fraction.isFetching }}
                />
            </InputField>,
        );
        width.unshift('120px');
    }

    return { fields, width };
};
