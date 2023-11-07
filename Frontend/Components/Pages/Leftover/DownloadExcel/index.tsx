import { Button } from 'antd';
import { FileExcelOutlined } from '@ant-design/icons';
import { useProps } from './useProps';

export const DownloadExcel = () => {
    const { onClickHandler, isLoading } = useProps();
    return (
        <Button
            type="link"
            icon={<FileExcelOutlined />}
            style={{ marginLeft: 'auto' }}
            onClick={onClickHandler}
            loading={isLoading}
        >
            Скачать
        </Button>
    );
};
