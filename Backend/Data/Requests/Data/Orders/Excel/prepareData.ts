import ExcelJS from 'exceljs';
import { KEYSLEFTOVERS } from '../../../../../../Frontend/Components/Shared/Table/constants';
import { iData, iUser } from '../../../../../../Shared/Types/interfaces';

export const prepareData = (reportData: iData[], isMSC: boolean) => {
    const columns: ExcelJS.TableColumnProperties[] = [];

    const getNumber = (v: any) => (v ? +v : undefined);

    const rows: any[][] = reportData.map((item, index) => {
        const addColumn = (
            title: string,
            filterButton: ExcelJS.TableColumnProperties['filterButton'] = true,
            totalsRowFunction?: ExcelJS.TableColumnProperties['totalsRowFunction'],
        ) => {
            if (index) return;
            columns.push({ name: title, filterButton, totalsRowFunction });
        };
        const res: (string | number | undefined)[] = [
            item[KEYSLEFTOVERS.pp.key],
            item[KEYSLEFTOVERS.productionId.key],
            item[KEYSLEFTOVERS.operation.key],
            item[KEYSLEFTOVERS.userLogin.key],
            item[KEYSLEFTOVERS.manager.key],
            item[KEYSLEFTOVERS.workpieceType.key],
            item[KEYSLEFTOVERS.state.key],
        ];
        addColumn(KEYSLEFTOVERS.pp.title);
        addColumn(KEYSLEFTOVERS.productionId.title);
        addColumn(KEYSLEFTOVERS.operation.title);
        addColumn(KEYSLEFTOVERS.userLogin.title);
        addColumn(KEYSLEFTOVERS.manager.title);
        addColumn(KEYSLEFTOVERS.workpieceType.title);
        addColumn(KEYSLEFTOVERS.state.title);

        if (!isMSC) {
            res.push(item[KEYSLEFTOVERS.fraction.key]);
            res.push(item[KEYSLEFTOVERS.materialGroup.key]);
            addColumn(KEYSLEFTOVERS.fraction.title);
            addColumn(KEYSLEFTOVERS.materialGroup.title);
        }

        res.push(item[KEYSLEFTOVERS.color.key]);
        res.push(item[KEYSLEFTOVERS.sizeRange.key]);
        res.push(item[KEYSLEFTOVERS.length.key]);
        res.push(item[KEYSLEFTOVERS.grade.key]);

        addColumn(KEYSLEFTOVERS.color.title);
        addColumn(KEYSLEFTOVERS.sizeRange.title);
        addColumn(KEYSLEFTOVERS.length.title);
        addColumn(KEYSLEFTOVERS.grade.title);

        if (isMSC) {
            res.push(item[KEYSLEFTOVERS.fullModel.key]);
            addColumn(KEYSLEFTOVERS.fullModel.title);
        }

        res.push(item[KEYSLEFTOVERS.type.key]);
        res.push(item[KEYSLEFTOVERS.lot.key]);
        addColumn(KEYSLEFTOVERS.type.title);
        addColumn(KEYSLEFTOVERS.lot.title);

        if (isMSC) {
            res.push(item[KEYSLEFTOVERS.channel.key]);
            res.push(item[KEYSLEFTOVERS.fullModelTask.key]);
            addColumn(KEYSLEFTOVERS.channel.title);
            addColumn(KEYSLEFTOVERS.fullModelTask.title);
        }
        res.push(getNumber(item[KEYSLEFTOVERS.width.key]));

        addColumn('В работе гр.', true, 'sum');

        if (isMSC) {
            res.push(getNumber(item[KEYSLEFTOVERS.count.key]));
            addColumn('В работе шт.', true, 'sum');
        }

        return res;
    });

    return { columns, rows };
};
