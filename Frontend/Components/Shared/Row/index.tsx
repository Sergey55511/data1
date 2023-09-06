import { Button, Tooltip } from 'antd';
import { MinusOutlined, CopyOutlined } from '@ant-design/icons';
import { Wrapper } from './style';

export interface iPropsRow {
    isLoading?: boolean;
    removeRow: () => void;
    copyRow: () => void;
    fields: JSX.Element[];
    width?: Array<string | undefined>;
    isDuplicate?: boolean;
}

export const Row = ({
    isLoading,
    removeRow,
    copyRow,
    fields,
    width,
    isDuplicate,
}: iPropsRow) => {
    return (
        <Wrapper className={isDuplicate ? 'duplicate' : ''}>
            <Tooltip title="Удалить строку">
                <Button
                    shape="circle"
                    icon={<MinusOutlined />}
                    onClick={removeRow}
                    loading={isLoading}
                />
            </Tooltip>
            <Tooltip title="Копировать строку">
                <Button
                    shape="circle"
                    icon={<CopyOutlined />}
                    onClick={copyRow}
                    loading={isLoading}
                />
            </Tooltip>
            {fields.map((field, index) => {
                const wdth = width ? width[index] : '';
                return (
                    <div key={index} className="item" style={{ width: wdth }}>
                        {field}
                    </div>
                );
            })}
        </Wrapper>
    );
};
