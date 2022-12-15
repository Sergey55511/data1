import { Button, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Wrapper } from './style';
import { iDataProps } from '../useProps';
import { iProps, useProps } from './useProps';
import { Task } from '../../MoveOut/useProps';

export const Models = (props: iProps) => {
    const params = useProps(props);

    return (
        <Wrapper>
            <h4>Модели</h4>
            <Input
                value={params.search}
                onChange={(e) => {
                    params.setSearch(e.target.value);
                }}
                placeholder="Поиск"
                suffix={<SearchOutlined />}
                allowClear
            />
            <div className="modelsList">
                {params.dataFiltred?.map((item) => {
                    const className = item.id == params.state.id ? 'row selected' : 'row';
                    return (
                        <div
                            key={item.id}
                            className={className}
                            onClick={() =>
                                params.setState({ id: item.id, model: item.fullModel })
                            }
                        >
                            {item.fullModel}
                        </div>
                    );
                })}
            </div>
            <div className="selectedModel">выбрана модель: {params.state.model}</div>
            <div>
                <Button
                    type="primary"
                    disabled={!params.state.id}
                    onClick={params.SubmitHandler}
                >
                    Сохранить
                </Button>
            </div>
        </Wrapper>
    );
};
