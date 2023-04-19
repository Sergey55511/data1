import { Wrapper } from './style';

export const HeaderForm = ({ state }: { state: string }) => {
    return (
        <Wrapper>
            <div className="firstTitleTable">
                <div className="moveOut">Что выдано</div>
                <div className="moveIn">Что сдано</div>
            </div>
            <div className="secondTitleTable">
                <div className="moveOut">
                    <div className="item">{state}</div>
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
        </Wrapper>
    );
};
