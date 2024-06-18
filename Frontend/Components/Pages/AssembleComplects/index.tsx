import { Badge, Radio } from 'antd';
import { Title } from '../../Shared/Title';
import { eTypeButton, useProps } from './useProps';
import { Wrapper } from './style';
import { SelectMinaret } from './SelectMinaret';
import { SelectComplect } from './SelectComplect';
import { GetResult } from './GetResult';

export const AssembleComplects = () => {
    const params = useProps();
    return (
        <Wrapper>
            <Title text="Комплектовка" />
            <div className="buttonWrapper">
                <div className="leftButtons">
                    <Radio.Group
                        value={params.stateButton}
                        onChange={(e) => params.setStateButton(e.target.value)}
                    >
                        <Badge
                            dot={params.isSelectedComplect}
                            color="green"
                            style={{ zIndex: 1 }}
                        >
                            <Radio.Button value={eTypeButton.complects}>
                                Комплекты
                            </Radio.Button>
                        </Badge>
                        <Badge
                            dot={params.isSelectedMinaret}
                            color="green"
                            style={{ zIndex: 1 }}
                        >
                            <Radio.Button value={eTypeButton.minarets}>
                                Минареты
                            </Radio.Button>
                        </Badge>
                        <Radio.Button
                            value={eTypeButton.getResult}
                            disabled={params.disabledGetResult}
                        >
                            Получить результат
                        </Radio.Button>
                    </Radio.Group>
                </div>
            </div>
            <div className="tableWrapperLeftovers">
                <SelectComplect
                    stateButton={params.stateButton}
                    complect={params.complect}
                    setComplect={params.setComplect}
                />
                <SelectMinaret
                    stateButton={params.stateButton}
                    setMinaret={params.setMinaret}
                    minaret={params.minaret}
                />

                <GetResult
                    stateButton={params.stateButton}
                    complects={params.complect}
                    minarets={params.minaret}
                    resetRootState={params.resetRootState}
                />
            </div>
        </Wrapper>
    );
};
