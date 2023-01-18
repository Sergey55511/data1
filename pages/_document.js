import { Html, Head, Main, NextScript } from 'next/document';
import { StoreContext } from '../Frontend/Store/storeContext';

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
