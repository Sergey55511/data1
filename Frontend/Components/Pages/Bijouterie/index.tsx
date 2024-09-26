import { observer } from 'mobx-react-lite';
import { useProps } from './useProps';
import { Wrapper } from './style';
import { TableLeftOvers } from './Table';
import { Title } from '../../Shared/Title';

export const Bijouterie = observer(() => {
    const { bijouterie, filters, setFilters, rowSelection, selectedRows } = useProps();

    return (
        <Wrapper>
            <Title text="Остатки бижутерия" />
            <div className="leftoversTableWrapperBijouterie">
                <TableLeftOvers
                    {...{ bijouterie, filters, setFilters, rowSelection, selectedRows }}
                />
            </div>
        </Wrapper>
    );
});
