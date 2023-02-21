import { Button, Input, Tooltip } from 'antd';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { Title } from '../../../../Shared/Title';
import { useProps } from './useProps';
import { Wrapper } from './style';
import { InputNumber } from '../../../../Shared/InputNumber';
import { Row } from '../../../../Shared/Row';

export const NewItemBillets = () => {
    const props = useProps();

    return (
        <Wrapper>
            <Title
                text="Приход заготовок"
                content={
                    <div className="inputWrapper">
                        <Tooltip
                            placement="top"
                            title={`Макс партия: ${props.maxLot.data || 0}`}
                        >
                            <InputNumber
                                value={props.lot}
                                placeholder="Партия"
                                onChangeHandler={(v) => props.setLot(v)}
                                width={300}
                                allowClear
                            />
                        </Tooltip>
                        <Input
                            value={props.numDocument}
                            placeholder="Накладная"
                            onChange={(e) => props.setNumDocument(e.target.value)}
                            width={300}
                            allowClear
                        />
                    </div>
                }
            />
            <div className="addrow">
                <a href="#" onClick={props.addRowHandler}>
                    Добавить строку
                </a>
            </div>
            <div className="rows">
                <Row
                    copyRow={() => console.log('copyRow')}
                    removeRow={() => console.log('removeRow')}
                    fields={[<>hello</>]}
                />
                <Row
                    copyRow={() => console.log('copyRow')}
                    removeRow={() => console.log('removeRow')}
                    fields={[<>hello</>]}
                />
                <Row
                    copyRow={() => console.log('copyRow')}
                    removeRow={() => console.log('removeRow')}
                    fields={[<>hello</>]}
                />
            </div>
        </Wrapper>
    );
};
