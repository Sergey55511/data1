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
                    <TableRow
                        data={{
                            moveOut: [
                                { value: '+6,6-7,59' },
                                { value: 'от 15,0 до 24,99' },
                                { value: '' },
                                { value: '1076.3', class: 'gray' },
                            ],
                            moveIn: [
                                { value: '+6,6-7,59' },
                                { value: '15.0' },
                                { value: '' },
                                { value: '', class: 'gray' },
                            ],
                        }}
                    />
                    <TableRow
                        data={{
                            moveOut: [
                                { value: '' },
                                { value: 'от 15,0 до 24,99' },
                                { value: '' },
                                { value: '293.4', class: 'gray' },
                            ],
                            moveIn: [
                                { value: 'Обрезки' },
                                { value: '' },
                                { value: '' },
                                { value: '', class: 'gray' },
                            ],
                        }}
                    />
                    <TableRow
                        data={{
                            moveOut: [
                                { value: '' },
                                { value: '' },
                                { value: '' },
                                { value: '', class: 'gray' },
                            ],
                            moveIn: [
                                { value: 'Брак' },
                                { value: '' },
                                { value: '' },
                                { value: '', class: 'gray' },
                            ],
                        }}
                    />
                    <TableRow
                        data={{
                            moveOut: [
                                { value: '' },
                                { value: '' },
                                { value: '' },
                                { value: '', class: 'gray' },
                            ],
                            moveIn: [
                                { value: 'Итого, кг:', class: 'gray' },
                                { value: '', class: 'gray' },
                                { value: '', class: 'gray' },
                                { value: '', class: 'gray' },
                            ],
                        }}
                    />
                    <TableRow
                        data={{
                            moveOut: [
                                { value: '' },
                                { value: '' },
                                { value: '' },
                                { value: '', class: 'gray' },
                            ],
                            moveIn: [
                                { value: 'Возврат', class: 'gray' },
                                { value: '', class: 'gray' },
                                { value: '' },
                                { value: '' },
                            ],
                        }}
                    />
                    <TableRow
                        data={{
                            moveOut: [
                                { value: '' },
                                { value: '' },
                                { value: '' },
                                { value: '', class: 'gray' },
                            ],
                            moveIn: [
                                { value: 'Фракция', class: 'gray' },
                                { value: 'Вес, кг.', class: 'gray' },
                                { value: '' },
                                { value: '' },
                            ],
                        }}
                    />
                    <TableRow
                        data={{
                            moveOut: [
                                { value: '' },
                                { value: '' },
                                { value: '' },
                                { value: '', class: 'gray' },
                            ],
                            moveIn: [
                                { value: '' },
                                { value: '' },
                                { value: '' },
                                { value: '' },
                            ],
                        }}
                    />
                </div>
            </Wrapper>
        </>
    );
};
