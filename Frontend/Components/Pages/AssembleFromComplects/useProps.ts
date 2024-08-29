import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { RESULTASSEMBLE, STATE, WORKPIECETYPE } from '../../../../Shared/constants';
import { iData, iDataProduct } from '../../../../Shared/Types/interfaces';
import {
    getDataProductLeftovers,
    leftoversAssemble,
} from '../../../Store/OperationStore/Api';
import { useStores } from '../../../Store/useStores';

export enum eTypeButton {
    complects = 'complects',
    complectIyems = 'complectIyems',
    getResult = 'getResult',
}
export const useProps = () => {
    const { loginStore, OperationStore } = useStores();
    const storeId = loginStore.user.storeId;
    const [stateButton, setStateButton] = useState<eTypeButton>(eTypeButton.complects);
    const [complect, setComplect] = useState<iDataProduct[]>([]);
    const [minaret, setMinaret] = useState<iData[]>([]);

    const disabledGetResult = !(complect?.length && minaret?.length);

    const isSelectedMinaret = !!minaret?.length;
    const isSelectedComplect = !!complect?.length;

    const assembleLeftovers = useQuery(
        ['assembleLeftoversComplects', storeId],
        () =>
            leftoversAssemble(storeId, [
                STATE.sertedElements.id,
                STATE.minaretFinishedElement.id,
                STATE.disassembled.id,
            ]),
        { enabled: !!storeId, onSuccess: () => OperationStore.getMaxId() },
    );

    const dataProduct = useQuery(
        ['dataProduct'],
        () =>
            getDataProductLeftovers(loginStore.user.storeId, RESULTASSEMBLE.complect.id),
        { enabled: !!storeId },
    );

    const resetRootState = () => {
        setStateButton(eTypeButton.complects);
        setComplect([]);
        setMinaret([]);
        assembleLeftovers.refetch();
        dataProduct.refetch();
    };

    return {
        stateButton,
        setStateButton,
        disabledGetResult,
        minaret,
        setMinaret,
        isSelectedMinaret,
        complect,
        setComplect,
        isSelectedComplect,
        resetRootState,
        assembleLeftovers,
        dataProduct,
    };
};
