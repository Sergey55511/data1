import { iData } from '../../../../../Shared/Types/interfaces';
import ExcelJS from 'exceljs';

export const prepareData = (reportData: iData[]) => {
    const columns: ExcelJS.TableColumnProperties[] = [
        { name: 'Дата', filterButton: true },
        { name: 'Номер документа', filterButton: true },
        { name: 'Исполнитель', filterButton: true },
        { name: 'Фракция', filterButton: true },
        { name: 'Группа сырья', filterButton: true },
        { name: 'Партия', filterButton: true },
        { name: '№ пр-ва', filterButton: true },
        { name: 'ПП', filterButton: true },
        { name: 'Тип заготовки', filterButton: true },
        { name: 'Модель', filterButton: true },
        { name: 'Операция', filterButton: true },
        { name: 'Состояние', filterButton: true },
        { name: 'Тип', filterButton: true },
        { name: 'Цвет', filterButton: true },
        { name: 'Сорт', filterButton: true },
        { name: 'Размерный ряд', filterButton: true },
        { name: 'Длина', filterButton: true },
        { name: 'Канал', filterButton: true },
        { name: 'Приход гр.', filterButton: true, totalsRowFunction: 'sum' },
        { name: 'Отгрузка гр.', filterButton: true, totalsRowFunction: 'sum' },
        { name: 'Приход шт.', filterButton: true, totalsRowFunction: 'sum' },
        { name: 'Отгрузка шт.', filterButton: true, totalsRowFunction: 'sum' },
    ];

    const rows: any[][] = reportData.map((item) => [
        item.date,
        item.numDocument,
        item.managerLogin,
        item.fraction,
        item.materialGroup,
        item.lot,
        item.productionId,
        item.pp,
        item.workpieceType,
        item.fullModel,
        item.operation,
        item.state,
        item.type,
        item.color,
        item.grade,
        item.sizeRange,
        item.length,
        item.channel,
        item.widthIn,
        item.widthOut,
        item.countItemsIn,
        item.countItemsOut,
    ]);

    return { columns, rows };
};
