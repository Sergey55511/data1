import { Button, DatePicker, Input } from 'antd';
import moment from 'moment';
import { useState } from 'react';
import { Wrapper } from './style';

interface iState {
    date?: moment.Moment;
    widthIn?: number;
    losses?: number;
}
export const Wash = () => {
    const [state, setState] = useState<iState>({
        date: undefined,
        widthIn: undefined,
        losses: undefined,
    });

    return (
        <Wrapper>
            <Item title="Дата">
                <DatePicker
                    className="input"
                    value={state.date}
                    onChange={(v) =>
                        setState((prev) => ({ ...prev, date: v ?? undefined }))
                    }
                />
            </Item>
            <Item title="Результат гр.">
                <Input
                    type="number"
                    className="input"
                    value={state.widthIn}
                    onChange={(v) => {
                        const value = v.target.value;
                        setState((prev) => ({
                            ...prev,
                            widthIn: value ? +value : undefined,
                        }));
                    }}
                />
            </Item>
            <Item title="Потеря гр.">
                <Input
                    type="number"
                    className="input"
                    value={state.losses}
                    onChange={(v) => {
                        const value = v.target.value;
                        setState((prev) => ({
                            ...prev,
                            losses: value ? +value : undefined,
                        }));
                    }}
                />
            </Item>
            <Button type="primary">Созранить</Button>
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
