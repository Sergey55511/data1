import { PrismaClient } from '@prisma/client';
import { tPrisma } from '../../Backend/types';

interface iPreparedData {
    dataUpdate: any[];
    dataCreate: any[];
}

type FilterStartsWith<Set, Needle extends string> = Set extends `${Needle}${infer _X}`
    ? Set
    : never;
type FilteredKeys = FilterStartsWith<keyof PrismaClient, '$'>;

type TableName = keyof Omit<PrismaClient, FilteredKeys>;

export const updateTable = async (prisma: tPrisma, nameTable: TableName, data: any[]) => {
    //@ts-ignore
    const table: { id: number }[] = await prisma[nameTable].findMany();
    const { dataUpdate, dataCreate } = data.reduce<iPreparedData>(
        (res, item) => {
            if (table.some((row) => row.id == item.id)) {
                res.dataUpdate.push(item);
            } else {
                res.dataCreate.push(item);
            }
            return res;
        },
        {
            dataUpdate: [],
            dataCreate: [],
        },
    );
    await Promise.all(
        dataUpdate.map((item) =>
            //@ts-ignore
            prisma[nameTable].update({ data: item, where: { id: item.id } }),
        ),
    );
    //@ts-ignore
    if (dataCreate.length) await prisma[nameTable].createMany({ data: dataCreate });
};
