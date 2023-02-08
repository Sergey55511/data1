import { observer } from 'mobx-react-lite';
import { ButtonGroup } from './buttonGroup';
import { Header } from './Header';
import { Wrapper } from './style';
import { TableLeftOvers } from './TableLeftovers';
import { TableMoveOut } from './TableMoveOut';
import { iProps, useProps } from './UseProps';

export const MoveOut = observer((props: iProps) => {
    const params = useProps(props);

    return (
        <Wrapper>
            <Header {...{ params, props }} />
            <ButtonGroup params={params} />
            <div>
                {params.buttonState == 'lefovers' && (
                    <TableLeftOvers
                        {...{
                            filters: params.filters,
                            setFilters: params.setFilters,
                            leftovers: params.data,
                            selectRow: params.selectRow,
                            rowSelection: params.rowSelection,
                        }}
                    />
                )}
                {params.buttonState == 'prepare' && (
                    <TableMoveOut
                        {...{
                            filters: params.filters,
                            setFilters: params.setFilters,
                            leftovers: params.moveOutData,
                            onChange: params.onChange,
                            removeRow: (i: number) =>
                                params.setSelectedRows((prev) => {
                                    const res = prev.filter((item) => item != i);
                                    return [...res];
                                }),
                            isInventory: params.isInventory,
                        }}
                    />
                )}
            </div>
        </Wrapper>
    );
});
