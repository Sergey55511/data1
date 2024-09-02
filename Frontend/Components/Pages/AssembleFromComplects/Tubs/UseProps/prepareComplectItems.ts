import { iData } from '../../../../../../Shared/Types/interfaces';
import { useProps as useRootProps } from '../../useProps';
import { extructData } from './extructData';

export const prepareComplectItems = ({
    props,
    data,
}: {
    data: ReturnType<typeof extructData>;
    props: ReturnType<typeof useRootProps>;
}): iData[] => {
    const { getNumber, complect } = data;
    const articleId = complect?.articleId;
    return props.complectItems.map((item) => {
        const moneyOut =
            (getNumber(item.code) / getNumber(item.width)) * getNumber(item.widthOut) ||
            0;

        return {
            ...item,
            moneyOut,
            articleId,
            managerId: props.managerId,
        };
    });
};
