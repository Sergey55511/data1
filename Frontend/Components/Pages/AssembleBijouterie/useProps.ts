import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import {
    getBigouterieBridge,
    getBijouterieArticles,
    getMinorAccessoryLeftovers,
} from './api';
import { useStores } from '../../../Store/useStores';
import { tValue } from '../../Shared/InputNumber';
import { iBigouterueBridje, iLock } from '../../../../Shared/Types/interfaces';

export const useProps = () => {
    const { loginStore } = useStores();
    const [bijouterieId, setBijouterieId] = useState<number>();
    const [countItems, setCountItems] = useState<tValue>();
    const [widthItems, setWidthItems] = useState<tValue>();
    const [countLocks, setCountLocks] = useState<tValue>();
    const storeId = loginStore.user.storeId;

    useEffect(() => {
        setCountItems(undefined);
        setWidthItems(undefined);
        setCountLocks(undefined);
    }, [bijouterieId]);

    const bijouterie = useQuery(['bijouterie', storeId], getBijouterieArticles, {
        enabled: !!storeId,
    });

    const bijouterieBridge = useQuery(
        ['bijouterieBridge', bijouterieId],
        () => getBigouterieBridge({ articleId: bijouterieId! }),
        {
            enabled: !!bijouterieId,
        },
    );

    const getData = <Key extends keyof iBigouterueBridje>(
        key: Key,
    ): iBigouterueBridje[Key] | undefined =>
        bijouterieBridge.data ? bijouterieBridge.data[0][key] : undefined;

    const lockId = getData('locksId');

    const locksLeftovers = useQuery(
        ['getMinorAccessoryLeftovers', lockId],
        () => getMinorAccessoryLeftovers(lockId!),
        { enabled: !!lockId },
    );
    const lock: iLock = {
        color: getData('lockColor'),
        id: lockId,
        material: getData('lockMaterial'),
        size: getData('lockSize'),
        type: getData('lockType'),
        count: locksLeftovers.data ? locksLeftovers.data[0]?.count || 0 : 0,
        code: locksLeftovers.data ? locksLeftovers.data[0]?.code || 0 : 0,
    };

    return {
        bijouterieId,
        setBijouterieId,
        bijouterie,
        countItems,
        setCountItems,
        widthItems,
        setWidthItems,
        bijouterieBridge,
        countLocks,
        setCountLocks,
        lock,
    };
};
