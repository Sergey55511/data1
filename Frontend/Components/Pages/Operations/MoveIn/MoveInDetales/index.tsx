import { Button, Input } from 'antd';
import { ColumnsType, TableProps } from 'antd/es/table';
import { FilterValue } from 'antd/es/table/interface';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { iData, iDataTable } from '../../../../../../Shared/Types/interfaces';
import { useStores } from '../../../../../Store/useStores';
import { InputNumber } from '../../../../Shared/InputNumber';
import { TableApp } from '../../../../Shared/Table';
import { KEYSLEFTOVERS } from '../../../../Shared/Table/constants';
import { getColumnProps } from '../../../../Shared/Table/Helpers/getColumnProps';
import { Title } from '../../../../Shared/Title';
import { Wrapper } from './style';

export const MoveInDetales = observer(() => {
    const { ListsStore, loginStore } = useStores();
    const [filters, setFilters] = useState<Record<string, FilterValue | null>>({});
    const [data, setData] = useState<iDataTable[]>([]);
    const router = useRouter();
    const numDocument = router.query.numDocument;

    useEffect(() => {
        if (loginStore.user.storeId && numDocument) {
            (async () => {
                let newData: iData[] = await ListsStore.getMoveIn(
                    loginStore.user.storeId,
                    numDocument as string,
                );

                newData = newData.map((item) => ({
                    ...item,
                    widthIn: item.widthOut,
                    countItemsIn: item.countItemsOut,
                }));
                setData(newData ? newData : []);
            })();
        }
    }, [loginStore.user.storeId, numDocument]);

    const handleChange: TableProps<iData>['onChange'] = (
        _pagination,
        filters,
        _sorter,
    ) => {
        setFilters(filters);
        // setSortedInfo(sorter as SorterResult<DataType>);
    };

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

    const columns: ColumnsType<iData> = [
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
            ...getColumnPropsHoc(KEYSLEFTOVERS.workpieceType.key),
            title: KEYSLEFTOVERS.workpieceType.title,
        },
        {
            ...getColumnPropsHoc(KEYSLEFTOVERS.state.key),
            title: KEYSLEFTOVERS.state.title,
        },
        {
            ...getColumnPropsHoc(KEYSLEFTOVERS.model.key),
            title: KEYSLEFTOVERS.model.title,
        },
        {
            ...getColumnPropsHoc(KEYSLEFTOVERS.fraction.key),
            title: KEYSLEFTOVERS.fraction.title,
        },
        {
            ...getColumnPropsHoc(KEYSLEFTOVERS.materialGroup.key),
            title: KEYSLEFTOVERS.materialGroup.title,
        },
        {
            ...getColumnPropsHoc(KEYSLEFTOVERS.color.key),
            title: KEYSLEFTOVERS.color.title,
        },
        {
            ...getColumnPropsHoc(KEYSLEFTOVERS.length.key),
            title: KEYSLEFTOVERS.length.title,
        },
        {
            ...getColumnPropsHoc(KEYSLEFTOVERS.channel.key),
            title: KEYSLEFTOVERS.channel.title,
        },
        {
            ...getColumnPropsHoc(KEYSLEFTOVERS.grade.key),
            title: KEYSLEFTOVERS.grade.title,
        },
        {
            ...getColumnPropsHoc(KEYSLEFTOVERS.lot.key),
            title: KEYSLEFTOVERS.lot.title,
        },
        {
            ...getColumnPropsHoc(KEYSLEFTOVERS.productionId.key),
            title: KEYSLEFTOVERS.productionId.title,
        },
        {
            ...getColumnPropsHoc(KEYSLEFTOVERS.widthOut.key),
            title: KEYSLEFTOVERS.widthOut.title,
        },
        {
            ...getColumnPropsHoc(KEYSLEFTOVERS.countItemsOut.key),
            title: KEYSLEFTOVERS.countItemsOut.title,
        },
        {
            dataIndex: 'widthIn',
            render: (_value, record) => {
                return (
                    <InputNumber
                        value={record.widthIn}
                        onChangeHandler={(v) => console.log(v)}
                    />
                );
            },
            title: 'Приянть гр.',
            width: 100,
        },
        {
            dataIndex: 'countItemsIn',
            render: () => {
                return <InputNumber value={0} onChangeHandler={(v) => console.log(v)} />;
            },
            title: 'Приянть шт.',
            width: 100,
        },
    ];
    return (
        <Wrapper>
            <div className="header">
                <Title text={`Принять перемещение №${numDocument}`} />
                <Button type="primary">Принять</Button>
            </div>
            <TableApp
                // onRow={(record, _rowIndex) => {
                //     return {
                //         onDoubleClick: (_event) => {
                //             router.push(`/operations/movein/${record.numDocument}`)
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
