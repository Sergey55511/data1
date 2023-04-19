import { ROWDATA } from './constants';
import { Wrapper } from './style';
import { SignBlock } from '../../Components/SignBlock';
import { TableRow } from '../../Components/TableRow';
import { HeaderForm } from '../../Components/HeaderForm';

export const Drilling = ({
    number,
    name,
    color,
    state,
}: {
    number: number;
    name: string;
    state: string;
    color: string;
}) => {
    return (
        <Wrapper>
            <div className="container">
                <div className="secondRow">
                    <div className="numberPP">{number}</div>
                    <div className="operation">{name}</div>
                    <div className="color">
                        <div className="label">Цвет:</div>
                        <div className="value">{color}</div>
                    </div>
                </div>
                <HeaderForm state={state} />
                {ROWDATA.map((item, index) => (
                    <TableRow key={index} data={item} />
                ))}
                <SignBlock />
            </div>
        </Wrapper>
    );
};
