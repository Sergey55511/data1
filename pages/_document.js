import { Html, Head, Main, NextScript } from 'next/document';
import { StoreContext } from '../Frontend/Store/storeContext';
import { createGlobalStyle } from 'styled-components';

export default function Document() {
    return (
        <Html>
            <Head />
            <body>
                <StoreContext>
                    <Main />
                    <NextScript />
                </StoreContext>
            </body>
        </Html>
    );
}
