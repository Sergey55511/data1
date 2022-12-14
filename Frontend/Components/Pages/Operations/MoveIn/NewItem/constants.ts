import { InputProps } from 'antd';

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
    fractionId: new Item({ field: 'fractionId', placeholder: 'Фракция' }),
    materialGroup: new Item({ field: 'materialGroupId', placeholder: 'Группа сырья' }),
    widthInDocument: new Item({
        field: 'widthInDocument',
        placeholder: 'Вес по накладной гр.',
        type: 'number',
        step: '0.01',
    }),
    widthIn: new Item({
        field: 'widthIn',
        placeholder: 'Вес факт гр.',
        type: 'number',
        step: '0.01',
    }),
    moneyIn: new Item({
        field: 'moneyIn',
        placeholder: 'Стоимость',
        type: 'number',
        step: '0.01',
    }),
});
export const initPrimeData = () => ({
    lot: new Item({ field: 'lot', placeholder: 'Партия', type: 'number' }),
    numDocument: new Item({ field: 'numDocument', placeholder: '№ накладной' }),
});
