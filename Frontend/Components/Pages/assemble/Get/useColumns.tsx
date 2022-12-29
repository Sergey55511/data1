import { iData } from '../../../../../Shared/Types/interfaces';
import type { ColumnsType } from 'antd/es/table';
import { FilterValue } from 'antd/es/table/interface';
import { getColumnProps } from '../../../Shared/Table/Helpers/getColumnProps';
import { KEYSLEFTOVERS } from '../../../Shared/Table/constants';
import { getFilteredleftovers } from '../../../Shared/Table/Helpers/getFilteredleftovers';
import { InputNumber, tValue } from '../../../Shared/InputNumber';
import { SetStateAction } from 'react';

export const useColumns = ({
    data,
    filters,
    setValue,
}: {
    data?: iData[];
    filters: Record<string, FilterValue | null>;
    setValue: (index: number, key: string, value: tValue) => void;
}) => {
    const filteredleftovers = getFilteredleftovers({ data, filters });

    const getColumnPropsHoc = (dataIndex: typeof KEYSLEFTOVERS.workpieceType) => {
        return {
            ...getColumnProps(dataIndex.key, filteredleftovers, filters),
            title: dataIndex.title,
        };
    };

    const setValueHandler = (index: number, key: string, value: tValue, row: iData) => {
        type tKeyIdata = keyof iData;
        const prevValue = row[key as tKeyIdata] || '';

        let valRow = 0;
        if (key == KEYSLEFTOVERS.widthOut.key) {
            valRow = row[KEYSLEFTOVERS.width.key as tKeyIdata];
        }
        if (key == KEYSLEFTOVERS.countItemsOut.key) {
            valRow = row[KEYSLEFTOVERS.count.key as tKeyIdata];
        }
        if (key == KEYSLEFTOVERS.defect.key) {
            valRow = row[KEYSLEFTOVERS.width.key as tKeyIdata];
        }

        const vNum = value ? +value : 0;

        if (vNum < 0) {
            setValue(index, key, prevValue);
            return;
        }
        if (vNum > +valRow) {
            setValue(index, key, prevValue);
            return;
        }

        setValue(index, key, value);
    };

    const columns: ColumnsType<iData> = [
        getColumnPropsHoc(KEYSLEFTOVERS.workpieceType),
        getColumnPropsHoc(KEYSLEFTOVERS.fullModel),
        getColumnPropsHoc(KEYSLEFTOVERS.sizeRange),
        getColumnPropsHoc(KEYSLEFTOVERS.color),
        getColumnPropsHoc(KEYSLEFTOVERS.length),
        getColumnPropsHoc(KEYSLEFTOVERS.channel),
        getColumnPropsHoc(KEYSLEFTOVERS.grade),
        getColumnPropsHoc(KEYSLEFTOVERS.state),
        getColumnPropsHoc(KEYSLEFTOVERS.lot),
        getColumnPropsHoc(KEYSLEFTOVERS.production),
        getColumnPropsHoc(KEYSLEFTOVERS.width),
        getColumnPropsHoc(KEYSLEFTOVERS.count),
        {
            dataIndex: KEYSLEFTOVERS.widthOut.key,
            title: 'Выдать гр.',
            width: 100,
            render: (value, row, index) => {
                return (
                    <InputNumber
                        value={value}
                        onChangeHandler={(v) =>
                            setValueHandler(index, KEYSLEFTOVERS.widthOut.key, v, row)
                        }
                        style={{ width: '100px' }}
                        placeholder="Выдать гр."
                    />
                );
            },
        },
        {
            dataIndex: KEYSLEFTOVERS.countItemsOut.key,
            title: 'Выдать шт.',
            width: 100,
            render: (value, row, index) => {
                return (
                    <InputNumber
                        value={value}
                        onChangeHandler={(v) =>
                            setValueHandler(
                                index,
                                KEYSLEFTOVERS.countItemsOut.key,
                                v,
                                row,
                            )
                        }
                        style={{ width: '100px' }}
                        placeholder="Выдать шт."
                    />
                );
            },
        },
        {
            dataIndex: KEYSLEFTOVERS.defect.key,
            title: 'Брак',
            width: 100,
            render: (value, row, index) => {
                return (
                    <InputNumber
                        value={value}
                        onChangeHandler={(v) =>
                            setValueHandler(index, KEYSLEFTOVERS.defect.key, v, row)
                        }
                        style={{ width: '100px' }}
                        placeholder="Брак"
                    />
                );
            },
        },
    ];

    return { columns };
};
