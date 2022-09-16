export interface iRow {
    item1: iItem;
    item2: iItem;
    item3: iItem;
    item4: iItem;
}

export interface iItem {
    placeholder: string;
    value: string;
}

export interface iPrimeData {
    primeItem1: iItem;
    primeItem2: iItem;
    primeItem3: iItem;
}

export class Item implements iItem {
    value = '';
    placeholder = '';
    constructor(placeholder: string) {
        this.placeholder = placeholder;
    }
}

export const initData = () => ({
    item1: new Item('hello'),
    item2: new Item('hello1'),
    item3: new Item('hello2'),
    item4: new Item('hello3'),
});
export const initPrimeData = () => ({
    primeItem1: new Item('prime1'),
    primeItem2: new Item('prime2'),
    primeItem3: new Item('prime3'),
});
