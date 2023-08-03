import { UseQueryResult } from '@tanstack/react-query';
import { Button } from 'antd';
import { Dispatch, SetStateAction } from 'react';
import {
    iBigouterueBridje,
    iBijouterieArticles,
    iLock,
} from '../../../../../Shared/Types/interfaces';
import { InputNumber, tValue } from '../../../Shared/InputNumber';
import { SelectField } from '../../../Shared/SelectField';
import { ItemsTable } from '../ItemsTable';
import { Wrapper } from './style';
import { useData } from './useData';

export const Assemble = ({
    bijouterieId,
    setBijouterieId,
    countItems,
    setCountItems,
    widthItems,
    setWidthItems,
    countLocks,
    setCountLocks,
    bijouterie,
    bijouterieBridge,
    lock,
}: {
    bijouterieId?: number;
    setBijouterieId: Dispatch<SetStateAction<number | undefined>>;
    countItems: tValue;
    setCountItems: Dispatch<SetStateAction<tValue>>;
    widthItems: tValue;
    setWidthItems: Dispatch<SetStateAction<tValue>>;
    countLocks: tValue;
    setCountLocks: Dispatch<SetStateAction<tValue>>;
    bijouterie: UseQueryResult<iBijouterieArticles[], unknown>;
    bijouterieBridge: UseQueryResult<iBigouterueBridje[], unknown>;
    lock: iLock;
}) => {
    const { dataSource, setDataSource, disabledSubmit, submit, submitHandler } = useData({
        data: bijouterieBridge.data,
        bijouterieId,
        countItems,
        widthItems,
        countLocks,
        setBijouterieId,
        lock,
    });
    return (
        <Wrapper>
            <div className="header">
                <div className="selectBijouterieWrapper">
                    <SelectField
                        placeholder="Выберите изделие"
                        value={bijouterieId}
                        onChange={setBijouterieId}
                        options={bijouterie.data?.map((item) => ({
                            value: item.id,
                            caption: item.article,
                        }))}
                    />
                </div>
                <div>
                    <InputNumber
                        value={countItems}
                        placeholder="кол-во изделий"
                        onChangeHandler={setCountItems}
                    />
                </div>
                <div>
                    <InputNumber
                        value={widthItems}
                        placeholder="общий вес"
                        onChangeHandler={setWidthItems}
                    />
                </div>
                <div>
                    <InputNumber
                        value={countLocks}
                        placeholder="Кол-во замков"
                        onChangeHandler={setCountLocks}
                    />
                </div>
                <div>
                    <Button
                        type="primary"
                        disabled={disabledSubmit}
                        onClick={submitHandler}
                        loading={submit.isLoading}
                    >
                        Сохранить
                    </Button>
                </div>
            </div>
            {!!bijouterieBridge.data && (
                <div className="itemsWrapper">
                    <h3>Составляющие</h3>
                    <ItemsTable dataSource={dataSource} setDataSource={setDataSource} />
                </div>
            )}
        </Wrapper>
    );
};
