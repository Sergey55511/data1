import { Button, Badge, Radio } from 'antd';
import { Wrapper } from './style';
import { useProps, eTypeButton } from '../useProps';

export const Tubs = (props: ReturnType<typeof useProps>) => {
    return (
        <Wrapper>
            <div className="leftButtons">
                <Radio.Group
                    value={props.stateButton}
                    onChange={(e) => props.setStateButton(e.target.value)}
                >
                    <Badge
                        dot={props.isSelectedComplect}
                        color="green"
                        style={{ zIndex: 1 }}
                    >
                        <Radio.Button value={eTypeButton.complects}>
                            Комплекты
                        </Radio.Button>
                    </Badge>
                    <Badge
                        dot={props.isSelectedMinaret}
                        color="green"
                        style={{ zIndex: 1 }}
                    >
                        <Radio.Button value={eTypeButton.complectIyems}>
                            Комплектующие
                        </Radio.Button>
                    </Badge>
                    <Radio.Button
                        value={eTypeButton.getResult}
                        disabled={props.disabledGetResult}
                    >
                        Получить результат!
                    </Radio.Button>
                </Radio.Group>
            </div>
            <div>
                <Button type="primary">Сохранить</Button>
            </div>
        </Wrapper>
    );
};
