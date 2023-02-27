import { InputProps } from 'antd';
import { Field } from '../../../../Helpers/classes';

export interface iRow {
    fractionId: iItem;
    materialGroup: iItem;
    widthInDocument: iItem;
    widthIn: iItem;
    moneyIn: iItem;
}

export interface iItem {
    placeholder: string;
    value: string | number;
    field: string;
    isError: boolean;
    errorMessage: string;
    type: InputProps['type'];
    step: InputProps['step'];
}

export interface iPrimeData {
    lot: iItem;
    numDocument: iItem;
}

export class Item implements iItem {
    value: string | number = '';
    placeholder = '';
    field = '';
    isError = false;
    errorMessage = '';
    type: InputProps['type'] = undefined;
    step: InputProps['step'] = undefined;
    constructor({
        field,
        placeholder,
        errorMessage = 'Обязательное поле',
        type,
        step,
    }: {
        field: string;
        placeholder: string;
        errorMessage?: string;
        type?: InputProps['type'];
        step?: InputProps['step'];
    }) {
        this.field = field;
        this.placeholder = placeholder;
        this.errorMessage = errorMessage;
        this.type = type;
        this.step = step;
    }
}

export const initData = () => ({
    fractionId: new Field('fractionId', 'Фракция', true, true),
    materialGroupId: new Field('materialGroupId', 'Группа сырья', true, true),
    widthInDocument: new Field('widthInDocument', 'Вес по накладной гр.', true, false),
    widthIn: new Field('widthIn', 'Вес факт гр.', true, false),
    moneyIn: new Field('moneyIn', 'Стоимость', true, false),
    duplicate: false,
});
export const initPrimeData = () => ({
    lot: new Item({ field: 'lot', placeholder: 'Партия', type: 'number' }),
    numDocument: new Item({ field: 'numDocument', placeholder: '№ накладной' }),
});
