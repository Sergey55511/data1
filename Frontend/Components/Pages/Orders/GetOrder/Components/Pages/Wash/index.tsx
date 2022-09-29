import { DatePicker, Input } from 'antd';
import { Wrapper } from './style';

export const Wash = () => {
    return (
        <Wrapper>
            <Item title="Дата">
                <DatePicker />
            </Item>
            <Item title="Результат гр.">
                <Input type="number" />
            </Item>
            <Item title="Потеря гр.">
                <Input type="number" />
            </Item>
        </Wrapper>
    );
};

const Item = ({ title, children }: { title: string; children: JSX.Element }) => {
    return (
        <div className="item">
            <h4>{title}</h4>
            {children}
        </div>
    );
};
