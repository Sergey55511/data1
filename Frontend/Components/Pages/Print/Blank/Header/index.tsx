import { Button } from 'antd';
import { Wrapper } from './style';

export const HeaderPrintBlank = () => {
    return (
        <Wrapper>
            <div className="container">
                <div>Номер производства</div>
                <Button>Сформировать</Button>
                <Button type="primary">Распечатать</Button>
            </div>
        </Wrapper>
    );
};
