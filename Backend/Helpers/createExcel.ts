import ExcelJS from 'exceljs';

export const createExcel = async ({
    rows,
    columns,
    sheetEditor,
}: {
    rows: any[][];
    columns: ExcelJS.TableColumnProperties[];
    sheetEditor?: (sheet: ExcelJS.Worksheet) => void;
}) => {
    const workbook = new ExcelJS.Workbook();

    const sheet = workbook.addWorksheet('Отчет');
    sheet.addTable({
        name: 'MyTable',
        ref: 'A1',
        headerRow: true,
        totalsRow: true,
        style: {
            theme: 'TableStyleLight14',
            showRowStripes: true,
        },
        columns,
        rows,
    });

    if (sheetEditor) sheetEditor(sheet);

    return await workbook.xlsx.writeBuffer();
};
