import { Button } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { Wrapper } from './style';
import { iManager } from '../../../../../../../../../../Shared/Types/interfaces';

export const Row = ({ manager }: { manager: iManager }) => {
    const active = true;
    return (
        <Wrapper>
            <div className="name">{manager.name}</div>
            <Button
                type="text"
                icon={manager.active ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                // loading={loadings[2]}
                onClick={() => console.log('hello')}
            />
        </Wrapper>
    );
};
