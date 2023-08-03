import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { iBigouterueBridje, iLock } from '../../../../../Shared/Types/interfaces';
import { tValue } from '../../../Shared/InputNumber';
import { useSubmit } from './useSubmit';

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
    setBijouterieId,
    lock,
}: {
    data?: iBigouterueBridje[];
    bijouterieId?: number;
    countItems: tValue;
    widthItems: tValue;
    countLocks: tValue;
    setBijouterieId: Dispatch<SetStateAction<number | undefined>>;
    lock: iLock;
}) => {
    const [dataSource, setDataSource] = useState<tDataSource[]>();
    useEffect(() => {
        const dataSource: tDataSource[] | undefined = data?.map((item, index) => ({
            ...item,
            index,
            key: item.id,
            widthOut: 0,
            countItemsOut: 0,
        }));
        setDataSource(dataSource);
    }, [data]);

    const getNumber = (v: any) => (v ? +v : 0);

    const ttlWidth =
        dataSource?.reduce((res, item) => res + getNumber(item.widthOut), 0) ?? 0;

    const disabledSubmit = (() => {
        if (bijouterieId == undefined) return true;
        if (!countItems) return true;
        if (!widthItems) return true;
        if (ttlWidth < widthItems) return true;
        if (!countLocks) return true;
        if (+countLocks < +countItems) return true;
        const isTrueData = dataSource?.some((item) => {
            if ((item.widthOut ?? 0) > +item.width) return true;
            if ((item.countItemsOut ?? 0) > +item.count) return true;

            if (!(item.widthOut ? +item.widthOut : undefined)) return true;
        });

        if (isTrueData) return true;
        return false;
    })();
    const { submit } = useSubmit(setBijouterieId);

    const submitHandler = () => {
        if (!data) return;
        if (!countLocks) return;
        const moneyOneItem = lock.code / lock.count;
        const moneyOut = moneyOneItem * +countLocks;
        submit.mutate({
            accessoriesData: {
                idAccessory: data[0].locksId,
                countOut: +countLocks,
                moneyOut,
            },
            dataSource: dataSource ?? [],
            bijouterie: { id: bijouterieId, count: countItems, width: widthItems },
        });
    };
    return { dataSource, setDataSource, disabledSubmit, submitHandler, submit };
};
