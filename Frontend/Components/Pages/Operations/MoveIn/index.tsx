import { TableProps } from 'antd';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { iShared } from '../../../../../Shared/Types/interfaces';
import { useStores } from '../../../../Store/useStores';
import { TableApp } from '../../../Shared/Table';
import { getColumnProps } from '../../../Shared/Table/Helpers/getColumnProps';
import { Title } from '../../../Shared/Title';
import { Wrapper } from './style';
import { ColumnsType, FilterValue } from 'antd/es/table/interface';
import { KEYSLEFTOVERS } from '../../../Shared/Table/constants';
import moment from 'moment';

export const MoveIn = observer(() => {
    const [filters, setFilters] = useState<Record<string, FilterValue | null>>({});
    const { ListsStore, loginStore } = useStores();
    useEffect(() => {
        if (loginStore.user.storeId) ListsStore.getShared(loginStore.user.storeId);
    }, [loginStore.user.storeId]);

    const handleChange: TableProps<iShared>['onChange'] = (
        _pagination,
        filters,
        _sorter,
    ) => {
        setFilters(filters);
        // setSortedInfo(sorter as SorterResult<DataType>);
    };

    const data = ListsStore.shared.map((item, index) => ({
        ...item,
        date: moment(item.date).format('DD.MM.YYYY'),
        key: index,
    }));

    const filteredData = data.filter((item) => {
        for (const key in item) {
            const value: any = item[key as keyof typeof item];
            if (filters[key]?.length) {
                if (!filters[key]?.includes(value)) {
                    return false;
                }
            }
        }
        return true;
    });
    const getColumnPropsHoc = (dataIndex: string) =>
        getColumnProps(dataIndex, filteredData, filters);

    const columns: ColumnsType<iShared> = [
        {
            ...getColumnPropsHoc(KEYSLEFTOVERS.date.key),
            title: 'Дата',
        },
        {
            ...getColumnPropsHoc(KEYSLEFTOVERS.user.key),
            title: 'Отправил',
        },
        {
            ...getColumnPropsHoc(KEYSLEFTOVERS.store.key),
            title: 'Отправитель',
        },
        {
            ...getColumnPropsHoc(KEYSLEFTOVERS.numDocument.key),
            title: 'Номер документа',
        },
        {
            dataIndex: 'countRows',
            title: 'Кол-во позиций',
        },
    ];

    return (
        <Wrapper>
            <Title text="Приход перемещение" />
            <TableApp
                // onRow={(record, rowIndex) => {
                //     return {
                //         onDoubleClick: (event) => {
                //             MyDrawer({
                //                 title: 'Выдать в работу',
                //                 content: <MoveOutSolo record={record} />,
                //             });
                //         },
                //     };
                // }}
                columns={columns}
                dataSource={data}
                onChange={handleChange}
            />
        </Wrapper>
    );
});
