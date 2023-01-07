import { useQuery } from '@tanstack/react-query';
import { OPERATIONS } from '../../../../../../Shared/constants';
import {
    getColorsAssemble,
    getFullModels,
    getGradesAssemble,
    getManagers,
    getResultsAssemble,
    getTypesAssemble,
    getVariantsAssemble,
    getYarnsAssemble,
} from '../../../../../Store/Lists/api';
import { useStores } from '../../../../../Store/useStores';

export const useData = () => {
    const { loginStore } = useStores();
    const storeId = loginStore.user.storeId;

    const colors = useQuery(['colorsAssemble'], getColorsAssemble);
    const grades = useQuery(['gradesAssemble'], getGradesAssemble);
    const results = useQuery(['resultsAssemble'], getResultsAssemble);
    const types = useQuery(['typesAssemble'], getTypesAssemble);
    const variants = useQuery(['variantsAssemble'], getVariantsAssemble);
    const yarns = useQuery(['yarnsAssemble'], getYarnsAssemble);
    const fullModel = useQuery(['fullModel'], () => getFullModels({}));
    const managers = useQuery(
        ['managers'],
        () => getManagers({ storeId, operationId: OPERATIONS.assemble.id }),
        { enabled: !!storeId },
    );

    return { colors, grades, results, types, variants, yarns, fullModel, managers };
};
