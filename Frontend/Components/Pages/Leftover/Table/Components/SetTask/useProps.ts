import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import {
    getFullModels,
    getLengthModel,
    getModels,
    getProfile,
    getSizeRangeModel,
    getWorkpieceTypeModel,
} from '../../../../../../Store/Lists/api';
import { useStores } from '../../../../../../Store/useStores';

class Field {
    key: string;
    value?: number;
    constructor(key: string) {
        this.key = key;
    }
}

const initState = {
    workpieceTypeId: new Field('workpieceTypeId'),
    modelId: new Field('modelId'),
    profileId: new Field('profileId'),
    lengthModelId: new Field('lengthModelId'),
    sizeRangeModelId: new Field('sizeRangeModelId'),
};

export const useProps = () => {
    const { loginStore } = useStores();
    const storeId = loginStore.user.storeId;
    const [state, setState] = useState(initState);

    const workpieceType = useQuery(['workpieceType', 'model'], getWorkpieceTypeModel, {
        enabled: !!storeId,
    });

    const model = useQuery(['models', 'model'], getModels, {
        enabled: !!storeId,
    });

    const profile = useQuery(['profile', 'model'], getProfile, {
        enabled: !!storeId,
    });
    const lengthModel = useQuery(['lengthModel', 'model'], getLengthModel, {
        enabled: !!storeId,
    });
    const sizeRangeModel = useQuery(['sizeRangeModel', 'model'], getSizeRangeModel, {
        enabled: !!storeId,
    });

    const fullModels = useQuery(['fullModels', 'model'], getFullModels, {
        enabled: !!storeId,
    });

    return {
        data: { workpieceType, model, profile, lengthModel, sizeRangeModel },
        state,
    };
};
