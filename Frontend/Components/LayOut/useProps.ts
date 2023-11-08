import { useEffect } from 'react';
import { useStores } from '../../Store/useStores';
import 'moment/locale/ru';
import { useQueryClient } from './useQueryClient';

export const useProps = () => {
    const { loginStore, UIStore, OperationStore, SocketIo } = useStores();

    const queryClient = useQueryClient();

    useEffect(() => {
        UIStore.getVersion();

        UIStore.setIsLoading(true);
        const whoami = async () => {
            await loginStore.whoami();
            UIStore.setIsLoading(false);
        };
        if (!loginStore.user.login) {
            whoami();
        } else {
            UIStore.setIsLoading(false);
        }
    }, []);
    useEffect(() => {
        if (loginStore.user.storeId) {
            OperationStore.fetchInitData(loginStore.user.storeId);
        }
    }, [loginStore.user.storeId]);

    useEffect(() => {
        SocketIo.start();
    }, [OperationStore.loginStore.user.storeId, SocketIo.socketUrl]);

    useEffect(() => {
        if (UIStore.version) {
            console.log('version', UIStore.version);
        }
    }, [UIStore.version]);

    const isLoading = UIStore.isLoading;
    return { queryClient, isLoading };
};
