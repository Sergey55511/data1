import { MyError } from '../../../../Shared/Classes/error';

let isFree = true;

export const startQueue = (callBack: () => any) => {
    const startDate = new Date();
    return new Promise((resolve, reject) => {
        //run every 0.1 seconds
        const timer: NodeJS.Timer = setInterval(
            () =>
                queueProvider(() => {
                    isFree = true;
                    clearTimeout(timer);
                }),
            100,
        );

        //try to execute callback
        const queueProvider = async (reset: () => void) => {
            const rejectError = (err: any) => {
                reset();
                reject(err);
            };
            try {
                if (isFree) {
                    isFree = false;
                    resolve(await callBack());
                    reset();
                }
                const endDate = new Date();
                const difference = (endDate.getTime() - startDate.getTime()) / 1000;
                const isTimeError = difference > 60 * 2;
                if (isTimeError) {
                    rejectError(new MyError(504, 'queue time error'));
                }
            } catch (err) {
                rejectError(err);
            }
        };
    });
};
