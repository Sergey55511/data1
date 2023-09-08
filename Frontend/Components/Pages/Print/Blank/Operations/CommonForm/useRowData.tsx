import { iTableRowData } from '../../Components/TableRow';

export interface iProps {
    state: string;
    number: number;
    name: string;
}
export const useRowData = ({ state }: iProps): iTableRowData[] => {
    return [
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
                { value: '' },
                { value: '' },
                { value: '' },
                { value: '', class: 'gray' },
            ],
        },
        {
            moveOut: [
                { value: '', class: 'gray' },
                { value: '', class: 'gray' },
                { value: '', class: 'gray' },
                { value: '', class: 'gray' },
            ],
            moveIn: [
                { value: '', class: 'gray' },
                { value: '', class: 'gray' },
                {
                    value: '',
                    class: ['borderNone', 'borderLeft', 'borderBottom', 'borderTop'],
                },
                {
                    value: '',
                    class: ['borderNone', 'borderRight', 'borderBottom', 'borderTop'],
                },
            ],
        },
    ];
};
