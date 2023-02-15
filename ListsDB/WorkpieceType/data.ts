import { Prisma } from '@prisma/client';

export const data: Prisma.Enumerable<Prisma.WorkpieceTypeCreateManyInput>[] = [
    {
        id: 1,
        workpieceType: 'asda',
        active: true,
        isMinaletGroup: false,
        isShow: false,
        nextTypeId: 2,
        position: 1,
    },
];
