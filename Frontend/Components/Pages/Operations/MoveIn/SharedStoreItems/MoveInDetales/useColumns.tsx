import { ColumnsType } from 'antd/es/table';
import { FilterValue } from 'antd/es/table/interface';
import { Dispatch, SetStateAction } from 'react';
import { iData, iDataTable } from '../../../../../../../Shared/Types/interfaces';
import { InputNumber } from '../../../../../Shared/InputNumber';
import { KEYSLEFTOVERS } from '../../../../../Shared/Table/constants';
import { getColumnProps } from '../../../../../Shared/Table/Helpers/getColumnProps';

export const useColumns = (
    data: iDataTable[],
    setData: Dispatch<SetStateAction<iDataTable[]>>,
    filters: Record<string, FilterValue | null>,
) => {
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

    const onChangeHandler = (id: number, field: keyof iDataTable, v?: number) => {
        setData((prev) => {
            const item = prev.find((i) => i.id == id);
            if (item) item[field] = v;
            return [...prev];
        });
    };

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
                        onChangeHandler={(v) =>
                            onChangeHandler(record.id!, 'widthIn', v ? +v : undefined)
                        }
                    />
                );
            },
            title: 'Приянть гр.',
            width: 100,
            fixed: 'right',
        },
        {
            dataIndex: 'countItemsIn',
            render: (_value, record) => {
                return (
                    <InputNumber
                        value={record.countItemsIn}
                        onChangeHandler={(v) =>
                            onChangeHandler(
                                record.id!,
                                'countItemsIn',
                                v ? +v : undefined,
                            )
                        }
                    />
                );
            },
            title: 'Приянть шт.',
            width: 100,
            fixed: 'right',
        },
    ];

    return { columns };
};
