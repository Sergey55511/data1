import { Dispatch, SetStateAction } from 'react';
import { iData } from '../../../../../Shared/Types/interfaces';
import { TableApp } from '../../../Shared/Table';
import { eTypeButton } from '../useProps';
import { Wrapper } from './style';
import { useProps } from './useProps';

export const SelectMinaret = ({
    stateButton,
    minaret,
    setMinaret,
}: {
    stateButton: eTypeButton;
    minaret: iData[];
    setMinaret: Dispatch<SetStateAction<iData[]>>;
}) => {
    const params = useProps(minaret, setMinaret);
    if (stateButton != eTypeButton.minarets) return null;

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
};
