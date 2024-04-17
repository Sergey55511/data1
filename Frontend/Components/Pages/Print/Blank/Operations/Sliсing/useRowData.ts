import { iPrintBlank } from '../../../../../../../Shared/Types/interfaces';
import { iTableRowData, iValue } from '../../Components/TableRow';

export const useRowData = (produstionData?: iPrintBlank[]): iTableRowData[] => {
    const ttlSum = produstionData?.reduce((res, item) => (res += item.widthOut ?? 0), 0);
    const getString = (v: any) => v ?? '';
    const getMoveOut = (index: number): iValue[] => [
        { value: getString(produstionData![index]?.sizeRange) },
        { value: getString(produstionData![index]?.length) },
        { value: '' },
        { value: getString(produstionData![index]?.widthOut), class: 'gray' },
    ];
    return [
        {
            moveOut: getMoveOut(0),
            moveIn: [
                { value: '' },
                { value: '' },
                { value: '' },
                { value: '', class: 'gray' },
            ],
        },
        {
            moveOut: getMoveOut(1),
            moveIn: [
                { value: 'Обрезки' },
                { value: '' },
                { value: '' },
                { value: '', class: 'gray' },
            ],
        },
        {
            moveOut: getMoveOut(2),
            moveIn: [
                { value: 'Брак' },
                { value: '' },
                { value: '' },
                { value: '', class: 'gray' },
            ],
        },
        {
            moveOut: getMoveOut(3),
            moveIn: [
                { value: 'Итого, кг:', class: 'gray' },
                { value: '', class: 'gray' },
                { value: '', class: 'gray' },
                { value: '', class: 'gray' },
            ],
        },
        {
            moveOut: getMoveOut(4),
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
            moveOut: getMoveOut(5),
            moveIn: [
                { value: 'Фракция', class: 'gray' },
                { value: 'Вес, кг.', class: 'gray' },
                { value: '', class: ['borderNone', 'borderLeft'] },
                { value: '', class: ['borderNone', 'borderRight'] },
            ],
        },
        {
            moveOut: getMoveOut(6),
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
                { value: ttlSum?.toLocaleString('ru-RU') ?? '', class: 'gray' },
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
};
