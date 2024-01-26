import { MyError } from '../../../../Shared/Classes/error';

let isFree = true;
let numberOfQueue = 0;

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
            console.log('test queue:', new Date(), isFree, numberOfQueue);

            const rejectError = (err: any) => {
                reset();
                reject(err);
            };
            try {
                if (isFree) {
                    isFree = false;
                    numberOfQueue++;
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
