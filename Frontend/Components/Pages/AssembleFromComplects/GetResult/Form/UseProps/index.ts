import { Dispatch, SetStateAction, useState } from 'react';
import {
    eTypeAssemble,
    iData,
    iDataProduct,
} from '../../../../../../../Shared/Types/interfaces';
import { tValue } from '../../../../../Shared/InputNumber';
import { eTypeButton } from '../../../useProps';
import { getSelectPropsCreator } from './getSelectProps';
import { State } from './State';
import { useData } from './useData';
import { useSetLosses } from './useSetLosses';
import { useSetModel } from './useSetModel';

export interface iProps {
    stateButton: eTypeButton;
    complects: iDataProduct[];
    selectedRows: iData[];
    resetRootState: () => void;
    setComplectItems: Dispatch<SetStateAction<iData[]>>;
    managerId: number | undefined;
    setManagerId: Dispatch<SetStateAction<number | undefined>>;
    length: tValue;
    setLength: Dispatch<SetStateAction<tValue>>;
    width: tValue;
    setWidth: Dispatch<SetStateAction<tValue>>;
    model: string;
    setModel: Dispatch<SetStateAction<string>>;
}

export const useProps = ({ selectedRows, model, setModel, complects }: iProps) => {
    const complectItem = complects[0];
    const [state, setState] = useState<State>(
        new State({
            colorId: complectItem.colorId,
            gradeId: complectItem.gradeId,
            typeAssembleId: complectItem.typeAssembleId,
        }),
    );
    const typeAssemble = eTypeAssemble.assemble;
    const setStateHandler = (key: keyof State, value: any) => {
        setState((prev) => {
            if (!prev) return prev;
            prev[key].value = value;
            return { ...prev };
        });
    };

    const getValue = (value?: string) => (value ? +value : undefined);

    const getSelectProps = getSelectPropsCreator({ state, getValue, setStateHandler });

    const data = useData(typeAssemble);

    useSetLosses({ state, setState, selectedRows: selectedRows });

    useSetModel({ state, selectedRows: selectedRows, setModel, data });

    return { state, setStateHandler, getValue, getSelectProps, data, model };
};
