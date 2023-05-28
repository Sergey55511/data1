import { useEffect, useState } from 'react';
import { iBigouterueBridje } from '../../../../../Shared/Types/interfaces';
import { tValue } from '../../../Shared/InputNumber';

export interface tDataSource extends iBigouterueBridje {
    index: number;
    key: number;
    widthOut: tValue;
    countItemsOut: tValue;
}

export const useData = ({
    data,
    bijouterieId,
    countItems,
    widthItems,
    countLocks,
}: {
    data?: iBigouterueBridje[];
    bijouterieId?: number;
    countItems: tValue;
    widthItems: tValue;
    countLocks: tValue;
}) => {
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
    }, [data]);

    const disabledSubmit = (() => {
        if (bijouterieId == undefined) return true;
        if (!countItems) return true;
        if (!widthItems) return true;
        if (!countLocks) return true;
        const isTrueData = dataSource?.some((item) => {
            if ((item.widthOut ?? 0) > +item.width) return true;
            if ((item.countItemsOut ?? 0) > +item.count) return true;

            if (!(item.widthOut ? +item.widthOut : undefined)) return true;
        });

        if (isTrueData) return true;
        return false;
    })();

    return { dataSource, setDataSource, disabledSubmit };
};
