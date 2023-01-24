import { iData } from '../../../../../Shared/Types/interfaces';
import type { TableProps } from 'antd/es/table';
import { observer } from 'mobx-react-lite';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { FilterValue } from 'antd/es/table/interface';
import { MoveOutSoloHoc } from './Components/MoveOut';
import { TableApp } from '../../../Shared/Table';
import { useColumns } from './useСolumns';
import { WORKPIECETYPE } from '../../../../../Shared/constants';

export const TableLeftOvers = observer(
    ({
        filters,
        setFilters,
    }: {
        filters: Record<string, FilterValue | null>;
        setFilters: Dispatch<SetStateAction<Record<string, FilterValue | null>>>;
    }) => {
        const { columns, data } = useColumns(filters);
        const recordRef = useRef<iData | undefined>();
        const [isShowMoveOutSolo, setIsShowMoveOutSolo] = useState(false);

        const handleChange: TableProps<iData>['onChange'] = (
            _pagination,
            filters,
            _sorter,
        ) => {
            setFilters(filters);
            // setSortedInfo(sorter as SorterResult<DataType>);
        };

        return (
            <>
                {isShowMoveOutSolo && (
                    <MoveOutSoloHoc
                        record={recordRef.current!}
                        onClose={() => setIsShowMoveOutSolo(false)}
                    />
                )}
                <TableApp
                    onRow={(record) => {
                        return {
                            onDoubleClick: () => {
                                if (record.workpieceTypeId == WORKPIECETYPE.prunes.id)
                                    return;
                                recordRef.current = record;
                                setIsShowMoveOutSolo(true);
                            },
                        };
                    }}
                    columns={columns}
                    dataSource={data}
                    onChange={handleChange}
                />
            </>
        );
    },
);
