import { useMutation, useQuery } from '@tanstack/react-query';
import { useStores } from '../../../../Store/useStores';
import { FilterValue } from 'antd/lib/table/interface';
import { useState } from 'react';
import { iData } from '../../../../../Shared/Types/interfaces';
import type { TableProps } from 'antd/es/table';
import { useColumns } from './useСolumns';
import moment, { Moment } from 'moment';
import { tValue } from '../../../Shared/InputNumber';
import { getOperations } from '../../../../Store/Lists/api';
import * as api from '../../../../Store/OperationStore/Api';
import fileDownload from 'js-file-download';

export interface iFilterDate {
    start: moment.Moment | null;
    end: moment.Moment | null;
}

export const useProps = () => {
    const { loginStore } = useStores();
    const [filters, setFilters] = useState<Record<string, FilterValue | null>>({});
    const [filterDate, setFilterDate] = useState<iFilterDate>({
        start: moment().subtract(2, 'days'),
        end: moment(),
    });
    const [lot, setLot] = useState<tValue>();
    const [productionId, setProductionId] = useState<tValue>();
    const [pp, setPP] = useState<tValue>();
    const [numDocument, setNumDocument] = useState<string | undefined>();
    const [operationId, setOperationId] = useState<number>();
    const getNumber = (v: any) => (v ? +v : undefined);

    const handleChange: TableProps<iData>['onChange'] = (
        _pagination,
        filters,
        _sorter,
    ) => {
        setFilters(filters);
        // setSortedInfo(sorter as SorterResult<DataType>);
    };

    const listOperations = useQuery(
        ['listOperations', loginStore.user.storeId],
        () =>
            api.listOperations({
                start: filterDate.start!,
                end: filterDate.end!,
                lot: getNumber(lot),
                pp: getNumber(pp),
                operationId: getNumber(operationId),
                numDocument: numDocument,
                productionId: getNumber(productionId),
            }),
        { enabled: !!loginStore.user.storeId },
    );
    const listOperationsExcel = useMutation(async () => {
        const data = await api.listOperationsExcel({
            start: filterDate.start!,
            end: filterDate.end!,
            lot: getNumber(lot),
            pp: getNumber(pp),
            operationId: getNumber(operationId),
            numDocument,
            productionId: getNumber(productionId),
        });

        fileDownload(data, `Отчет лист операции.xlsx`);
    });
    const operations = useQuery(
        ['operations', loginStore.user.storeId],
        () => getOperations(loginStore.user.storeId),
        { enabled: !!loginStore.user.storeId },
    );
    const data = listOperations.data?.map((item, index) => ({
        ...item,
        key: index,
        date: moment(item.date).format('DD.MM.YYYY'),
    }));
    const { columns, filteredleftovers } = useColumns(filters, data);

    const disabledSubmit = (() => {
        if (numDocument) {
            if (numDocument.length > 3) return false;
        }
        if (productionId) return false;
        if (pp) return false;

        return !(filterDate.start && filterDate.end);
    })();

    return {
        filteredleftovers,
        listOperations,
        handleChange,
        filters,
        setFilters,
        columns,
        filterDate,
        setFilterDate,
        data,
        lot,
        setLot,
        pp,
        setPP,
        operations,
        operationId,
        setOperationId,
        numDocument,
        setNumDocument,
        listOperationsExcel,
        productionId,
        setProductionId,
        disabledSubmit,
    };
};
