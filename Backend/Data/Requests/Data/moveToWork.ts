import { PrismaClient } from '@prisma/client';

export const postNewItems = async (data: any, isSetNewPP = true) => {
    const prisma = new PrismaClient();
    let pp: number | null = null;
    if (isSetNewPP) {
        const queryMaxPP = await prisma.$queryRaw`SELECT max(pp) as maxpp FROM "Data";`;
        pp = Array.isArray(queryMaxPP) ? queryMaxPP[0]?.maxpp : 0;
    }

    return prisma.data.createMany({ ...data, pp }) as any;
};
