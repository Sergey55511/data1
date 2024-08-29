import { SetStateAction, useEffect } from 'react';
import { RESULTASSEMBLE, WORKPIECETYPE } from '../../../../../../../Shared/constants';
import { iData } from '../../../../../../../Shared/Types/interfaces';

import { useData } from './useData';
import { State } from './State';

export const useSetModel = ({
    state,
    selectedRows,
    setModel,
    data,
}: {
    state: State;
    selectedRows: iData[];
    setModel: (value: SetStateAction<string | undefined>) => void;
    data: ReturnType<typeof useData>;
}) => {
    useEffect(() => {
        let res = '';
        const isSetModel = (() => {
            if (state?.typeBillet.value == `${RESULTASSEMBLE.chaplet.id || ''}`)
                return true;
            if (state?.typeBillet.value == `${RESULTASSEMBLE.complect.id || ''}`)
                return true;
        })();

        if (isSetModel) {
            const minaretItem = selectedRows.find(
                (item) => item.workpieceTypeId == WORKPIECETYPE.minaret.id,
            );

            const beadItem = selectedRows.find((item) =>
                [WORKPIECETYPE.bead.id, WORKPIECETYPE.ball.id].includes(
                    item.workpieceTypeId ?? 0,
                ),
            );

            const beadId = beadItem?.fullModelId;

            const minaretId = minaretItem?.fullModelId;

            const minaret = data.fullModel.data?.find((item) => item.id == minaretId);
            const bead = data.fullModel.data?.find((item) => item.id == beadId);

            const setProfile = (profile: string, sizeRange: string) => {
                if (profile) {
                    if (sizeRange) return `${profile}-${sizeRange}`;
                } else {
                    if (sizeRange) return sizeRange;
                }
                return `${profile}${sizeRange}`;
            };

            if (minaret) {
                const profile = minaret.Profile.profile ?? '';
                const sizeRange = minaret.SizeRangeModel.sizeRange ?? '';

                const model = minaret
                    ? `${minaret.Models.model}${setProfile(profile, sizeRange)}`
                    : '';

                res = 'TM';
                res += model.replace('I', ''); //взять из модели миналета
                res += '/';
            }

            if (bead) {
                const profile = bead.Profile.profile ?? '';
                const sizeRange = bead.SizeRangeModel.sizeRange ?? '';
                const length = bead.LengthModel?.length ?? '';
                res += setProfile(profile, sizeRange); //взять из размера бусины
                res += length ? 'x' : '';
                res += length; //взять из размера бусины
            }

            if (state?.typeAssemble.value) {
                const typeAssemble = data.types.data?.find(
                    (item) => `${item.id}` == state?.typeAssemble.value,
                )?.typeAssemble;
                res += '/' + typeAssemble;
            }
            if (state?.variantAssemble.value) {
                const variant = data.variants.data?.find(
                    (item) => `${item.id}` == state.variantAssemble.value,
                )?.variantAssemble;
                res += `/${variant}`;
            }
            if (state?.color.value) {
                const color = data.colors.data?.find(
                    (item) => `${item.id}` == state.color.value,
                )?.colorAssemble;
                res += `/${color}`;
            }
            if (state?.yarn.value) {
                const yarn = data.yarns.data?.find(
                    (item) => `${item.id}` == state.yarn.value,
                )?.yarnAssemble;
                res += `/${yarn}`;
            }
            if (state?.grade.value) {
                const grade = data.grades.data?.find(
                    (item) => `${item.id}` == state.grade.value,
                )?.gradeAssemble;
                res += `/${grade}`;
            }
        }

        setModel(res);
    }, [state]);
};
