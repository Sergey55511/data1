import { WORKPIECETYPE } from '../../../../../../Shared/constants';
import { useProps as useRootProps } from '../../useProps';

export const extructData = (props: ReturnType<typeof useRootProps>) => {
    const complect = props.complect ? props.complect[0] : undefined;
    const getNumber = (v: any) => (v ? +v : 0);

    const minaret = props.complectItems.find(
        (item) => item.workpieceTypeId == WORKPIECETYPE.minaret.id,
    );

    return { complect, getNumber, minaret };
};
