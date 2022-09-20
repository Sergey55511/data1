import { useEffect, useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import { useStores } from '../../Store/useStores';
import { Footer } from './Components/Footer';
import { TopMenu } from './Components/TopMenu';
import { Wrapper } from './style';
import { observer } from 'mobx-react-lite';
import { ErrorHandler } from './Components/ErrorHandler';
import { Spin } from 'antd';
import { ConfigProvider } from 'antd';
import locale from 'antd/lib/locale/ru_RU';
import { tPages } from '../Pages/constants';

const GlobalStyle = createGlobalStyle`
    body {
        margin:0px;
        box-sizing: border-box;
        #__next{
          height: 100%;
        }
        .ant-spin-nested-loading {
            height: 100%;
            overflow-y: auto;
            overflow-x: clip;
            .ant-spin-container {
                height: 100%;
            }
        }
    }`;

export const LayOut = observer(
    ({ children, page }: { children: JSX.Element; page: tPages }) => {
        const { loginStore } = useStores();
        const [isLoading, setIsLoading] = useState(true);

        useEffect(() => {
            const whoami = async () => {
                await loginStore.whoami();
                setIsLoading(false);
            };
            if (!loginStore.user.login) {
                whoami();
            } else {
                setIsLoading(false);
            }
        }, []);

        return (
            <Spin spinning={isLoading} tip="загрузка..." style={{ height: '100%' }}>
                <ErrorHandler>
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
                </ErrorHandler>
            </Spin>
        );
    },
);
