import { useQuery } from '@tanstack/react-query';
import { OPERATIONS } from '../../../../../../../../../Shared/constants';
import { iData } from '../../../../../../../../../Shared/Types/interfaces';
import { getColors, getGrades } from '../../../../../../../../Store/Lists/api';
import { useKeyArrow } from '../../../Shared/Hooks/useKeyArrow';

export const useProps = (storeId: number, record: iData) => {
    const { onKeyDown, onFocus, refHandler } = useKeyArrow();
    const grade = useQuery(['grade'], () =>
        getGrades({
            workpieceTypeId: record.workpieceTypeId,
            operationId: OPERATIONS.sortingElements.id,
        }),
    );
    const color = useQuery(['color'], () => getColors({ storeId }), {
        enabled: !!storeId,
    });
    return { data: { grade, color }, onKeyDown, onFocus, refHandler };
};
