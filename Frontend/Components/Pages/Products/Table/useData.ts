import { useQuery } from '@tanstack/react-query';
import { getDataProduct } from '../../../../Store/OperationStore/Api';
import { useStores } from '../../../../Store/useStores';

export const useData = () => {
    const { loginStore } = useStores();
    const getProductsHandler = async () => {
        const res = await getDataProduct(loginStore.user.storeId);
        return res;
    };

    const products = useQuery(['products'], getProductsHandler, {
        enabled: !!loginStore.user.storeId,
    });

    return { products };
};
