import { Badge, Radio } from 'antd';
import { FilterValue } from 'antd/es/table/interface';
import { useState } from 'react';
import { Title } from '../../Shared/Title';
import { AssembleCreate } from './Create';
import { Wrapper } from './style';

export const Assemble = ({ state }: { state: 'assembleCreate' | 'assembleGet' }) => {
    const [filters, setFilters] = useState<Record<string, FilterValue | null>>({});

    const countTasks = 0;
    return (
        <Wrapper>
            <Title text="Сборка" />
            <div className='buttonWrapper'>
                <Radio.Group
                    value={state}
                    // onChange={(e) => params.setButtonState(e.target.value)}
                >
                    <Radio.Button value="assembleCreate">Остаток</Radio.Button>
                    <Badge count={countTasks} size="small">
                        <Radio.Button value="assembleGet">
                            Принять результат работы
                        </Radio.Button>
                    </Badge>
                </Radio.Group>
            </div>
            <div>
                {state == 'assembleCreate' && (
                    <AssembleCreate {...{ filters, setFilters }} />
                )}
            </div>
        </Wrapper>
    );
};
