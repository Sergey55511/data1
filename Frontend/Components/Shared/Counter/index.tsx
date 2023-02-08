import { iData } from '../../../../Shared/Types/interfaces';
import { Wrapper } from './style';

interface iCount {
    width: number;
    count: number;
}

export const Counter = ({ data }: { data: iData[] }) => {
    const getNumber = (v: any) => (v ? +v : 0);
    const count = data.reduce(
        (res: iCount, item) => {
            res.width += getNumber(item.width);
            res.count += getNumber(item.count);
            return res;
        },
        { width: 0, count: 0 },
    );

    return (
        <Wrapper>
            <div>строк: {data.length.toLocaleString()}</div>
            <div>вес: {count.width.toLocaleString()}</div>
            <div>шт: {count.count.toLocaleString()}</div>
        </Wrapper>
    );
};
