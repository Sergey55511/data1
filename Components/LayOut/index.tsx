import { useEffect, useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import { useStores } from '../../Store/useStores';
import { Footer } from './Components/Footer';
import { TopMenu } from './Components/TopMenu';
import { Wrapper } from './style';
import { observer } from 'mobx-react-lite';
import { ErrorHandler } from './Components/ErrorHandler';
import { Spin } from 'antd';

const GlobalStyle = createGlobalStyle`
    body {
        margin:0px;
        box-sizing: border-box;
        #__next{
          height: 100%;
        }
        .ant-spin-nested-loading {
            height: 100%;
            .ant-spin-container {
                height: 100%;
            }
        }
    }`;

export const LayOut = observer(({ children }: { children: JSX.Element }) => {
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
                <Wrapper>
                    <GlobalStyle />
                    <TopMenu />
                    <div className="body">
                        <div className="papper">{children}</div>
                    </div>
                    <Footer />
                </Wrapper>
            </ErrorHandler>
        </Spin>
    );
});
