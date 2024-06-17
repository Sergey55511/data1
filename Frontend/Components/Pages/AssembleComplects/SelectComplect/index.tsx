import { observer } from 'mobx-react-lite';
import { Dispatch, SetStateAction } from 'react';
import { iDataProduct } from '../../../../../Shared/Types/interfaces';
import { TableApp } from '../../../Shared/Table';
import { eTypeButton } from '../useProps';
import { Wrapper } from './style';
import { useProps } from './useProps';

export const SelectComplect = observer(
    ({
        complect,
        setComplect,
        stateButton,
    }: {
        stateButton: eTypeButton;
        complect?: iDataProduct[];
        setComplect: Dispatch<SetStateAction<iDataProduct[]>>;
    }) => {
        const params = useProps({ complect, setComplect });
        if (stateButton != eTypeButton.complects) return null;

        return (
            <Wrapper>
                <TableApp
                    rowSelection={params.rowSelection}
                    columns={params.columns}
                    dataSource={params.data}
                    onChange={params.handleChange}
                />
            </Wrapper>
        );
    },
);
