import { NextApiResponse } from 'next';

export const logger = (res: NextApiResponse) => {
    try {
        console.log(new Date(), res?.req?.method, res?.req?.url, res?.statusCode);
    } catch (err) {
        console.log(new Date(), 'logger broken');
    }
};
