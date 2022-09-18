import { useState } from 'react';
import { FilterValue } from 'antd/es/table/interface';
import { TableLeftOvers } from './Table';
import { MenuLeftovers } from './MenuLeftovers';

export default () => {
    const [filters, setFilters] = useState<Record<string, FilterValue | null>>({});

    return (
        <>
            <MenuLeftovers setFilters={setFilters} />
            <TableLeftOvers {...{ filters, setFilters }} />
        </>
    );
};
