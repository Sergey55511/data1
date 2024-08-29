import { Dispatch, SetStateAction } from 'react';
import { iData } from '../../../../../../Shared/Types/interfaces';
import { TableApp } from '../../../../Shared/Table';
import { useColumns } from './useColumns';

export const NewItemsMoveOut = ({
    data,
    setMinaret,
}: {
    data: iData[];
    setMinaret: Dispatch<SetStateAction<iData[]>>;
}) => {
    const columns = useColumns({ setMinaret });
    return <TableApp columns={columns} dataSource={data} />;
};
