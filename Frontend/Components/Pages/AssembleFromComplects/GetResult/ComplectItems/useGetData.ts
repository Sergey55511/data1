import { useQuery } from '@tanstack/react-query';
import { iData } from '../../../../../../Shared/Types/interfaces';
import { getDataProduct } from '../../../../../Store/OperationStore/Api';

export const useGetData = () => {
    const articleId = 24;
    const dataProducts = useQuery([articleId], () => getDataProduct({ articleId }), {
        enabled: !!articleId,
    });
    console.log('dataProducts', dataProducts.data);

    let data: iData[] = [];
    return data;
};
