import { useStores } from '../../../../Store/useStores';
import type { TableProps } from 'antd/es/table';
import { FilterValue } from 'antd/es/table/interface';
import { iData } from '../../../../../Shared/Types/interfaces';
import { Dispatch, SetStateAction, useState } from 'react';
import { useRouter } from 'next/router';
import { useColumns } from './useColumns';
import { ROUTES } from '../../constants';
import modal from 'antd/lib/modal';
import { notification } from 'antd';
import { prepareDataTable } from '../../../Helpers';
import { getFilteredleftovers } from '../../../Shared/Table/Helpers/getFilteredleftovers';

export interface iProps {
    isGetOut?: boolean;
    filters: Record<string, FilterValue | null>;
    setFilters: Dispatch<SetStateAction<Record<string, FilterValue | null>>>;
}

export const useProps = ({ isGetOut, filters, setFilters }: iProps) => {
    const { OperationStore, loginStore, UIStore } = useStores();
    const orders = isGetOut ? OperationStore.ordersGetOut : OperationStore.orders;
    const data = orders.map((item, index) => ({ ...item, key: index }));
    const filteredleftovers = getFilteredleftovers({ data, filters });
    const { columns, isMSC } = useColumns(filters, data);

    const countKey: keyof (typeof filteredleftovers)[number] | undefined = isMSC
        ? 'count'
        : undefined;

    const router = useRouter();

    const handleChange: TableProps<iData>['onChange'] = (
        _pagination,
        filters,
        _sorter,
    ) => {
        setFilters(filters);
        // setSortedInfo(sorter as SorterResult<DataType>);
    };

    const onRowHandler = (record: iData) => {
        const redurect = () => {
            router.push(`${ROUTES.getOrder}/${record.pp}`);
        };

        const moveBackGetOut = () => {
            modal.confirm({
                title: 'Вернуть выбытие?',
                onOk: async () => {
                    UIStore.setIsLoading(true);
                    const data = prepareDataTable({
                        ...record,
                        moneyIn: record.moneyOut,
                        moneyOut: undefined,
                        widthIn: record.widthOut,
                        widthOut: undefined,
                        countItemsIn: record.countItemsOut,
                        countItemsOut: undefined,
                    });
                    await OperationStore.postOrderResult([data]);
                    notification.success({ message: 'Успешно' });
                    await OperationStore.getOrdersGetOut(loginStore.user.storeId);
                    UIStore.setIsLoading(false);
                },
            });
        };

        return {
            onDoubleClick: isGetOut ? moveBackGetOut : redurect,
        };
    };

    return { handleChange, onRowHandler, data, columns, filteredleftovers, countKey };
};
