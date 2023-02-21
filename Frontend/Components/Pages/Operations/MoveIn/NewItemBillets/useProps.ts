import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getMaxLot } from '../../../../../Store/OperationStore/Api';
import { useStores } from '../../../../../Store/useStores';
import { tValue } from '../../../../Shared/InputNumber';

export const useProps = () => {
    const { loginStore } = useStores();
    const [lot, setLot] = useState<tValue>('');
    const [numDocument, setNumDocument] = useState<tValue>('');
    const maxLot = useQuery(['maxLot', loginStore.user.storeId], getMaxLot, {
        enabled: !!loginStore.user.storeId,
    });
    const addRowHandler = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        console.log('hello');
    };
    return { maxLot, lot, setLot, numDocument, setNumDocument, addRowHandler };
};
