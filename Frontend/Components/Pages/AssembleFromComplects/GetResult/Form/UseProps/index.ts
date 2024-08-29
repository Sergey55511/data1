import { Dispatch, SetStateAction, useState } from 'react';
import {
    eTypeAssemble,
    iData,
    iDataProduct,
} from '../../../../../../../Shared/Types/interfaces';
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
    setMinaret: Dispatch<SetStateAction<iData[]>>;
}

export const useProps = (selectedRows: iData[]) => {
    const [state, setState] = useState<State>(new State());
    const [model, setModel] = useState<string>();
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

    useSetLosses({ state, setState, selectedRows });

    useSetModel({ state, selectedRows, setModel, data });

    return { state, setStateHandler, getValue, getSelectProps, data, model };
};
