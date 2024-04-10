import { UseMutationResult } from '@tanstack/react-query/build/lib/types';

export const useProps = (
    dowloadExcelMutation: UseMutationResult<any, unknown, void, unknown>,
) => {
    const isLoading = dowloadExcelMutation.isLoading;
    const onClickHandler = () => {
        dowloadExcelMutation.mutate();
    };
    return { onClickHandler, isLoading };
};
