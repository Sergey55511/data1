import { Dispatch, SetStateAction, useEffect } from 'react';
import { State } from './State';
import { round } from '../../../../../../../Shared/Helpers';
import { iData } from '../../../../../../../Shared/Types/interfaces';

export const useSetLosses = ({
    state,
    setState,
    selectedRows,
}: {
    setState: Dispatch<SetStateAction<State>>;
    state: State;
    selectedRows: iData[];
}) => {
    const getNum = (value?: any) => (value ? +value : 0);
    useEffect(() => {
        const ttlSum = selectedRows.reduce(
            (res, item) => (res += getNum(item.widthOut)),
            0,
        );
        setState((state) => {
            const widthIn = getNum(state?.widthIn.value);
            let losses = ttlSum - widthIn;
            losses = round(losses);
            const newValue = losses ? `${losses}` : '';

            if (state?.losses.value == newValue) return state;
            state.losses.value = newValue;
            return { ...state };
        });
    }, [state, selectedRows]);
};
