import { iTableRowData } from './TableRow';

export const ROWDATA: iTableRowData[] = [
    {
        moveOut: [
            { value: '+6,6-7,59' },
            { value: 'от 15,0 до 24,99' },
            { value: '' },
            { value: '1076.3', class: 'gray' },
        ],
        moveIn: [
            { value: '+6,6-7,59' },
            { value: '15.0' },
            { value: '' },
            { value: '', class: 'gray' },
        ],
    },
    {
        moveOut: [
            { value: '' },
            { value: 'от 15,0 до 24,99' },
            { value: '' },
            { value: '293.4', class: 'gray' },
        ],
        moveIn: [
            { value: 'Обрезки' },
            { value: '' },
            { value: '' },
            { value: '', class: 'gray' },
        ],
    },
    {
        moveOut: [
            { value: '' },
            { value: '' },
            { value: '' },
            { value: '', class: 'gray' },
        ],
        moveIn: [
            { value: 'Брак' },
            { value: '' },
            { value: '' },
            { value: '', class: 'gray' },
        ],
    },
    {
        moveOut: [
            { value: '' },
            { value: '' },
            { value: '' },
            { value: '', class: 'gray' },
        ],
        moveIn: [
            { value: 'Итого, кг:', class: 'gray' },
            { value: '', class: 'gray' },
            { value: '', class: 'gray' },
            { value: '', class: 'gray' },
        ],
    },
    {
        moveOut: [
            { value: '' },
            { value: '' },
            { value: '' },
            { value: '', class: 'gray' },
        ],
        moveIn: [
            { value: 'Возврат', class: 'gray' },
            { value: '', class: 'gray' },
            {
                value: 'Для заметок:',
                class: ['borderNone', 'borderLeft', 'borderTop'],
            },
            {
                value: '',
                class: ['borderNone', 'borderRight', 'borderTop'],
            },
        ],
    },
    {
        moveOut: [
            { value: '' },
            { value: '' },
            { value: '' },
            { value: '', class: 'gray' },
        ],
        moveIn: [
            { value: 'Фракция', class: 'gray' },
            { value: 'Вес, кг.', class: 'gray' },
            { value: '', class: ['borderNone', 'borderLeft'] },
            { value: '', class: ['borderNone', 'borderRight'] },
        ],
    },
    {
        moveOut: [
            { value: '' },
            { value: '' },
            { value: '' },
            { value: '', class: 'gray' },
        ],
        moveIn: [
            { value: '' },
            { value: '' },
            {
                value: '',
                class: ['borderNone', 'borderLeft'],
            },
            { value: '', class: ['borderNone', 'borderRight'] },
        ],
    },
    {
        moveOut: [
            { value: '', class: 'gray' },
            { value: '', class: 'gray' },
            { value: 'Итого, кг:', class: 'gray' },
            { value: '1369.7', class: 'gray' },
        ],
        moveIn: [
            { value: 'Итого, кг:', class: 'gray' },
            { value: '', class: 'gray' },
            {
                value: '',
                class: ['borderNone', 'borderLeft', 'borderBottom'],
            },
            {
                value: '',
                class: ['borderNone', 'borderRight', 'borderBottom'],
            },
        ],
    },
];

