import { TableRow } from '../TableRow';
import { iProps, useSignRowData } from './useSignRowData';

export const SignBlock = (props: iProps) => {
    const SIGNROWDATA = useSignRowData(props);
    return (
        <>
            {SIGNROWDATA.map((item, index) => (
                <TableRow key={index} data={item} />
            ))}
        </>
    );
};
