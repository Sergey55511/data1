import { useQuery } from '@tanstack/react-query';
import { iDataProduct } from '../../../../../../Shared/Types/interfaces';
import { getDataProduct, getData } from '../../../../../Store/OperationStore/Api';

export const useGetData = (complects: iDataProduct[]) => {
    const articleId = complects?.find((item) => item.articleId)?.articleId;
    const dataProducts = useQuery([articleId], () => getDataProduct({ articleId }), {
        enabled: !!articleId,
    });
    const pp = dataProducts.data?.find((item) => item.pp)?.pp;
    const complectItems = useQuery([pp], () => getData({ pp }), {
        enabled: !!pp,
    });

    const data = complectItems.data
        ?.filter((item) => item.widthOut)
        .map((item) => ({ ...item, key: item.id }));

    return data;
};
