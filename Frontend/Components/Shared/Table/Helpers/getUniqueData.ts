
export const getUniqueData = <T>(leftovers: T[], key: keyof T) => {

    let values = leftovers.map((item) => item[key]);
    values = [...new Set(values)].sort();
    return values.map((item) => ({
        text: item!,
        value: item!,
    }));
};
