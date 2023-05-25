import { useEffect, useState } from 'react';
import { iBigouterueBridje } from '../../../../../Shared/Types/interfaces';
import { tValue } from '../../../Shared/InputNumber';

export interface tDataSource extends iBigouterueBridje {
    index: number;
    key: number;
    widthOut: tValue;
    countItemsOut: tValue;
}

export const useData = (data?: iBigouterueBridje[]) => {
    const [dataSource, setDataSource] = useState<tDataSource[]>();
    useEffect(() => {
        const dataSource: tDataSource[] | undefined = data?.map((item, index) => ({
            ...item,
            index,
            key: item.id,
            widthOut: item.width,
            countItemsOut: item.count,
        }));
        setDataSource(dataSource);
    }, []);

    return { dataSource, setDataSource };
};
