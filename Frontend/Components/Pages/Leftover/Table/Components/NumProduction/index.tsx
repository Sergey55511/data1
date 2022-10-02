import { Button, Divider, Input } from 'antd';
import { observer } from 'mobx-react-lite';
import { Wrapper } from './style';
import { SearchOutlined } from '@ant-design/icons';
import { useStores } from '../../../../../../Store/useStores';
import { useEffect, useState } from 'react';
import { Loading } from '../../../../../Shared/Loading';

export const NumProduction = observer(
    ({ onClose, setValue }: { onClose?: () => void; setValue: (v: number) => void }) => {
        const [description, setDescription] = useState('');
        const [search, setSearch] = useState('');
        const [isLoading, setIsLoading] = useState(true);
        const { OperationStore, loginStore } = useStores();
        useEffect(() => {
            const fetch = async () => {
                await OperationStore.getProductions(loginStore.user.storeId);
                setIsLoading(false);
            };
            fetch();
        }, [loginStore.user.storeId]);

        const newProductionHandler = async () => {
            setIsLoading(true);
            await OperationStore.postProductions(description);
            setDescription('');
            setIsLoading(false);
        };

        const productions = OperationStore.productions.filter(
            (item) =>
                `${item.id}${item.description}`.toLowerCase().split(search.toLowerCase())
                    .length > 1,
        );

        const selectProduction = (v: number) => {
            setValue(v);
            if (onClose) onClose();
        };

        return (
            <Wrapper>
                <Input
                    placeholder="Поиск"
                    allowClear
                    suffix={<SearchOutlined />}
                    value={search}
                    onChange={(v) => setSearch(v.target.value)}
                />
                <Divider />
                <Loading isLoading={isLoading}>
                    <div className="list">
                        {productions?.map((item) => (
                            <div
                                key={item.id}
                                className="item"
                                onClick={() => selectProduction(item.id)}
                            >
                                <span className="number">{item.id}</span>
                                {' - '}
                                <span className="description">{item.description}</span>
                            </div>
                        ))}
                    </div>
                </Loading>
                <Divider />
                <div className="newPP">
                    <h3>Создать</h3>
                    <div className="descriprion">
                        <Input.TextArea
                            rows={4}
                            placeholder="Описание производства"
                            value={description}
                            onChange={(v) => setDescription(v.target.value)}
                            allowClear
                        />
                    </div>
                    <Button
                        type="primary"
                        onClick={newProductionHandler}
                        loading={isLoading}
                        disabled={!description}
                    >
                        Создать
                    </Button>
                </div>
            </Wrapper>
        );
    },
);
