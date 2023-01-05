import { Badge, Button, Radio } from 'antd';
import { Title } from '../../Shared/Title';
import { AssembleCreate } from './Create';
import { AssembleGet } from './Get';
import { Wrapper } from './style';
import { useProps } from './useProps';

export const Assemble = () => {
    const params = useProps();

    return (
        <Wrapper>
            <Title text="Сборка" />
            <div className="buttonWrapper">
                <Radio.Group
                    value={params.stateButton}
                    onChange={(e) => params.setStateButton(e.target.value)}
                >
                    <Radio.Button value="assembleCreate">Остаток</Radio.Button>
                    <Badge count={params.countTasks} size="small">
                        <Radio.Button value="assembleGet">
                            Принять результат работы
                        </Radio.Button>
                    </Badge>
                </Radio.Group>

                <Button
                    type="primary"
                    disabled={params.isDisabled}
                    onClick={params.submitHandler}
                    loading={
                        params.data.submitHandler.isLoading ||
                        params.data.getResult.isLoading
                    }
                >
                    Сохранить
                </Button>
            </div>
            <div>
                {params.stateButton == 'assembleCreate' && (
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
                )}
            </div>
        </Wrapper>
    );
};