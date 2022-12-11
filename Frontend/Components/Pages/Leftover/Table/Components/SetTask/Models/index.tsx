import { Button, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Wrapper } from './style';
import { useState } from 'react';

interface iStateModel {
    id: number;
    model: string;
}

export const Models = () => {
    const [state, setState] = useState<iStateModel>({ id: 0, model: '' });

    return (
        <Wrapper>
            <h4>Модели</h4>
            <Input placeholder="Поиск" suffix={<SearchOutlined />} />
            <div className="modelsList">
                <div className="row" onClick={() => setState({ id: 0, model: 'hello' })}>
                    hello
                </div>
                <div className="row" onClick={() => setState({ id: 0, model: 'hello1' })}>
                    hello
                </div>
                <div className="row" onClick={() => setState({ id: 0, model: 'hello2' })}>
                    hello
                </div>
                <div className="row" onClick={() => setState({ id: 0, model: 'hello3' })}>
                    hello
                </div>
                <div className="row" onClick={() => setState({ id: 0, model: 'hello4' })}>
                    hello
                </div>
                <div className="row" onClick={() => setState({ id: 0, model: 'hello5' })}>
                    hello
                </div>
                <div className="row" onClick={() => setState({ id: 0, model: 'hello6' })}>
                    hello
                </div>
            </div>
            <div className="selectedModel">выбрана модель: {state.model}</div>
            <div>
                <Button type="primary">Сохранить</Button>
            </div>
        </Wrapper>
    );
};
