import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { QueryCache, QueryClient } from 'react-query';
import { iError } from '../../../Shared/Types/interfaces';
import { useStores } from '../../Store/useStores';
import { ROUTES } from '../Pages/constants';

export const useQueryClient = () => {
    const { ErrorStore } = useStores();
    const router = useRouter();
    return useMemo(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        refetchOnWindowFocus: false,
                        retry: 0,
                    },
                },
                queryCache: new QueryCache({
                    onError: (err) => {
                        const error = err as iError;
                        if (error.response.status == 401) {
                            ErrorStore.resetError();
                            router.push(ROUTES.login);
                            return;
                        }
                        ErrorStore.setError(error);
                    },
                }),
            }),
        [],
    );
};
