import { Title } from '../../Shared/Title';
import { useProps } from './useProps';
import { Wrapper } from './style';
import { SelectComplectIyems } from './SelectMinaret';
import { SelectComplect } from './SelectComplect';
import { GetResult } from './GetResult';
import { observer } from 'mobx-react-lite';
import { Tubs } from './Tubs';

export const AssembleFromComplects = observer(() => {
    const params = useProps();
    return (
        <Wrapper>
            <Title text="Комплектовка" />
            <Tubs {...params} />
            <div className="tableWrapperLeftovers">
                <SelectComplect
                    stateButton={params.stateButton}
                    complect={params.complect}
                    setComplect={params.setComplect}
                    dataProduct={params.dataProduct}
                />
                <SelectComplectIyems
                    stateButton={params.stateButton}
                    setComplectItems={params.setComplectItems}
                    complectItems={params.complectItems}
                    assembleLeftovers={params.assembleLeftovers}
                    complect={params.complect}
                />

                <GetResult
                    stateButton={params.stateButton}
                    complects={params.complect}
                    selectedRows={params.complectItems}
                    resetRootState={params.resetRootState}
                    setComplectItems={params.setComplectItems}
                    managerId={params.managerId}
                    setManagerId={params.setManagerId}
                    length={params.length}
                    setLength={params.setLength}
                    width={params.width}
                    setWidth={params.setWidth}
                    model={params.model}
                    setModel={params.setModel}
                />
            </div>
        </Wrapper>
    );
});
