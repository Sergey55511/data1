import { NextApiRequest } from 'next';
import {
    iCookies,
    iDataTable,
    iUser,
} from '../../../../../../../../Shared/Types/interfaces';
import { checkSchema } from '../../../../../../../Helpers/checkSchema';
import { schema } from './scima';
import jwt from 'jsonwebtoken';
import { KEY } from '../../../../../../Services/createJWT';
import { tPrisma } from '../../../../../../../types';
import { WORKPIECETYPE } from '../../../../../../../../Shared/constants';

export const dal = async (
    prisma: tPrisma,
    req: NextApiRequest,
): Promise<iDataTable[]> => {
    const prepareNumber = (value?: number | string | null, isTask?: boolean) => {
        if (isTask) return;
        return value ? +value : undefined;
    };
    const prepareStaring = (value?: number | string) => (value ? `${value}` : undefined);

    const params: iDataTable[] = req.body;
    const cookies = req.cookies as iCookies;
    const atkn = jwt.verify(cookies?.atkn, KEY) as iUser;
    const storeId = atkn.storeId;

    const taskItem = params.find((item) => item.task);
    const isTask = !!taskItem;

    let workpieceTypeId: number | null | undefined = 0;

    if (isTask) {
        const workpieceTypeIdModel = await prisma.fullModels.findFirst({
            select: { workpieceTypeId: true },
            where: { id: taskItem.task },
        });
        workpieceTypeId = workpieceTypeIdModel?.workpieceTypeId;
    }

    const data: iDataTable[] = params.map((item) => {
        const isMoveBack = (item.widthOut || 0) < 0;

        const res = {
            id: prepareNumber(item.id),
            lot: prepareNumber(item.lot),
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
        };

        if (!isMoveBack) {
            if (isTask) {
                if (
                    ![
                        WORKPIECETYPE.defect.id,
                        WORKPIECETYPE.garbage.id,
                        WORKPIECETYPE.losses.id,
                        WORKPIECETYPE.prunes.id,
                    ].includes(item.workpieceTypeId || 0)
                ) {
                    res.workpieceTypeId = prepareNumber(workpieceTypeId);
                }
                res.fullModelId = prepareNumber(item.task);
                res.sizeRangeId = undefined;
                res.lengthId = undefined;
            }
        }
        
        return res;
    });

    return checkSchema(data, schema);
};
