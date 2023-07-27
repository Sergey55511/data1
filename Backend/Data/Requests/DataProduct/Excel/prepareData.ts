import { iDataProduct } from '../../../../../Shared/Types/interfaces';
import ExcelJS from 'exceljs';

export const prepareData = (reportData: iDataProduct[]) => {
    const columns: ExcelJS.TableColumnProperties[] = [
        { name: 'Тип изделия', filterButton: true },
        { name: 'Модель', filterButton: true },
        { name: 'Номер изделия', filterButton: true },
        { name: 'Состояние', filterButton: true },
        { name: 'Сорт', filterButton: true },
        { name: 'Цвет', filterButton: true },
        { name: 'Длинна', filterButton: true },
        { name: 'Остаток гр.', filterButton: true, totalsRowFunction: 'sum' },
        { name: 'Остаток шт.', filterButton: true, totalsRowFunction: 'sum' },
    ];

    const rows: any[][] = reportData.map((item) => [
        item.workpieceType,
        item.model,
        item.articleId,
        item.state,
        item.grade,
        item.color,
        item.length,
        +item.width,
        +item.count,
    ]);

    return { columns, rows };
};