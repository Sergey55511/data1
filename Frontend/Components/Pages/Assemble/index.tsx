import { Badge, Radio } from 'antd';
import { FilterValue } from 'antd/es/table/interface';
import { useState } from 'react';
import { iData } from '../../../../Shared/Types/interfaces';
import { Title } from '../../Shared/Title';
import { AssembleCreate } from './Create';
import { AssembleGet } from './Get';
import { Wrapper } from './style';

export const Assemble = () => {
    const [filters, setFilters] = useState<Record<string, FilterValue | null>>({});
    const [state, setState] = useState<'assembleCreate' | 'assembleGet'>(
        'assembleCreate',
    );
    const [selectedRows, setSelectedRows] = useState<iData[]>([]);

    const countTasks = selectedRows.length;
    return (
        <Wrapper>
            <Title text="Сборка" />
            <div className="buttonWrapper">
                <Radio.Group value={state} onChange={(e) => setState(e.target.value)}>
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
                    <AssembleCreate {...{ filters, setFilters, setSelectedRows }} />
                )}
                {state == 'assembleGet' && (
                    <AssembleGet {...{ selectedRows, setSelectedRows }} />
                )}
            </div>
        </Wrapper>
    );
};
