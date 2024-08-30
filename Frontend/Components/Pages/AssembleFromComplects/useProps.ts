import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { RESULTASSEMBLE, STATE, WORKPIECETYPE } from '../../../../Shared/constants';
import { iData, iDataProduct } from '../../../../Shared/Types/interfaces';
import {
    getDataProductLeftovers,
    leftoversAssemble,
} from '../../../Store/OperationStore/Api';
import { useStores } from '../../../Store/useStores';
import { tValue } from '../../Shared/InputNumber';

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
    const [complectItems, setComplectItems] = useState<iData[]>([]);
    const [managerId, setManagerId] = useState<number>();
    const [length, setLength] = useState<tValue>();
    const [width, setWidth] = useState<tValue>();
    const [model, setModel] = useState<string>('');

    useEffect(() => {
        if (complect) {
            setLength(complect[0]?.length);
            setWidth(complect[0]?.width);
        }
    }, [complect]);

    const disabledGetResult = !(complect?.length && complectItems?.length);

    const isSelectedMinaret = !!complectItems?.length;
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
        setComplectItems([]);
        assembleLeftovers.refetch();
        dataProduct.refetch();
    };

    return {
        stateButton,
        setStateButton,
        disabledGetResult,
        complectItems,
        setComplectItems,
        isSelectedMinaret,
        complect,
        setComplect,
        isSelectedComplect,
        resetRootState,
        assembleLeftovers,
        dataProduct,
        managerId,
        setManagerId,
        length,
        setLength,
        width,
        setWidth,
        model,
        setModel,
    };
};
