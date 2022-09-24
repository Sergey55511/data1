import { Drawer, Input, Table } from 'antd';
import { iLeftovers } from '../../../../../Shared/Types/interfaces';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { getColumnProps } from '../Helpers/getColumnProps';
import { KEYSLEFTOVERS } from './constants';
import { useStores } from '../../../../Store/useStores';
import { observer } from 'mobx-react-lite';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FilterValue } from 'antd/es/table/interface';
import { Wrapper } from './style';
import { MyDrawer } from '../../../Shared/MyDrawer';
import { MoveOutSolo } from './Components/MoveOut';

export const TableLeftOvers = observer(
    ({
        filters,
        setFilters,
    }: {
        filters: Record<string, FilterValue | null>;
        setFilters: Dispatch<SetStateAction<Record<string, FilterValue | null>>>;
    }) => {
        const { OperationStore, loginStore } = useStores();
        const { leftovers } = OperationStore;

        useEffect(() => {
            if (loginStore.user.storeId)
                OperationStore.getLeftovers(loginStore.user.storeId);
        }, [loginStore.user.storeId]);

        const data = leftovers.map((item, index) => ({ ...item, key: index }));

        const filteredleftovers = leftovers.filter((item) => {
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
            getColumnProps(dataIndex, filteredleftovers, filters);

        const columns: ColumnsType<iLeftovers> = [
            {
                ...getColumnPropsHoc(KEYSLEFTOVERS.workpieceType.key),
                title: KEYSLEFTOVERS.workpieceType.title,
            },
            {
                ...getColumnPropsHoc(KEYSLEFTOVERS.model.key),
                title: KEYSLEFTOVERS.model.title,
            },
            {
                ...getColumnPropsHoc(KEYSLEFTOVERS.sizeRange.key),
                title: KEYSLEFTOVERS.sizeRange.title,
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
                ...getColumnPropsHoc(KEYSLEFTOVERS.state.key),
                title: KEYSLEFTOVERS.state.title,
            },
            {
                ...getColumnPropsHoc(KEYSLEFTOVERS.lot.key),
                title: KEYSLEFTOVERS.lot.title,
            },
            {
                ...getColumnPropsHoc(KEYSLEFTOVERS.width.key),
                title: KEYSLEFTOVERS.width.title,
            },
            {
                ...getColumnPropsHoc(KEYSLEFTOVERS.count.key),
                title: KEYSLEFTOVERS.count.title,
            },
            // {
            //     title: 'Выдать гр.',
            //     dataIndex: 'widthOut',
            //     width: '90px',
            //     render: (_text, _record, index) => {
            //         return (
            //             <InputWidth
            //                 widthOutAll={widthOut}
            //                 widthOut={widthOut[index]}
            //                 index={index}
            //                 fieldName="width"
            //                 setWidthOut={setWidthOut}
            //             />
            //         );
            //     },
            // },
            // {
            //     title: 'Выдать шт.',
            //     dataIndex: 'countOut',
            //     width: '90px',
            //     render: () => <Input />,
            // },
        ];

        const handleChange: TableProps<iLeftovers>['onChange'] = (
            _pagination,
            filters,
            _sorter,
        ) => {
            setFilters(filters);
            // setSortedInfo(sorter as SorterResult<DataType>);
        };

        return (
            <Wrapper>
                <Table
                    onRow={(record, rowIndex) => {
                        return {
                            onDoubleClick: (event) => {
                                MyDrawer({
                                    title: 'Выдать в работу',
                                    content: <MoveOutSolo record={record} />,
                                });
                            },
                        };
                    }}
                    columns={columns}
                    dataSource={data}
                    onChange={handleChange}
                />
            </Wrapper>
        );
    },
);
