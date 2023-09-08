import { useGetProductionList } from '../useGetProductionList';

export const useProps = () => {
    const productionList = useGetProductionList();

    const options = productionList.data?.map((item) => {
        const fullModal = item.fullModel ? ` (${item.fullModel})` : '';
        return {
            value: item.id,
            caption: `${item.id} - ${item.description}${fullModal}`,
        };
    });

    return { productionList, options };
};
