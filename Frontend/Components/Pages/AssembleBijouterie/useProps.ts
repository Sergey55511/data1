import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import {
    getBigouterieBridge,
    getBijouterieArticles,
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
    };
};
