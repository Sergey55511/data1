import { PrismaClient } from '@prisma/client';

export const postNewItems = async (data: any) => {
    const prisma = new PrismaClient();
    const maxpp = await prisma.$queryRaw`SELECT max(pp) as maxpp FROM "Data";`;
    const pp = Array.isArray(maxpp) ? (maxpp[0]?.maxpp as number) : 0;
    return prisma.data.createMany({ ...data, pp }) as any;
};
