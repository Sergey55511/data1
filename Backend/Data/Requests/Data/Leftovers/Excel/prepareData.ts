import ExcelJS from 'exceljs';
import { iData } from '../../../../../../Shared/Types/interfaces';

export const prepareData = (reportData: iData[]) => {
    const columns: ExcelJS.TableColumnProperties[] = [
        { name: 'Тип заготовки', filterButton: true },
        { name: 'Состояние', filterButton: true },
        { name: 'Тип', filterButton: true },
        { name: 'Фракция', filterButton: true },
        { name: 'Группа сырья', filterButton: true },
        { name: 'Цвет', filterButton: true },
        { name: 'Размерный ряд', filterButton: true },
        { name: 'Длинна', filterButton: true },
        { name: 'Сорт', filterButton: true },
        { name: 'Лот', filterButton: true },
        { name: '№ пр-ва.', filterButton: true },
        { name: 'Остаток гр.', filterButton: true, totalsRowFunction: 'sum' },
        { name: 'Остаток шт.', filterButton: true, totalsRowFunction: 'sum' },
    ];
    const getNumber = (v: any) => (v ? +v : undefined);

    const rows: any[][] = reportData.map((item) => [
        item.workpieceType,
        item.state,
        item.type,
        item.fraction,
        item.materialGroup,
        item.color,
        item.sizeRange,
        item.length,
        item.grade,
        item.lot,
        item.numProduction,
        getNumber(item.width),
        getNumber(item.count),
    ]);

    return { columns, rows };
};
