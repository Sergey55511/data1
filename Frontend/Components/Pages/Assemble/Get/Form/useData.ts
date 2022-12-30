import { useQuery } from '@tanstack/react-query';
import {
    getColorsAssemble,
    getFullModels,
    getGradesAssemble,
    getResultsAssemble,
    getTypesAssemble,
    getVariantsAssemble,
    getYarnsAssemble,
} from '../../../../../Store/Lists/api';

export const useData = () => {
    const colors = useQuery(['colorsAssemble'], getColorsAssemble);
    const grades = useQuery(['gradesAssemble'], getGradesAssemble);
    const results = useQuery(['resultsAssemble'], getResultsAssemble);
    const types = useQuery(['typesAssemble'], getTypesAssemble);
    const variants = useQuery(['variantsAssemble'], getVariantsAssemble);
    const yarns = useQuery(['yarnsAssemble'], getYarnsAssemble);
    const fullModel = useQuery(['fullModel'], () => getFullModels({}));

    return { colors, grades, results, types, variants, yarns, fullModel };
};
