import { HeaderForm } from '../../Components/HeaderForm';
import { SignBlock } from '../../Components/SignBlock';
import { TableRow } from '../../Components/TableRow';
import { iProps, useRowData } from './useRowData';
import { Wrapper } from './style';
import { NameForm } from '../../Components/NameForm';

export const CommonForm = (props: iProps) => {
    const ROWDATA = useRowData(props);
    return (
        <Wrapper>
            <NameForm number={props.number} name={props.name} />
            <HeaderForm state={props.state} />
            {ROWDATA.map((item, index) => (
                <TableRow key={index} data={item} />
            ))}
            <SignBlock />
        </Wrapper>
    );
};
