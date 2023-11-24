import { iCookiesAuth, iDataTable } from '../../../Shared/Types/interfaces';
import { tPrisma } from '../../types';
import { moveOut } from './MoveOut';

export const moveOutHoc = async (
    prisma: tPrisma,
    recipient: iDataTable,
    data: iDataTable[],
    qookies: iCookiesAuth,
) => {
    const storeIdRecipient = await prisma.recipients.findFirst({
        select: { storeId: true, Stores: { select: { pathKey: true } } },
        where: { id: recipient.recipientId },
    });

    const pathKey = storeIdRecipient?.Stores?.pathKey || '';

    const url = process.env[pathKey];

    await moveOut(url, data, qookies);
};
