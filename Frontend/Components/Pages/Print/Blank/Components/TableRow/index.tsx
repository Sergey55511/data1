import { Cell } from './cell';
import { Wrapper } from './style';

type tClass =
    | 'gray'
    | 'borderNone'
    | 'borderLeft'
    | 'borderRight'
    | 'borderBottom'
    | 'borderTop';
export interface iValue {
    value: string;
    class?: tClass[] | tClass;
}

export interface iTableRowData {
    moveOut: iValue[];
    moveIn: iValue[];
}
export interface iProps {
    data: iTableRowData;
}

export const TableRow = ({ data }: iProps) => (
    <Wrapper>
        <div className="moveOut">
            {data.moveOut.map((item, index) => (
                <Cell key={index} value={item} />
            ))}
        </div>
        <div className="moveIn">
            {data.moveIn.map((item, index) => (
                <Cell key={index} value={item} />
            ))}
        </div>
    </Wrapper>
);