export const SIGNROWDATA: iTableRowData[] = [
    {
        moveOut: [
            { value: 'Выдал:', class: ['borderNone', 'borderTop'] },
            { value: 'А.Т.Н.', class: ['borderNone', 'borderTop', 'borderBottom'] },
            { value: '', class: ['borderNone', 'borderTop'] },
            {
                value: '',
                class: ['gray', 'borderNone', 'borderTop', 'borderRight', 'borderBottom'],
            },
        ],
        moveIn: [
            { value: 'Завершил:', class: ['borderNone', 'borderTop', 'borderLeft'] },
            { value: '', class: ['gray', 'borderNone', 'borderBottom', 'borderTop'] },
            { value: '', class: ['borderNone', 'borderTop'] },
            {
                value: '',
                class: ['gray', 'borderNone', 'borderBottom', 'borderTop', 'borderRight'],
            },
        ],
    },
    {
        moveOut: [
            { value: '', class: ['borderNone', 'borderLeft'] },
            { value: 'ФИО', class: ['borderNone'] },
            { value: '', class: ['borderNone'] },
            {
                value: 'Подпись',
                class: ['borderNone', 'borderRight'],
            },
        ],
        moveIn: [
            { value: '', class: ['borderNone', 'borderLeft'] },
            { value: 'ФИО', class: ['borderNone'] },
            { value: '', class: ['borderNone'] },
            {
                value: 'Подпись',
                class: ['borderNone', 'borderRight'],
            },
        ],
    },
    {
        moveOut: [
            { value: 'Дата:', class: ['borderNone'] },
            { value: '12.12.2022', class: ['gray', 'borderNone', 'borderBottom'] },
            { value: 'Время', class: ['borderNone'] },
            {
                value: '14:26',
                class: ['gray', 'borderNone', 'borderRight', 'borderBottom'],
            },
        ],
        moveIn: [
            { value: 'Дата:', class: ['borderNone', 'borderLeft'] },
            { value: '', class: ['gray', 'borderNone', 'borderBottom'] },
            { value: 'Время', class: ['borderNone'] },
            {
                value: '',
                class: ['gray', 'borderNone', 'borderBottom', 'borderRight'],
            },
        ],
    },
    {
        moveOut: [
            { value: '', class: ['borderNone'] },
            { value: '', class: ['borderNone'] },
            { value: '', class: ['borderNone'] },
            {
                value: '',
                class: ['borderNone', 'borderRight'],
            },
        ],
        moveIn: [
            { value: '', class: ['borderNone', 'borderLeft'] },
            { value: '', class: ['borderNone'] },
            { value: '', class: ['borderNone'] },
            {
                value: '',
                class: ['borderNone', 'borderRight'],
            },
        ],
    },
    {
        moveOut: [
            { value: 'Приступил:', class: ['borderNone'] },
            { value: 'Лунин Д.', class: ['gray', 'borderNone', 'borderBottom'] },
            { value: '', class: ['borderNone'] },
            {
                value: '',
                class: ['borderNone', 'borderRight', 'gray', 'borderBottom'],
            },
        ],
        moveIn: [
            {
                value: 'Принял:',
                class: ['borderNone', 'borderLeft'],
            },
            { value: '', class: ['gray', 'borderNone', 'borderBottom'] },
            { value: '', class: ['borderNone'] },
            {
                value: '',
                class: ['gray', 'borderNone', 'borderRight', 'borderBottom'],
            },
        ],
    },
    {
        moveOut: [
            { value: '', class: ['borderNone'] },
            { value: 'ФИО', class: ['borderNone'] },
            { value: '', class: ['borderNone'] },
            {
                value: 'Подпись',
                class: ['borderNone', 'borderRight'],
            },
        ],
        moveIn: [
            {
                value: '',
                class: ['borderNone', 'borderLeft'],
            },
            { value: 'ФИО', class: ['borderNone'] },
            { value: '', class: ['borderNone'] },
            {
                value: 'Подпись',
                class: ['borderNone', 'borderRight'],
            },
        ],
    },
    {
        moveOut: [
            { value: 'Дата:', class: ['borderNone', 'borderBottom'] },
            { value: '', class: ['gray', 'borderNone', 'borderBottom'] },
            { value: 'Время', class: ['borderNone', 'borderBottom'] },
            {
                value: '',
                class: ['borderNone', 'borderRight', 'gray', 'borderBottom'],
            },
        ],
        moveIn: [
            {
                value: 'Дата:',
                class: ['borderNone', 'borderLeft', 'borderBottom'],
            },
            { value: '', class: ['gray', 'borderNone', 'borderBottom'] },
            { value: 'Время', class: ['borderNone', 'borderBottom'] },
            {
                value: '',
                class: ['gray', 'borderNone', 'borderRight', 'borderBottom'],
            },
        ],
    },
];
