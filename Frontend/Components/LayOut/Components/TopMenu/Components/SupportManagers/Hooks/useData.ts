import { useRef } from 'react';
import { useQuery } from 'react-query';
import { getManagers } from '../../../../../../../Store/Lists/api';

export const useData = ({
    storeId,
    operationId,
    search,
    active,
}: {
    storeId: number;
    operationId?: number;
    search?: string;
    active?: boolean;
}) => {
    const tId = useRef<ReturnType<typeof setTimeout>>();

    return useQuery(
        ['managers', storeId, operationId, search, active],
        () =>
            new Promise((resolve) => {
                clearTimeout(tId.current);
                tId.current = setTimeout(() => resolve('done'), 500);
            }).then(() => getManagers({ storeId, search, active, operationId })),
        {
            enabled: !!storeId,
        },
    );
};
