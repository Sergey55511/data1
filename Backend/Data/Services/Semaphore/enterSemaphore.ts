import { isMainThread, parentPort, workerData } from 'worker_threads';
import { BinarySemaphore } from './binarySemaphore';

export const enterSemaphore = (foo: (data: any) => any) => {
    if (!isMainThread) {
        const semaphore = new BinarySemaphore(workerData.sharedArrayBuffer);
        semaphore.exec(async () => parentPort?.postMessage(await foo(workerData.data)));
    }
};
