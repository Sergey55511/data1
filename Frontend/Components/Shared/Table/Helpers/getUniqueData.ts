import { iData } from '../../../../../Shared/Types/interfaces';

export const getUniqueData = <T extends iData>(leftovers: T[], key: keyof T) => {

    let values = leftovers.map((item) => item[key]);
    values = [...new Set(values)].sort();
    return values.map((item) => ({
        text: item!,
        value: item!,
    }));
};