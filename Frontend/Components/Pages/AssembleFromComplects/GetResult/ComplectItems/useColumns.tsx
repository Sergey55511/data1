import { ColumnsType } from 'antd/lib/table';
import { iData } from '../../../../../../Shared/Types/interfaces';
import { KEYSLEFTOVERS } from '../../../../Shared/Table/constants';

export const useColumns = () => {
    const getColumnItem = (key: keyof typeof KEYSLEFTOVERS) => {
        return { title: KEYSLEFTOVERS[key]?.title, dataIndex: key };
    };

    const res: ColumnsType<iData> = [
        getColumnItem('workpieceType'),
        getColumnItem('fullModel'),
        getColumnItem('sizeRange'),
        getColumnItem('color'),
        // getColumnItem('length'),
        getColumnItem('channel'),
        getColumnItem('grade'),
        getColumnItem('state'),
        // getColumnItem('model'),
        getColumnItem('type'),
        getColumnItem('lot'),
        getColumnItem('production'),
        getColumnItem('widthOut'),
        getColumnItem('countItemsOut'),
    ];

    return res;
};
