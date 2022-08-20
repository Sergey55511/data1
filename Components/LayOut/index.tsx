import { createGlobalStyle } from 'styled-components';
import { Footer } from './Components/Footer';
import { TopMenu } from './Components/TopMenu';
import { Wrapper } from './style';

const GlobalStyle = createGlobalStyle`
    body {
        margin:0px;
        box-sizing: border-box;
        #__next{
          height: 100%;
        }
    }`;

export const LayOut = ({ children }: { children: JSX.Element }) => {
    return (
        <Wrapper>
            <GlobalStyle />
            <TopMenu />
            <div className="body">
                <div className="papper">{children}</div>
            </div>
            <Footer />
        </Wrapper>
    );
};
