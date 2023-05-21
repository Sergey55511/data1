import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
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
    const lock = bijouterieBridge.data ? bijouterieBridge.data[0]?.locks : undefined;
    const yarnsAssemble = bijouterieBridge.data
        ? bijouterieBridge.data[0]?.yarnsAssemble
        : undefined;

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
    };
};
