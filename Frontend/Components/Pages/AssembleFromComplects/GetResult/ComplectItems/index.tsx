import { iDataProduct } from '../../../../../../Shared/Types/interfaces';
import { TableApp } from '../../../../Shared/Table';
import { Title } from '../../../../Shared/Title';
import { useColumns } from './useColumns';
import { useGetData } from './useGetData';

export const ComplectItems = ({ complects }: { complects: iDataProduct[] }) => {
    const columns = useColumns();
    const data = useGetData(complects);
    return (
        <div>
            <Title text="В комплекте" />
            <TableApp columns={columns} dataSource={data} pagination={false} />;
        </div>
    );
};
