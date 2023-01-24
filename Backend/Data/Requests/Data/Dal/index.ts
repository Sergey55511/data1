import { NextApiRequest } from 'next';
import { iCookies, iDataTable, iUser } from '../../../../../Shared/Types/interfaces';
import { checkSchema } from '../../../../Helpers/checkSchema';
import { schema } from './scima';
import jwt from 'jsonwebtoken';
import { KEY } from '../../../Services/createJWT';

export const prepareNumber = (value?: number | string | null, isTask?: boolean) => {
    if (isTask) return;
    return value ? +value : undefined;
};
export const prepareStaring = (value?: number | string) =>
    value ? `${value}` : undefined;

export const dal = (req: NextApiRequest): iDataTable[] => {
    const params: iDataTable[] = req.body;
    const cookies = req.cookies as iCookies;
    const atkn = jwt.verify(cookies?.atkn, KEY) as iUser;
    const storeId = atkn.storeId;

    const data: iDataTable[] = params.map((item) => ({
        id: prepareNumber(item.id),
        lot: prepareNumber(item.lot),
        workingHours: prepareNumber(item.workingHours),
        numDocument: prepareStaring(item.numDocument),
        pp: prepareNumber(item.pp),
        workpieceTypeId: prepareNumber(item.workpieceTypeId),
        typeId: prepareNumber(item.typeId),
        userId: prepareNumber(item.userId),
        managerId: prepareNumber(item.managerId),
        recipientId: prepareNumber(item.recipientId),
        fullModelId: prepareNumber(item.fullModelId),
        sizeRangeId: prepareNumber(item.sizeRangeId),
        fractionId: prepareNumber(item.fractionId),
        materialGroupId: prepareNumber(item.materialGroupId),
        colorId: prepareNumber(item.colorId),
        lengthId: prepareNumber(item.lengthId),
        channelId: prepareNumber(item.channelId),
        gradeId: prepareNumber(item.gradeId),
        stateId: prepareNumber(item.stateId),
        storeId: prepareNumber(storeId),
        productionId: prepareNumber(item.productionId),
        operationId: prepareNumber(item.operationId),
        countItemsOut: prepareNumber(item.countItemsOut),
        countItemsIn: prepareNumber(item.countItemsIn),
        widthOut: prepareNumber(item.widthOut),
        widthInDocument: prepareNumber(item.widthInDocument),
        widthIn: prepareNumber(item.widthIn),
        moneyIn: prepareNumber(item.moneyIn),
        moneyOut: prepareNumber(item.moneyOut),
        date: prepareStaring(item.date),
        task: prepareNumber(item.task),
        articleId: prepareNumber(item.articleId),
        model: item.model,
    }));

    return checkSchema(data, schema);
};
