import { useState } from 'react';
import { iData, iDataProduct } from '../../../../Shared/Types/interfaces';

export enum eTypeButton {
    complects = 'complects',
    minarets = 'minarets',
    getResult = 'getResult',
}
export const useProps = () => {
    const [stateButton, setStateButton] = useState<eTypeButton>(eTypeButton.complects);
    const [complect, setComplect] = useState<iDataProduct[]>([]);
    const [minaret, setMinaret] = useState<iData[]>([]);

    const disabledGetResult = !(complect && minaret);

    const isSelectedMinaret = !!minaret?.length;
    const isSelectedComplect = !!complect?.length;

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
    };
};
