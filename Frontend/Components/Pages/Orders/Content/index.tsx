import { DownloadExcel } from '../../../Shared/DownloadExcel';
import { Wrapper } from './style';
import { useMutation } from '@tanstack/react-query';
import fileDownload from 'js-file-download';
import { ordersExcel } from '../../../../Store/OperationStore/Api';

export const Content = () => {
    const dowloadExcelMutation = useMutation(ordersExcel, {
        onSuccess: (data) => {
            fileDownload(data, `Задачи в работе.xlsx`);
        },
    });
    return (
        <Wrapper>
            <DownloadExcel dowloadExcelMutation={dowloadExcelMutation} />
        </Wrapper>
    );
};
