import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useStores } from '../../../../../Store/useStores';

export const MoveInDetales = observer(() => {
    const { ListsStore } = useStores();
    const router = useRouter();
    const numDocument = router.query.numDocument;
    useEffect(() => {
        // ListsStore.getMoveIn(numDocument);
    }, []);
    return <div>MoveInDetales {numDocument}</div>;
});
