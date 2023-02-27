import { useQuery } from '@tanstack/react-query';
import { getColors, getGrades } from '../../../../../../../../Store/Lists/api';
import { useKeyArrow } from '../../../Shared/Hooks/useKeyArrow';

export const useProps = (storeId: number) => {
    const { onKeyDown, onFocus, refHandler } = useKeyArrow();
    const grade = useQuery(['grade'], () => getGrades({}));
    const color = useQuery(['color'], () => getColors({ storeId }), {
        enabled: !!storeId,
    });
    return { data: { grade, color }, onKeyDown, onFocus, refHandler };
};
