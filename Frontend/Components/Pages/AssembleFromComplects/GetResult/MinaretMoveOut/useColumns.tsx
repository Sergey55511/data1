import { ColumnsType } from 'antd/lib/table';
import { Dispatch, SetStateAction } from 'react';
import { iData } from '../../../../../../Shared/Types/interfaces';
import { InputNumber, tValue } from '../../../../Shared/InputNumber';
import { KEYSLEFTOVERS } from '../../../../Shared/Table/constants';
import { InputWrapper } from './inputWrapper';

export const useColumns = ({
    setMinaret,
}: {
    setMinaret: Dispatch<SetStateAction<iData[]>>;
}) => {
    const getColumnItem = (key: keyof typeof KEYSLEFTOVERS) => {
        return { title: KEYSLEFTOVERS[key]?.title, dataIndex: key };
    };

    const onChangeHandler =
        (index: number, key: keyof iData, isSetMoney?: boolean) => (v: tValue) =>
            setMinaret((state) => {
                const value = v ? +v : undefined;
                const cloneState = [...state];
                cloneState[index][key] = value;
                return cloneState;
            });

    const res: ColumnsType<iData> = [
        getColumnItem('workpieceType'),
        getColumnItem('fullModel'),
        getColumnItem('sizeRange'),
        getColumnItem('color'),
        getColumnItem('length'),
        getColumnItem('channel'),
        getColumnItem('grade'),
        getColumnItem('state'),
        getColumnItem('model'),
        getColumnItem('type'),
        getColumnItem('lot'),
        getColumnItem('production'),
        getColumnItem('width'),
        getColumnItem('count'),
        {
            dataIndex: KEYSLEFTOVERS.widthOut.key,
            title: 'Выдать гр.',
            width: 100,
            render: (value, _, index) => {
                return (
                    <InputWrapper>
                        <InputNumber
                            value={value}
                            onChangeHandler={onChangeHandler(index, 'widthOut')}
                            style={{ width: '90px' }}
                            placeholder="Выдать гр."
                            size="small"
                        />
                    </InputWrapper>
                );
            },
        },
        {
            dataIndex: KEYSLEFTOVERS.countItemsOut.key,
            title: 'Выдать шт.',
            width: 100,
            render: (value, _, index) => {
                return (
                    <InputWrapper>
                        <InputNumber
                            value={value}
                            onChangeHandler={onChangeHandler(index, 'countItemsOut')}
                            style={{ width: '90px' }}
                            placeholder="Выдать шт."
                            size="small"
                        />
                    </InputWrapper>
                );
            },
        },
    ];

    return res;
};
