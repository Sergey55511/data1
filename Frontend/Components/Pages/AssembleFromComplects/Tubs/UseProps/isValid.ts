import { useProps as useRootProps } from '../../useProps';
import { extructData } from './extructData';

export const isValid = ({
    props,
    data,
}: {
    data: ReturnType<typeof extructData>;
    props: ReturnType<typeof useRootProps>;
}) => {
    const { minaret, getNumber, complect } = data;
    const minaretWidthOut = getNumber(minaret?.widthOut);
    const countItemsOut = getNumber(minaret?.countItemsOut);
    const complectWidth = getNumber(complect?.width);
    const widthResult = getNumber(props.width);

    if (!minaret) {
        throw new Error('Минарет не выбран');
    }

    if (!countItemsOut) {
        throw new Error('Количество минарета не указанно');
    }
    if (!minaretWidthOut) {
        throw new Error('Вес минарета не указан');
    }
    if (!widthResult) {
        throw new Error('Вес комплекта не указан');
    }
    if (widthResult < minaretWidthOut + complectWidth) {
        throw new Error('Вес готового изделия меньше комплекта + минарета');
    }
};
