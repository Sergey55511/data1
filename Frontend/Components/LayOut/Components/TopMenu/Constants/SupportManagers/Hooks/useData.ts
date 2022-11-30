import debounce from 'lodash/debounce';
import { useCallback } from 'react';
import { useQuery } from 'react-query';
import { getManagers } from '../../../../../../../Store/Lists/api';

export const useData = ({ storeId, search }: { storeId: number; search?: string }) => {
    const get = useCallback(
        debounce(
            (storeId: number, search?: string) => getManagers({ storeId, search }),
            500,
        ),
        [],
    );
    return useQuery(['managers', storeId, search], () => get(storeId, search), {
        enabled: !!storeId,
    });
};
