import { TableProps } from 'antd/es/table';
import { FilterValue } from 'antd/es/table/interface';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { iData, iDataTable } from '../../../../../../../Shared/Types/interfaces';
import { useStores } from '../../../../../../Store/useStores';
import { prepareDataTable } from '../../../../../Helpers';
import { ROUTES } from '../../../../constants';
import { useColumns } from './useColumns';

export const useProps = () => {
    const { loginStore, OperationStore } = useStores();
    const [filters, setFilters] = useState<Record<string, FilterValue | null>>({});
    const [data, setData] = useState<iDataTable[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const numDocument = router.query.numDocument;

    useEffect(() => {
        if (loginStore.user.storeId && numDocument) {
            (async () => {
                let newData: iData[] = await OperationStore.getMoveIn(
                    loginStore.user.storeId,
                    numDocument as string,
                );

                newData = newData?.map((item, index) => ({
                    ...item,
                    key: index,
                    widthIn: item.widthOut,
                    moneyIn: item.moneyOut,
                    moneyOut: undefined,
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

    const submitHandler = async () => {
        let preparedData = data.filter((item) => item.widthIn || item.countItemsIn);
        preparedData = preparedData.map((item) => {
            const data = prepareDataTable(item);
            data.userId = loginStore.user.id;
            data.storeId = loginStore.user.storeId;
            data.widthOut = undefined;
            data.countItemsOut = undefined;
            return data;
        });
        if (!preparedData.length) return;
        setIsLoading(true);
        await OperationStore.postMoveInShared(preparedData);
        router.push(ROUTES.movein);
        setIsLoading(false);
    };

    const { columns } = useColumns(data, setData, filters);

    return { numDocument, submitHandler, isLoading, columns, data, handleChange };
};
