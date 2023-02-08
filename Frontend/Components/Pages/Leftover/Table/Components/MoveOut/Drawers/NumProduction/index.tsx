import { Button, Divider, Drawer, Input } from 'antd';
import { observer } from 'mobx-react-lite';
import { Wrapper } from './style';
import { SearchOutlined } from '@ant-design/icons';
import { useStores } from '../../../../../../../../Store/useStores';
import { useEffect, useState } from 'react';
import { Loading } from '../../../../../../../Shared/Loading';

export const NumProduction = observer(
    ({ onClose, setValue }: { onClose?: () => void; setValue: (v: number) => void }) => {
        const [description, setDescription] = useState('');
        const [search, setSearch] = useState('');
        const [isLoading, setIsLoading] = useState(false);
        const { OperationStore, ListsStore, loginStore } = useStores();

        const newProductionHandler = async () => {
            setIsLoading(true);
            await OperationStore.postProductions(description);
            setDescription('');
            setIsLoading(false);
        };

        useEffect(() => {
            if (loginStore.user.storeId)
                ListsStore.getProductions(loginStore.user.storeId);
        }, [loginStore.user.storeId]);

        const productions = ListsStore.productions.filter(
            (item) =>
                `${item.id}${item.fullModel}${item.description}`
                    .toLowerCase()
                    .split(search.toLowerCase()).length > 1,
        );

        const selectProduction = (v: number) => {
            setValue(v);
            if (onClose) onClose();
        };

        return (
            <Drawer
                open
                title="Производства"
                onClose={() => {
                    if (onClose) onClose();
                }}
            >
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
                                    {item.fullModel && (
                                        <>
                                            <span className="number">
                                                {item.fullModel}
                                            </span>
                                            {' - '}
                                        </>
                                    )}
                                    <span className="description">
                                        {item.description}
                                    </span>
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
            </Drawer>
        );
    },
);
