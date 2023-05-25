import { Footer } from './Components/Footer';
import { TopMenu } from './Components/TopMenu';
import { Wrapper } from './style';
import { observer } from 'mobx-react-lite';
import { ErrorHandler } from './Components/ErrorHandler';
import { Spin } from 'antd';
import { ConfigProvider } from 'antd';
import 'moment/locale/ru';
import locale from 'antd/lib/locale/ru_RU';
import { tPages } from '../Pages/constants';
import { QueryClientProvider } from '@tanstack/react-query';
import { GlobalStyle } from './globalStyle';
import { useProps } from './useProps';

export const LayOut = observer(
    ({ children, page }: { children: JSX.Element; page: tPages }) => {
        const { isLoading, queryClient } = useProps();

        return (
            <Spin spinning={isLoading} tip="загрузка..." style={{ height: '100%' }}>
                <ErrorHandler>
                    <QueryClientProvider client={queryClient}>
                        <ConfigProvider locale={locale}>
                            <Wrapper>
                                <GlobalStyle />
                                <TopMenu page={page} />
                                <div className="body">
                                    <div className="papper">{children}</div>
                                </div>
                                <Footer />
                            </Wrapper>
                        </ConfigProvider>
                    </QueryClientProvider>
                </ErrorHandler>
            </Spin>
        );
    },
);
