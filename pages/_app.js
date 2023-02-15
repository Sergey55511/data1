import 'antd/dist/antd.css';
import { sendData } from '../Backend/Data/Requests/Data/sendData';
// import { sendData } from 'Backend/Data/Requests/Data/sendData.ts';

function MyApp({ Component, pageProps }) {
    sendData();
    return <Component {...pageProps} />;
}

export default MyApp;
