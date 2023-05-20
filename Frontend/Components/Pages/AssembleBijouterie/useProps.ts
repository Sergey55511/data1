import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getBijouterieArticles, getLocks } from '../../../Store/OperationStore/Api';
import { useStores } from '../../../Store/useStores';

export const useProps = () => {
    const { loginStore } = useStores();
    const [bijouterieId, setBijouterieId] = useState<number>();
    const storeId = loginStore.user.storeId;
    const bijouterie = useQuery(['bijouterie', storeId], getBijouterieArticles, {
        enabled: !!storeId,
    });
    const lock = useQuery(['lock', bijouterieId], () => getLocks({ id: 1 }), {
        enabled: !!bijouterieId,
    });

    const selectedBijouterie = bijouterie.data?.find((item) => item.id == bijouterieId);
    return { bijouterieId, setBijouterieId, bijouterie, selectedBijouterie, lock };
};
