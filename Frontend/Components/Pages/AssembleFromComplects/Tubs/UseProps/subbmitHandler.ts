import { iData } from '../../../../../../Shared/Types/interfaces';
import { postAssembleComplect } from '../../../../../Store/OperationStore/Api';
import { useProps as useRootProps } from '../../useProps';
import { isValid } from './isValid';
import { extructData } from './extructData';
import { prepareComplectItems } from './prepareComplectItems';

export const subbmitHandler = (props: ReturnType<typeof useRootProps>) => {
    const data = extructData(props);
    const { complect } = data;
    isValid({ props, data });

    const complectItems = prepareComplectItems({ props, data });

    const newBeads = {
        complect,
        complectItems,
        model: props.model,
        length: props.length,
        width: props.width,
    };
    console.log(newBeads);
    return postAssembleComplect(newBeads);
};
