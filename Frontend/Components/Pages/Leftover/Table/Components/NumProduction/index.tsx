import { Button, Divider, Input } from 'antd';
import { observer } from 'mobx-react-lite';
import { Wrapper } from './style';
import { SearchOutlined } from '@ant-design/icons';

export const NumProduction = observer(() => {
    return (
        <Wrapper>
            <Input placeholder="Поиск" allowClear suffix={<SearchOutlined />} />
            <Divider />
            <div className="list">
                <div className="item">
                    <span className="number">1</span>
                    {' - '}
                    <span className="description">asdasdasd</span>
                </div>
                <div className="item">
                    <span className="number">1</span>
                    {' - '}
                    <span className="description">asdasdasd</span>
                </div>
                <div className="item">
                    <span className="number">1</span>
                    {' - '}
                    <span className="description">asdasdasd</span>
                </div>
                <div className="item">
                    <span className="number">1</span>
                    {' - '}
                    <span className="description">asdasdasdssssssssssssssssssssssss ssssssssssswwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww</span>
                </div>
            </div>
            <Divider />
            <div className="newPP">
                <h3>Создать</h3>
                <div className="descriprion">
                    <Input.TextArea rows={4} placeholder="Описание производства" />
                </div>
                <Button type="primary">Создать</Button>
            </div>
        </Wrapper>
    );
});
