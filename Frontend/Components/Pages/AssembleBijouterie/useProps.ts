import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import {
    iBigouterueBridje,
    iLock,
    iYarnAssemble,
} from '../../../../Shared/Types/interfaces';
import {
    getBigouterieBridge,
    getBijouterieArticles,
    getLocks,
} from '../../../Store/OperationStore/Api';
import { useStores } from '../../../Store/useStores';
import { tValue } from '../../Shared/InputNumber';

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

    const selectedBijouterie = bijouterie.data?.find((item) => item.id == bijouterieId);
    const getData = <Key extends keyof iBigouterueBridje>(
        key: Key,
    ): iBigouterueBridje[Key] | undefined =>
        bijouterieBridge.data ? bijouterieBridge.data[0][key] : undefined;
    const lock: iLock = {
        color: getData('lockColor'),
        id: getData('locksId'),
        material: getData('lockMaterial'),
        size: getData('lockSize'),
        type: getData('lockType'),
    };

    const yarnsAssemble: iYarnAssemble = {
        id: getData('yarnsAssembleId'),
        yarnAssemble: getData('yarnAssemble'),
        width: getData('yarnAssembleWidth'),
    };

    return {
        bijouterieId,
        setBijouterieId,
        bijouterie,
        selectedBijouterie,
        lock,
        yarnsAssemble,
        countItems,
        setCountItems,
        widthItems,
        setWidthItems,
        bijouterieBridge,
        countLocks,
        setCountLocks,
    };
};
