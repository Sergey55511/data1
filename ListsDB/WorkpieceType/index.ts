import { tPrisma } from '../../Backend/types';
import { data } from './data';

export const workpieceType = async (prisma: tPrisma) => {
    await Promise.all(
        data.map((item) =>
            prisma.workpieceType.update({ data: item, where: { id: item.id } }),
        ),
    );
};
