import { iData } from '../../../../Shared/Types/interfaces';

type tKeys =
    | 'pp'
    | 'date'
    | 'store'
    | 'manager'
    | 'operation'
    | 'workpieceType'
    | 'fullModel'
    | 'fullModelTask'
    | 'numDocument'
    | 'model'
    | 'type'
    | 'sizeRange'
    | 'fraction'
    | 'materialGroup'
    | 'color'
    | 'length'
    | 'channel'
    | 'grade'
    | 'state'
    | 'lot'
    | 'productionId'
    | 'production'
    | 'numProduction'
    | 'width'
    | 'count'
    | 'widthOut'
    | 'widthIn'
    | 'moneyIn'
    | 'countItemsIn'
    | 'countItemsOut'
    | 'code'
    | 'defect'
    | 'userLogin';

export interface iKeysLeftoversObject {
    key: keyof iData;
    title: string;
}
export const KEYSLEFTOVERS: Record<tKeys, iKeysLeftoversObject> = {
    pp: { key: 'pp', title: 'ПП' },
    date: { key: 'date', title: 'Дата' },
    store: { key: 'store', title: 'Выдал' },
    manager: { key: 'managerLogin', title: 'Исполнитель' },
    operation: { key: 'operation', title: 'Операция' },
    workpieceType: { key: 'workpieceType', title: 'Тип заготовки' },
    fullModel: { key: 'fullModel', title: 'Модель' },
    fullModelTask: { key: 'fullModelTask', title: 'Задача' },
    numDocument: { key: 'numDocument', title: 'Номер документа' },
    model: { key: 'model', title: 'Модель' },
    type: { key: 'type', title: 'Тип' },
    sizeRange: { key: 'sizeRange', title: 'Размерный ряд' },
    fraction: { key: 'fraction', title: 'Фракция' },
    materialGroup: { key: 'materialGroup', title: 'Группа сырья' },
    color: { key: 'color', title: 'Цвет' },
    length: { key: 'length', title: 'Длина' },
    channel: { key: 'channel', title: 'Канал' },
    grade: { key: 'grade', title: 'Сорт' },
    state: { key: 'state', title: 'Состояние' },
    lot: { key: 'lot', title: 'Партия' },
    productionId: { key: 'productionId', title: '№ пр-ва.' },
    production: { key: 'production', title: 'Производство' },
    numProduction: { key: 'numProduction', title: '№ пр-ва' },
    width: { key: 'width', title: 'Остаток гр.' },
    count: { key: 'count', title: 'Шт.' },
    widthOut: { key: 'widthOut', title: 'Отгрузка гр.' },
    widthIn: { key: 'widthIn', title: 'Приход гр.' },
    moneyIn: { key: 'moneyIn', title: 'Принять код' },
    countItemsIn: { key: 'countItemsIn', title: 'Приход шт.' },
    countItemsOut: { key: 'countItemsOut', title: 'Отгрузка шт.' },
    code: { key: 'code', title: '' },
    defect: { key: 'defect', title: '' },
    userLogin: { key: 'userLogin', title: 'Пользователь' },
};
