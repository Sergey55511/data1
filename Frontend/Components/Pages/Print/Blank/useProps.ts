import { useEffect } from 'react';
import { useStores } from '../../../../Store/useStores';

export const useProps = () => {
    const { loginStore } = useStores();
    const user = loginStore.user;
    useEffect(() => {
        loginStore.whoami();
    }, []);
};
