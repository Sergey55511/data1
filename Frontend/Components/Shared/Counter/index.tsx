import { Wrapper } from './style';

interface iCount {
    width: number;
    count: number;
}

export const Counter = <T extends Object>({
    data,
    widthKey,
    countKey,
}: {
    data: T[];
    widthKey?: keyof T;
    countKey?: keyof T;
}) => {
    const getNumber = (v: any) => (v ? +v : 0);
    const count = data.reduce(
        (res: iCount, item) => {
            res.width += getNumber(item[widthKey!]);
            res.count += getNumber(item[countKey!]);
            return res;
        },
        { width: 0, count: 0 },
    );

    return (
        <Wrapper>
            <div>строк: {data.length.toLocaleString()}</div>
            {!!widthKey && <div>вес: {count.width.toLocaleString()}</div>}
            {!!countKey && <div>шт: {count.count.toLocaleString()}</div>}
        </Wrapper>
    );
};
