import { Wrapper } from './style';
import { Title } from '../../../Shared/Title';
import { Dispatch, SetStateAction } from 'react';
import { observer } from 'mobx-react-lite';
import { FilterValue } from 'antd/es/table/interface';
import { Actions } from './actions';
import { iDataProduct } from '../../../../../Shared/Types/interfaces';
import { useMutation, UseQueryResult } from '@tanstack/react-query';
import { Button } from 'antd';
import { getDataProductExcel } from '../../../../Store/OperationStore/Api';
import fileDownload from 'js-file-download';

export const MenuLeftovers = observer(
    ({
        setFilters,
        selectedRows,
        products,
        setSelectedRows,
    }: {
        selectedRows: iDataProduct[];
        setFilters: Dispatch<SetStateAction<Record<string, FilterValue | null>>>;
        products: UseQueryResult<iDataProduct[], unknown>;
        setSelectedRows: (value: SetStateAction<iDataProduct[]>) => void;
    }) => {
        const cliarFiltersHandler = (e: React.MouseEvent<HTMLElement>) => {
            e.preventDefault();
            setFilters({});
        };

        const downloadHandler = useMutation(async () => {
            const data = await getDataProductExcel();
            fileDownload(data, `Остатки изделий.xlsx`);
        });

        return (
            <Wrapper>
                <div className="params">
                    <div className="titleWrapper">
                        <Title text="Остатки готовых изделий:" />
                        <Actions
                            selectedRows={selectedRows}
                            products={products}
                            setSelectedRows={setSelectedRows}
                        />
                    </div>
                    <div className="settings">
                        <Button
                            type="primary"
                            onClick={() => downloadHandler.mutate()}
                            loading={downloadHandler.isLoading}
                        >
                            Выгрузить
                        </Button>
                        <a href="#" onClick={cliarFiltersHandler}>
                            Очистить фильтры
                        </a>
                    </div>
                </div>
            </Wrapper>
        );
    },
);
