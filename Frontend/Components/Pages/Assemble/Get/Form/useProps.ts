import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { RESULTASSEMBLE, WORKPIECETYPE } from '../../../../../../Shared/constants';
import { round } from '../../../../../../Shared/Helpers';
import { iData } from '../../../../../../Shared/Types/interfaces';
import { State } from '../../useProps';
import { useData } from './useData';

export const useProps = (
    selectedRows: iData[],
    state: State,
    setState: Dispatch<SetStateAction<State>>,
    setModel: Dispatch<SetStateAction<string>>,
) => {
    const setStateHandler = (key: keyof State, value: any) => {
        setState((prev) => {
            prev[key].value = value;
            return { ...prev };
        });
    };

    const getValue = (value?: string) => (value ? +value : undefined);
    const getNum = (value?: any) => (value ? +value : 0);

    const getSelectProps = (field: keyof State) => ({
        placeholder: state[field].placeholder,
        onChange: (v: any) => setStateHandler(field, v),
        value: getValue(state[field].value),
    });

    const data = useData();

    useEffect(() => {
        const ttlSum = selectedRows.reduce(
            (res, item) => (res += getNum(item.widthOut)),
            0,
        );
        setState((state) => {
            const widthIn = getNum(state.widthIn.value);
            let losses = ttlSum - widthIn;
            losses = round(losses);
            const newValue = losses ? `${losses}` : '';

            if (state.losses.value == newValue) return state;
            state.losses.value = newValue;
            return { ...state };
        });
    }, [state, selectedRows]);

    useEffect(() => {
        let res = '';

        if (state.typeBillet.value == `${RESULTASSEMBLE.chaplet.id || ''}`) {
            const minaretItem = selectedRows.find(
                (item) => item.workpieceTypeId == WORKPIECETYPE.minaret.id,
            );

            const beadItem = selectedRows.find(
                (item) => item.workpieceTypeId == WORKPIECETYPE.bead.id,
            );

            const beadId = beadItem?.fullModelId;

            const minaretId = minaretItem?.fullModelId;

            const minaret = data.fullModel.data?.find((item) => item.id == minaretId);
            const bead = data.fullModel.data?.find((item) => item.id == beadId);

            if (minaret) {
                const model = minaret
                    ? `${minaret.Models.model}${minaret.Profile.profile}${minaret.SizeRangeModel.sizeRange}`
                    : '';

                res = 'TM';
                res += model.replace('I', ''); //взять из модели миналета
                res += '/';
            }

            if (bead) {
                res += bead.Profile.profile ?? ''; //взять из профиля бусины
                res += bead.SizeRangeModel.sizeRange ?? ''; //взять из размера бусины
                res += 'x';
                res += bead.LengthModel.length ?? ''; //взять из размера бусины
            }

            if (state.typeAssemble.value) {
                const typeAssemble = data.types.data?.find(
                    (item) => `${item.id}` == state.typeAssemble.value,
                )?.typeAssemble;
                res += '/' + typeAssemble;
            }
            if (state.variantAssemble.value) {
                const variant = data.variants.data?.find(
                    (item) => `${item.id}` == state.variantAssemble.value,
                )?.variantAssemble;
                res += `/${variant}`;
            }
            if (state.color.value) {
                const color = data.colors.data?.find(
                    (item) => `${item.id}` == state.color.value,
                )?.colorAssemble;
                res += `/${color}`;
            }
            if (state.yarn.value) {
                const yarn = data.yarns.data?.find(
                    (item) => `${item.id}` == state.yarn.value,
                )?.yarnAssemble;
                res += `/${yarn}`;
            }
            if (state.grade.value) {
                const grade = data.grades.data?.find(
                    (item) => `${item.id}` == state.grade.value,
                )?.gradeAssemble;
                res += `/${grade}`;
            }
        }

        setModel(res);
    }, [state]);

    return { state, setStateHandler, getValue, getSelectProps, data };
};
