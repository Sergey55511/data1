import { Worksheet } from 'exceljs';

export const sheetEditor = (sheet: Worksheet, isMSC: boolean) => {
    let widthArr: number[] = [];
    if (isMSC) {
        widthArr = [
            4.89, 10.44, 23.11, 14.67, 13.89, 14.89, 22.78, 6.56, 16.44, 13.67, 6.56,
            12.11, 5.67, 5.56, 5.22, 8.56, 12.89, 13.44,
        ];
    } else {
        widthArr = [
            4.89, 10.44, 15.22, 14.67, 13.89, 14.89, 14.22, 10.22, 33.22, 10.89, 16.44,
            6.56, 7.56, 5.56, 12.89,
        ];
    }

    widthArr.forEach((item, index) => {
        sheet.columns[index].width = item;
    });
};
