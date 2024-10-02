export const getUniqueData = <T>(
    leftovers: T[],
    key: keyof T,
    formatter?: (v: any) => any,
) => {
    let values = leftovers.map((item) => item[key]);
    values = [...new Set(values)].sort();
    return values.map((item) => ({
        text: formatter ? formatter(item!) : item!,
        value: item!,
    }));
};
