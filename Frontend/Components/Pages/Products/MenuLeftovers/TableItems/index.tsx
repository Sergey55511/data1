import { Table } from 'antd';
import { iDataProduct } from '../../../../../../Shared/Types/interfaces';
import type { ColumnsType } from 'antd/es/table';

interface iData {
    articleId?: number;
    model?: string;
}
export const ListModels = ({ selectedRows }: { selectedRows: iDataProduct[] }) => {
    const data: iData[] = selectedRows.map((item, index) => ({
        key: index,
        articleId: item.articleId,
        model: item.model,
    }));

    const columns: ColumnsType<iData> = [
        {
            title: '№',
            dataIndex: 'articleId',
            width: 50,
        },
        {
            title: 'Модель',
            dataIndex: 'model',
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={data}
            scroll={{ y: 200 }}
            size="small"
            pagination={false}
        />
    );
};
