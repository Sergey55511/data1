import { Button } from 'antd';
import { FileExcelOutlined } from '@ant-design/icons';
import { useProps } from './useProps';
import { UseMutationResult } from '@tanstack/react-query/build/lib/types';

export const DownloadExcel = ({
    dowloadExcelMutation,
}: {
    dowloadExcelMutation: UseMutationResult<any, unknown, void, unknown>;
}) => {
    const { onClickHandler, isLoading } = useProps(dowloadExcelMutation);
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
