import { iData } from '../../../Shared/Types/interfaces';

export const getLosseObject = (
    record: iData,
    workpieceTypeId: number,
    losses: number,
) => ({
    ...record,
    workpieceTypeId,
    stateId: undefined,
    modelId: undefined,
    fractionId: undefined,
    materialGroupId: undefined,
    colorId: undefined,
    length: undefined,
    channelId: undefined,
    gradeId: undefined,
    widthOut: undefined,
    widthIn: +losses.toFixed(2),
});

export const getMoveBackMoney = (
    code: number | undefined,
    width: number | undefined,
    moveBack: number | undefined,
) => {
    const newCode = code || 0;
    const moveBackMoneyOne = newCode / (width || newCode);
    return (moveBack || 0) * moveBackMoneyOne * -1;
};
