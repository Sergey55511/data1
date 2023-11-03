import { useEffect, useState } from 'react';
import { FilterValue } from 'antd/es/table/interface';
import { TableLeftOvers } from './Table';
import { useStores } from '../../../Store/useStores';
import { observer } from 'mobx-react-lite';
import { MenuLeftovers } from '../../Shared/MenuLeftovers';
import { DownloadExcel } from './DownloadExcel';
import { OptimizationData } from './OptimizationData';

export default observer(() => {
    const [filters, setFilters] = useState<Record<string, FilterValue | null>>({});
    const { loginStore, OperationStore } = useStores();

    useEffect(() => {
        if (loginStore.user.storeId) OperationStore.getLeftovers(loginStore.user.storeId);
    }, [loginStore.user.storeId]);

    return (
        <>
            <MenuLeftovers
                setFilters={setFilters}
                content={
                    <>
                        <OptimizationData />
                        <DownloadExcel />
                    </>
                }
            />
            <TableLeftOvers {...{ filters, setFilters }} />
        </>
    );
});
