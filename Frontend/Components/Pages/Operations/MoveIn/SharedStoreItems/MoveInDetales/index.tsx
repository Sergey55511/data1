import { Button, Input } from 'antd';
import { ColumnsType, TableProps } from 'antd/es/table';
import { FilterValue } from 'antd/es/table/interface';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { iData, iDataTable } from '../../../../../../../Shared/Types/interfaces';
import { useStores } from '../../../../../../Store/useStores';
import { prepareDataTable } from '../../../../../Helpers';
import { InputNumber } from '../../../../../Shared/InputNumber';
import { TableApp } from '../../../../../Shared/Table';
import { KEYSLEFTOVERS } from '../../../../../Shared/Table/constants';
import { getColumnProps } from '../../../../../Shared/Table/Helpers/getColumnProps';
import { Title } from '../../../../../Shared/Title';
import { ROUTES } from '../../../../constants';
import { Wrapper } from './style';
import { useProps } from './useProps';

export const MoveInDetales = observer(() => {
    const { numDocument, submitHandler, isLoading, columns, data, handleChange } =
        useProps();

    return (
        <Wrapper>
            <div className="header">
                <Title text={`Принять перемещение №${numDocument}`} />
                <Button onClick={submitHandler} type="primary" loading={isLoading}>
                    Принять
                </Button>
            </div>
            <TableApp
                columns={columns}
                dataSource={data}
                onChange={handleChange}
                // scroll={{ x: 2000 }}
            />
        </Wrapper>
    );
});
