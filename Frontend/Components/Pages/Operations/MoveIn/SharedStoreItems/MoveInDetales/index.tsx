import { Button } from 'antd';
import { observer } from 'mobx-react-lite';
import { Counter } from '../../../../../Shared/Counter';
import { TableApp } from '../../../../../Shared/Table';
import { Title } from '../../../../../Shared/Title';
import { Wrapper } from './style';
import { useProps } from './useProps';

export const MoveInDetales = observer(() => {
    const {
        numDocument,
        submitHandler,
        isLoading,
        columns,
        data,
        handleChange,
        isEditor,
        codeDifference,
        isValidCode,
        filteredData,
    } = useProps();

    return (
        <Wrapper>
            <div className="header">
                <Title text={`Принять перемещение №${numDocument}`} />
                <Button onClick={submitHandler} type="primary" loading={isLoading}>
                    Принять
                </Button>
                {isEditor && (
                    <div>
                        проверка сумм:{' '}
                        <span style={{ color: isValidCode ? undefined : 'red' }}>
                            {codeDifference}
                        </span>
                    </div>
                )}
            </div>
            <Counter data={filteredData} widthKey="widthIn" countKey="countItemsIn" />
            <TableApp columns={columns} dataSource={data} onChange={handleChange} />
        </Wrapper>
    );
});
