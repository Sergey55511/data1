import { Button, Badge, Radio } from 'antd';
import { Wrapper } from './style';
import { useProps as usePropsRoot, eTypeButton } from '../useProps';
import { useProps } from './UseProps';

export const Tubs = (props: ReturnType<typeof usePropsRoot>) => {
    const { subbmitMutation } = useProps(props);
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
                <Button
                    type="primary"
                    loading={subbmitMutation.isLoading}
                    onClick={() => subbmitMutation.mutate()}
                >
                    Сохранить
                </Button>
            </div>
        </Wrapper>
    );
};
