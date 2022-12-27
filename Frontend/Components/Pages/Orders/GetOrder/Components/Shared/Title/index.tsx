import { Button } from 'antd';
import { InputNumber, tValue } from '../../../../../../Shared/InputNumber';
import { Wrapper } from './style';
import { confirmAction } from '../../../../../../Shared/ConfirmSubbmit';
import { SetStateAction } from 'react';

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
    pruning,
    setPruning,
}: {
    subbmitHandler: () => void;
    addRowHandler: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
    setGarbage?: (value: SetStateAction<tValue>) => void;
    setMoveBack?: (value: SetStateAction<tValue>) => void;
    setDefect?: (value: SetStateAction<tValue>) => void;
    setPruning?: (value: SetStateAction<tValue>) => void;
    garbage?: tValue;
    pruning?: tValue;
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
            {setPruning && (
                <div>
                    <InputNumber
                        placeholder="Обрезки"
                        onChangeHandler={(v) => {
                            if (setPruning) setPruning(v);
                        }}
                        value={pruning ?? ''}
                    />
                </div>
            )}
            {setGarbage && (
                <div>
                    <InputNumber
                        placeholder="Отход"
                        onChangeHandler={(v) => {
                            if (setGarbage) setGarbage(v);
                        }}
                        value={garbage ?? ''}
                    />
                </div>
            )}
            {setDefect && (
                <div>
                    <InputNumber
                        placeholder="Брак"
                        onChangeHandler={(v) => {
                            if (setDefect) setDefect(v);
                        }}
                        value={defect}
                    />
                </div>
            )}
            {setMoveBack && (
                <div>
                    <InputNumber
                        placeholder="Возврат гр."
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
