import { Button, Tooltip } from 'antd';
import { InputNumber, tValue } from '../../../../../../Shared/InputNumber';
import { Wrapper } from './style';
import { CheckOutlined } from '@ant-design/icons';
import { confirmAction } from '../../../../../../Shared/ConfirmSubbmit';
import { SetStateAction, useState } from 'react';

export const Title = ({
    subbmitHandler,
    addRowHandler,
    setGarbage,
    setMoveBack,
    setDefect,
    garbage,
    moveBack,
    defect,
    losses,
    isLoading,
}: {
    subbmitHandler: () => Promise<void>;
    addRowHandler: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
    setGarbage?: (value: SetStateAction<number | undefined>) => void;
    setMoveBack?: (value: SetStateAction<tValue>) => void;
    setDefect?: (value: SetStateAction<tValue>) => void;
    garbage?: number;
    moveBack?: tValue;
    defect?: tValue;
    losses?: number;
    isLoading?: boolean;
}) => {
    const confirmSubbmit = () => {
        confirmAction({
            subbmitHandler,
        });
    };
    return (
        <Wrapper>
            <Tooltip title="Сохранить">
                <Button
                    shape="circle"
                    icon={<CheckOutlined />}
                    onClick={confirmSubbmit}
                    loading={isLoading}
                />
            </Tooltip>
            <a href="#" onClick={addRowHandler}>
                Добавить строку
            </a>
            {setGarbage && (
                <div>
                    <InputNumber
                        placeholder="Отход"
                        onChangeHandler={(v) => {
                            if (setGarbage) setGarbage(v ? +v : undefined);
                        }}
                        value={garbage}
                    />
                </div>
            )}
            {setDefect && (
                <div>
                    <InputNumber
                        placeholder="Дифект"
                        onChangeHandler={(v) => {
                            if (setDefect) setDefect(v ? +v : undefined);
                        }}
                        value={defect}
                    />
                </div>
            )}
            {setMoveBack && (
                <div>
                    <InputNumber
                        placeholder="Возврат"
                        value={moveBack}
                        onChangeHandler={(v) => {
                            if (setMoveBack) setMoveBack(v);
                        }}
                    />
                </div>
            )}
            <div className={(losses || 0) < 0 ? 'red' : ''}>потеря: {losses}</div>
        </Wrapper>
    );
};
