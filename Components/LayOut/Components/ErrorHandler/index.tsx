import { Button, Result } from 'antd';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { useStores } from '../../../../Store/useStores';
import { Wrapper } from './style';

export const ErrorHandler = observer(({ children }: { children: JSX.Element }) => {
    const { ErrorStore } = useStores();
    const isError = ErrorStore.error.isError;
    const router = useRouter();
    const is401 = ErrorStore.error.status == 401;

    if (is401) {
        router.push('/login');
        return null;
    }

    return (
        <>
            {isError ? (
                <Wrapper>
                    <Result
                        status={getStatusCode(ErrorStore.error.status)}
                        title={ErrorStore.error.status}
                        subTitle={ErrorStore.error.message}
                        extra={
                            <Button
                                type="primary"
                                onClick={() => window.location.reload()}
                            >
                                Перезагрузить
                            </Button>
                        }
                    />
                </Wrapper>
            ) : (
                children
            )}
        </>
    );
});

const getStatusCode = (status: number) => {
    switch (status) {
        case 403:
            return 403;
        case 404:
            return 404;
        case 500:
            return 500;
        default:
            return 'error';
    }
};
