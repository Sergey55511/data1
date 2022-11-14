import { Button, Tooltip } from 'antd';
import { MinusOutlined } from '@ant-design/icons';
import { Wrapper } from './style';

export const Row = ({
    isLoading,
    removeRow,
    fields,
}: {
    isLoading?: boolean;
    removeRow: () => void;
    fields: JSX.Element[];
}) => {
    return (
        <Wrapper>
            <Tooltip title="Удалить строку">
                <Button
                    shape="circle"
                    icon={<MinusOutlined />}
                    onClick={removeRow}
                    loading={isLoading}
                />
            </Tooltip>
            {fields.map((field, index) => (
                <div key={index} className="item">
                    {field}
                </div>
            ))}
        </Wrapper>
    );
};
