import { PrismaPromise } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import { NextApiRequest } from 'next';
import { tPrisma } from '../../../types';
import { dal } from './Dal';

export const getFullModels = async <T>(
    prisma: tPrisma,
    req: NextApiRequest,
): Promise<T> => {
    const data = dal(req.query);
    let res = await prisma.fullModels.findMany({
        select: {
            id: true,
            Models: { select: { id: true, model: true } },
            WorkpieceType: { select: { id: true, workpieceType: true } },
            Profile: { select: { id: true, profile: true } },
            SizeRangeModel: { select: { id: true, sizeRange: true } },
            LengthModel: { select: { id: true, length: true } },
        },
        where: {
            workpieceTypeId: data.workpieceTypeId,
            profileId: data.profileId,
            sizeRangeModelId: data.sizeRangeModelId,
            active: true,
        },
    });

    return res.map((item) => {
        const values: any[] = [];
        const pushData = (value?: any) => {
            if (value) values.push(value);
        };
        pushData(item.WorkpieceType?.workpieceType);
        pushData(item.Models?.model);
        pushData(item.Profile?.profile);
        pushData(item.SizeRangeModel?.sizeRange);

        return { ...item, fullModel: values.join('_') };
    }) as any;
};
