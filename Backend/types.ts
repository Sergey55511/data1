import { Prisma, PrismaClient } from "@prisma/client";

export type tPrisma= PrismaClient<
Prisma.PrismaClientOptions,
never,
Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
>