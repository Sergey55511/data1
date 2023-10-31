import { useMutation } from '@tanstack/react-query';
import fileDownload from 'js-file-download';
import { leftoversExcel } from '../../../../Store/OperationStore/Api';

export const useProps = () => {
    const dowloadExcelMutation = useMutation(leftoversExcel, {
        onSuccess: (data) => {
            fileDownload(data, `Остатки.xlsx`);
        },
    });
    const isLoading = dowloadExcelMutation.isLoading;
    const onClickHandler = () => {
        dowloadExcelMutation.mutate();
    };
    return { onClickHandler, isLoading };
};
