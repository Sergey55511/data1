import { ColumnsType } from 'antd/es/table';
import { FilterValue } from 'antd/es/table/interface';
import { Dispatch, SetStateAction } from 'react';
import { STORES } from '../../../../../../../Shared/constants';
import { iData, iDataTable } from '../../../../../../../Shared/Types/interfaces';
import { useStores } from '../../../../../../Store/useStores';
import { InputNumber } from '../../../../../Shared/InputNumber';
import { KEYSLEFTOVERS } from '../../../../../Shared/Table/constants';
import { getColumnProps } from '../../../../../Shared/Table/Helpers/getColumnProps';

export const useColumns = (
    data: iDataTable[],
    setData: Dispatch<SetStateAction<iDataTable[]>>,
    filters: Record<string, FilterValue | null>,
    isEditor?: boolean,
) => {
    const { loginStore } = useStores();
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

    const onChangeHandler = (id: number, field: keyof iDataTable, v?: any) => {
        setData((prev) => {
            const item = prev.find((i) => i.id == id);
            if (item) item[field] = v;
            return [...prev];
        });
    };

    const isMSC = loginStore.user.storeId == STORES.Moscow.id;

    const columns: ColumnsType<iData> = [];
    columns.push({
        ...getColumnPropsHoc(KEYSLEFTOVERS.userLogin.key),
        title: 'Отправил',
        width: 100,
    });
    columns.push({
        ...getColumnPropsHoc(KEYSLEFTOVERS.store.key),
        title: 'Отправитель',
        width: 100,
    });
    columns.push({
        ...getColumnPropsHoc(KEYSLEFTOVERS.numDocument.key),
        title: 'Номер документа',
    });
    columns.push(getColumnPropsHoc(KEYSLEFTOVERS.workpieceType.key));
    columns.push(getColumnPropsHoc(KEYSLEFTOVERS.state.key));
    columns.push({
        ...getColumnPropsHoc(KEYSLEFTOVERS.color.key),
        width: 100,
    });
    columns.push({
        ...getColumnPropsHoc(KEYSLEFTOVERS.sizeRange.key),
        width: 150,
    });
    columns.push(getColumnPropsHoc(KEYSLEFTOVERS.length.key));
    columns.push({
        ...getColumnPropsHoc(KEYSLEFTOVERS.grade.key),
        width: 80,
    });
    if (isMSC) {
        columns.push(getColumnPropsHoc(KEYSLEFTOVERS.model.key));
        columns.push(getColumnPropsHoc(KEYSLEFTOVERS.model.key));
    }
    columns.push({
        ...getColumnPropsHoc(KEYSLEFTOVERS.lot.key),
        width: 80,
    });
    columns.push({
        ...getColumnPropsHoc(KEYSLEFTOVERS.widthOut.key),
        title: 'Отгружено гр.',
        width: 130,
    });
    columns.push({
        dataIndex: KEYSLEFTOVERS.widthIn.key,
        render: (_value, record) => {
            return (
                <InputNumber
                    value={record.widthIn}
                    onChangeHandler={(v) => onChangeHandler(record.id!, 'widthIn', v)}
                />
            );
        },
        title: 'Принять гр.',
        width: 100,
        fixed: 'right',
    });

    if (isEditor) {
        columns.push({
            dataIndex: KEYSLEFTOVERS.code.key,
            title: 'код',
            width: 100,
            fixed: 'right',
        });
        columns.push({
            dataIndex: KEYSLEFTOVERS.moneyIn.key,
            render: (_value, record) => {
                return (
                    <InputNumber
                        value={record.moneyIn}
                        onChangeHandler={(v) => onChangeHandler(record.id!, 'moneyIn', v)}
                    />
                );
            },
            title: KEYSLEFTOVERS.moneyIn.title,
            width: 150,
            fixed: 'right',
        });
    }

    return { columns };
};
