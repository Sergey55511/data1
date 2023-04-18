import { ROWDATA } from './constants';
import { Wrapper } from './style';
import { SignBlock } from '../../Components/SignBlock';
import { TableRow } from '../../Components/TableRow';
import { HeaderForm } from '../../Components/HeaderForm';

export const Slicing = () => {
    return (
        <Wrapper>
            <div className="container">
                <div className="firstRow">
                    <div className="firstRowItem">
                        <div className="label">Модель:</div>
                        <div className="value">TT_6</div>
                    </div>
                    <div className="firstRowItem">
                        <div className="label">Длина, мм.:</div>
                        <div className="value">15.0</div>
                    </div>
                    <div className="firstRowItem">
                        <div className="label">Отверстие, мм.:</div>
                        <div className="value">0.8</div>
                    </div>
                    <div className="firstRowItem">
                        <div className="label">№</div>
                        <div className="value">817</div>
                    </div>
                </div>
                <div className="secondRow">
                    <div className="numberPP">6208</div>
                    <div className="operation">Распиливание</div>
                    <div className="color">
                        <div className="label">Цвет:</div>
                        <div className="value">прозр.</div>
                    </div>
                </div>
                <HeaderForm state="Заготовка" />
                {ROWDATA.map((item, index) => (
                    <TableRow key={index} data={item} />
                ))}
                <SignBlock />
            </div>
        </Wrapper>
    );
};
