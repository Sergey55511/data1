import { Badge, Button, Popover, Radio } from 'antd';
import { eTypeAssemble } from '../../../../Shared/Types/interfaces';
import { Title } from '../../Shared/Title';
import { AssembleCreate } from './Create';
import { AssembleGet } from './Get';
import { Wrapper } from './style';
import { useProps } from './useProps';

export const Assemble = ({
    stateId,
    stateResultId,
    typeAssemble,
}: {
    stateId: number[];
    stateResultId: number;
    typeAssemble?: eTypeAssemble;
}) => {
    const params = useProps({ stateResultId });

    return (
        <Wrapper>
            <Title text="Сборка" />
            <div className="buttonWrapper">
                <div className="leftButtons">
                    <Radio.Group
                        value={params.stateButton}
                        onChange={(e) => params.setStateButton(e.target.value)}
                    >
                        <Radio.Button value="assembleCreate">Остаток</Radio.Button>
                        <Badge count={params.countTasks} size="small">
                            <Radio.Button
                                value="assembleGet"
                                disabled={!params.countTasks}
                            >
                                Принять результат работы
                            </Radio.Button>
                        </Badge>
                    </Radio.Group>
                    {params.stateButton == 'assembleGet' && (
                        <div>Потери: {params.state.losses.value}</div>
                    )}
                </div>
                {params.stateButton == 'assembleCreate' && (
                    <Button type="link" onClick={() => params.setFilters({})}>
                        Очистить фильтры
                    </Button>
                )}
                {params.stateButton == 'assembleGet' && (
                    <Badge count={params.errorText ? '!' : ''}>
                        <Popover
                            open={params.errorText ? undefined : false}
                            title={'Ошибка'}
                            content={params.errorText}
                            placement="bottomLeft"
                        >
                            <Button
                                type="primary"
                                disabled={params.isDisabled}
                                onClick={params.submitHandler}
                                loading={params.data.submitHandler.isLoading}
                            >
                                Сохранить
                            </Button>
                        </Popover>
                    </Badge>
                )}
            </div>
            <div className="tableWrapperLeftovers">
                {params.stateButton == 'assembleCreate' && (
                    <AssembleCreate
                        filters={params.filters}
                        setFilters={params.setFilters}
                        setSelectedRows={params.setSelectedRows}
                        selectedRows={params.selectedRows}
                        stateId={stateId}
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
                        typeAssemble={typeAssemble}
                    />
                )}
            </div>
        </Wrapper>
    );
};
