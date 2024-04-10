import { useMutation } from '@tanstack/react-query';
import { OptimizationData } from '../OptimizationData';
import { Wrapper } from './style';
import fileDownload from 'js-file-download';
import { leftoversExcel } from '../../../../Store/OperationStore/Api';
import { DownloadExcel } from '../../../Shared/DownloadExcel';

export const Content = () => {
    const dowloadExcelMutation = useMutation(leftoversExcel, {
        onSuccess: (data) => {
            fileDownload(data, `Остатки.xlsx`);
        },
    });
    return (
        <Wrapper>
            <OptimizationData />
            <DownloadExcel dowloadExcelMutation={dowloadExcelMutation} />
        </Wrapper>
    );
};
