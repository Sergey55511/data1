import { Dispatch, SetStateAction } from 'react';
import { iData } from '../../../../../../Shared/Types/interfaces';
import { TableApp } from '../../../../Shared/Table';
import { Title } from '../../../../Shared/Title';
import { useColumns } from './useColumns';

export const NewItemsMoveOut = ({
    data,
    setMinaret,
}: {
    data: iData[];
    setMinaret: Dispatch<SetStateAction<iData[]>>;
}) => {
    const columns = useColumns({ setMinaret });
    return (
        <div>
            <Title text="Добавляеься в контент" />
            <TableApp columns={columns} dataSource={data} pagination={false} />;
        </div>
    );
};
