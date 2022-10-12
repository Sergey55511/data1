import type { ColumnsType, TableProps } from 'antd/es/table';
import { getColumnProps } from '../../../../Shared/Table/Helpers/getColumnProps';
import { observer } from 'mobx-react-lite';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { FilterValue } from 'antd/es/table/interface';
import { TableApp } from '../../../../Shared/Table';
import { KEYSLEFTOVERS } from '../../../../Shared/Table/constants';
import { iDataIndex } from '..';
import { InputNumber } from '../../../../Shared/InputNumber';
import { InputField } from '../../../../Shared/InputField';
import { Wrapper } from './style';

export const TableMoveOut = observer(
    ({
        filters,
        setFilters,
        leftovers,
        selectRow,
        onChange,
    }: {
        filters: Record<string, FilterValue | null>;
        setFilters: Dispatch<SetStateAction<Record<string, FilterValue | null>>>;
        leftovers: iDataIndex[];
        selectRow: (i: number) => void;
        onChange: (
            record: iDataIndex,
            key: keyof iDataIndex,
            value: iDataIndex[keyof iDataIndex],
        ) => void;
    }) => {
        useEffect(() => {
            for (const item of leftovers) {
                if (!item.widthOut) onChange(item, 'widthOut', item.width);
                if (!item.countItemsOut)
                    onChange(item, 'countItemsOut', item.countItemsOut);
            }
        }, []);
        const data: iDataIndex[] = leftovers.map((item, index) => ({
            ...item,
            key: index,
        }));

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

        const columns: ColumnsType<iDataIndex> = [
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
                ...getColumnPropsHoc(KEYSLEFTOVERS.width.key),
                title: KEYSLEFTOVERS.width.title,
            },
            {
                ...getColumnPropsHoc(KEYSLEFTOVERS.count.key),
                title: KEYSLEFTOVERS.count.title,
            },
            {
                dataIndex: 'widthOut',
                title: 'Отгрузка гр.',
                width: '115px',
                render: (value, record) => {
                    return (
                        <InputF
                            value={value}
                            onChangeHandler={(v: any) => onChange(record, 'widthOut', v)}
                            isError={(record.width || 0) - (record.widthOut || 0) < 0}
                        />
                    );
                },
            },
            {
                dataIndex: 'countItemsOut',
                title: 'Отгрузка шт.',
                width: '115px',
                render: (value, record) => {
                    return (
                        <InputF
                            value={value}
                            onChangeHandler={(v: any) => onChange(record, 'countItemsOut', v)}
                            isError={(record.count || 0) - (record.countItemsOut || 0) < 0}
                        />
                    );
                },
            },
        ];

        const handleChange: TableProps<iDataIndex>['onChange'] = (
            _pagination,
            filters,
            _sorter,
        ) => {
            setFilters(filters);
            // setSortedInfo(sorter as SorterResult<DataType>);
        };

        return (
            <Wrapper>
               <TableApp
                onRow={(record: iDataIndex, _rowIndex) => {
                    return {
                        onDoubleClick: (_event) => {
                            selectRow(record.index!);
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

const InputF = ({
    value,
    onChangeHandler,
    isError,
}: {
    value: any;
    onChangeHandler: (v: any) => void;
    isError?: boolean;
}) => {
    return (
        <InputField isError={isError}>
            <InputNumber value={value} onChangeHandler={onChangeHandler} />
        </InputField>
    );
};
