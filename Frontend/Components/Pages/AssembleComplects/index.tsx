import { Badge, Radio } from 'antd';
import { Title } from '../../Shared/Title';
import { eTypeButton, useProps } from './useProps';
import { Wrapper } from './style';
import { SelectMinaret } from './SelectMinaret';

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
                        <Badge dot={true} color="green" style={{ zIndex: 1 }}>
                            <Radio.Button value={eTypeButton.complects}>
                                Комплекты
                            </Radio.Button>
                        </Badge>
                        <Badge dot={true} color="green" style={{ zIndex: 1 }}>
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
                <SelectMinaret
                    stateButton={params.stateButton}
                    setMinaret={params.setMinaret}
                    minaret={params.minaret}
                />
                <div>{params.stateButton}</div>
                {/* {params.stateButton == 'assembleCreate' && (
                    <AssembleCreate
                        filters={params.filters}
                        setFilters={params.setFilters}
                        setSelectedRows={params.setSelectedRows}
                        selectedRows={params.selectedRows}
                    />
                )}
                {params.stateButton == 'assembleGet' && (
                    <AssembleGet
                        selectedRows={params.selectedRows}
                        setSelectedRows={params.setSelectedRows}
                        state={params.state}
                        setState={params.setState}
                        model={params.model}
                        setModel={params.setModel}
                    />
                )} */}
            </div>
        </Wrapper>
    );
};
