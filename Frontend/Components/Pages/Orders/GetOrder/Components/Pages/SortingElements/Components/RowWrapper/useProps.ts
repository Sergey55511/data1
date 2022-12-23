import { useQuery } from '@tanstack/react-query';
import { getColors, getGrades } from '../../../../../../../../../Store/Lists/api';

export const useProps = (storeId: number) => {
    const grade = useQuery(['grade'], () => getGrades({}));
    const color = useQuery(['color'], () => getColors({ storeId }), {
        enabled: !!storeId,
    });
    return { data: { grade, color } };
};
