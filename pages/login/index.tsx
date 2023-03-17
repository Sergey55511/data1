import Login from '../../Frontend/Components/Pages/login';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();

export default () => (
    <QueryClientProvider client={queryClient}>
        <Login />
    </QueryClientProvider>
);
