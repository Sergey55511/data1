import { iDataProduct } from '../../../../../Shared/Types/interfaces';
import ExcelJS from 'exceljs';

export const prepareData = (reportData: iDataProduct[]) => {
    const columns: ExcelJS.TableColumnProperties[] = [
        { name: 'Тип изделия', filterButton: true },
        { name: 'Тип сборки', filterButton: true },
        { name: 'Модель', filterButton: true },
        { name: 'Номер изделия', filterButton: true },
        { name: 'Состояние', filterButton: true },
        { name: 'Сорт', filterButton: true },
        { name: 'Цвет', filterButton: true },
        { name: 'Длинна', filterButton: true },
        { name: 'Профиль', filterButton: true },
        { name: 'Размер бусины', filterButton: true },
        { name: 'Остаток гр.', filterButton: true, totalsRowFunction: 'sum' },
        { name: 'Остаток шт.', filterButton: true, totalsRowFunction: 'sum' },
    ];

    const rows: any[][] = reportData.map((item) => [
        item.workpieceType,
        item.typeAssemble,
        item.model,
        item.articleId,
        item.state,
        item.grade,
        item.color,
        item.length,
        item.profile,
        item.sizeRange,
        +item.width,
        +item.count,
    ]);

    return { columns, rows };
};
