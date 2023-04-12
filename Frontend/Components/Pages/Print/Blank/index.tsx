import { ROWDATA, SIGNROWDATA } from './constants';
import { HeaderPrintBlank } from './Header';
import { Wrapper } from './style';
import { TableRow } from './TableRow';

export const PrintBlank = () => {
    return (
        <>
            <HeaderPrintBlank />
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
                    <div className="firstTitleTable">
                        <div className="moveOut">Что выдано</div>
                        <div className="moveIn">Что сдано</div>
                    </div>
                    <div className="secondTitleTable">
                        <div className="moveOut">
                            <div className="item">Заготовка</div>
                            <div className="item">Длина мм.</div>
                            <div className="item">Цвет</div>
                            <div className="item">Вес, гр.</div>
                        </div>
                        <div className="moveIn">
                            <div className="item">распиленная</div>
                            <div className="item">Длина мм.</div>
                            <div className="item">Цвет</div>
                            <div className="item">Вес, гр.</div>
                        </div>
                    </div>
                    {ROWDATA.map((item, index) => (
                        <TableRow key={index} data={item} />
                    ))}
                    {SIGNROWDATA.map((item, index) => (
                        <TableRow key={index} data={item} />
                    ))}
                </div>
            </Wrapper>
        </>
    );
};
