import { Input } from 'antd';
import { Wrapper } from './style';

export const Sorting = () => {
    return (
        <Wrapper>
            <div className="row">
                <div className="item">
                    <Input placeholder="hello" />
                </div>
                <div className="item">
                    <Input />
                </div>
                <div className="item">
                    <Input />
                </div>
            </div>
        </Wrapper>
    );
};
