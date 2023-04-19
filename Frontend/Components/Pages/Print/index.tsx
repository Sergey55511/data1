import { QueryClientProvider } from '@tanstack/react-query';
import { useQueryClient } from '../../LayOut/useQueryClient';
import { PrintBlank } from './Blank';

export const Print = () => {
    const queryClient = useQueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <PrintBlank />
        </QueryClientProvider>
    );
};
