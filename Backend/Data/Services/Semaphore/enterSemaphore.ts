import { isMainThread, parentPort, workerData } from 'worker_threads';
import { BinarySemaphore } from './binarySemaphore';

export const entarSemaphore = (foo: () => any) => {
    if (!isMainThread) {
        const semaphore = new BinarySemaphore(workerData.sharedArrayBuffer);
        semaphore.exec(foo);
    }
};
