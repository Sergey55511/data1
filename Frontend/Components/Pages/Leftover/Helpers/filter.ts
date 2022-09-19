import { iLeftovers } from '../../../../../Shared/Types/interfaces';

export const onFilter = <T extends iLeftovers, Key extends keyof T>(
    value: T[Key],
    record: T,
    key: Key,
) => record[key] == value;
