import { NextApiRequest } from 'next';
import { STORES } from '../../../../../../Shared/constants';
import { iUser } from '../../../../../../Shared/Types/interfaces';
import { tPrisma } from '../../../../../types';
import { dal } from './Dal';

export const getBijouterieBridge = (
    prisma: tPrisma,
    req: NextApiRequest,
    user: iUser,
) => {
    if (user.storeId != STORES.Moscow.id) return [] as any;
    const data = dal(req.query);
    return prisma.bijouterieBridge.findMany({
        select: {
            id: true,
            workpieceType: { select: { id: true, workpieceType: true } },
            sizeRange: { select: { id: true, sizeRange: true } },
            color: { select: { id: true, color: true } },
            locks: {
                select: { id: true, color: true, material: true, size: true, type: true },
            },
            yarnsAssemble: { select: { id: true, width: true, yarnAssemble: true } },
        },
        where: { bijouterieArticlesId: data.articleId },
    }) as any;
};
