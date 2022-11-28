import { Button } from 'antd';
import { InputNumber, tValue } from '../../../../../../Shared/InputNumber';
import { Wrapper } from './style';
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
    subbmitHandler: () => void;
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
                        placeholder="Брак"
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
            <Button
                type="primary"
                onClick={confirmSubbmit}
                loading={isLoading}
                style={{ marginLeft: 'auto' }}
            >
                Сохранить
            </Button>
        </Wrapper>
    );
};
