import { iTableRowData } from '../TableRow';

export interface iProps {
    user?: string;
    worker?: string;
    date?: string;
    time?: string;
}

export const useSignRowData = (props: iProps): iTableRowData[] => {
    return [
        {
            moveOut: [
                { value: 'Выдал:', class: ['borderNone', 'borderTop'] },
                {
                    value: props.user ?? '',
                    class: ['borderNone', 'borderTop', 'borderBottom'],
                },
                { value: '', class: ['borderNone', 'borderTop'] },
                {
                    value: '',
                    class: [
                        'gray',
                        'borderNone',
                        'borderTop',
                        'borderRight',
                        'borderBottom',
                    ],
                },
            ],
            moveIn: [
                { value: 'Завершил:', class: ['borderNone', 'borderTop', 'borderLeft'] },
                { value: '', class: ['gray', 'borderNone', 'borderBottom', 'borderTop'] },
                { value: '', class: ['borderNone', 'borderTop'] },
                {
                    value: '',
                    class: [
                        'gray',
                        'borderNone',
                        'borderBottom',
                        'borderTop',
                        'borderRight',
                    ],
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
                {
                    value: props.date ?? '',
                    class: ['gray', 'borderNone', 'borderBottom'],
                },
                { value: 'Время', class: ['borderNone'] },
                {
                    value: props.time ?? '',
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
                {
                    value: props.worker ?? '',
                    class: ['gray', 'borderNone', 'borderBottom'],
                },
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
};
