import { useQuery } from '@tanstack/react-query';
import { getBijouterieLeftovers } from '../../../api';
import { tDataSource } from '../../useData';

export const useProps = (item: tDataSource) => {
    const leftovers = useQuery(['bijouterieLeftovers'], () =>
        getBijouterieLeftovers({
            workpieceTypeId: item?.workpieceTypeId,
            sizeRangeId: item?.sizeRangeId,
            colorId: item?.colorId,
        }),
    );
    return { leftovers };
};
