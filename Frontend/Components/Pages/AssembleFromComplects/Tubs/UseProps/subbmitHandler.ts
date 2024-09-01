import { iData } from '../../../../../../Shared/Types/interfaces';
import { postAssembleComplect } from '../../../../../Store/OperationStore/Api';
import { useProps as useRootProps } from '../../useProps';
import { isValid } from './isValid';
import { extructData } from './extructData';

export const subbmitHandler = (props: ReturnType<typeof useRootProps>) => {
    const data = extructData(props);
    const { minaret, getNumber, complect } = data;
    isValid({ props, data });

    const minaretClone: iData = JSON.parse(JSON.stringify(minaret));

    const moneyOut =
        (getNumber(minaretClone.code) / getNumber(minaretClone.width)) *
            getNumber(minaretClone.widthOut) || 0;

    const articleId = complect?.articleId;

    const newBeads = {
        complect,
        minaret: {
            ...minaretClone,
            moneyOut,
            articleId,
            managerId: props.managerId,
        },
        model: props.model,
        length: props.length,
        width: props.width,
    };
    console.log(newBeads);
    return Promise.resolve(newBeads);
    return postAssembleComplect(newBeads);
};
