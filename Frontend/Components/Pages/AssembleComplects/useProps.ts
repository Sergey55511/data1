import { useState } from 'react';
import { iData, iProduction } from '../../../../Shared/Types/interfaces';

export enum eTypeButton {
    complects = 'complects',
    minarets = 'minarets',
    getResult = 'getResult',
}
export const useProps = () => {
    const [stateButton, setStateButton] = useState<eTypeButton>(eTypeButton.complects);
    const [complect, setComplect] = useState<iProduction>();
    const [minaret, setMinaret] = useState<iData[]>([]);

    const disabledGetResult = !(complect && minaret);

    return { stateButton, setStateButton, disabledGetResult, minaret, setMinaret };
};
