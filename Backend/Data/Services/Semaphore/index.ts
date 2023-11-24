import { Worker } from 'worker_threads';
const buffer = new SharedArrayBuffer(6);

export const startQueue = (executePath: string, data: any) => {
    return new Promise((resolve, reject) => {
        const worker = new Worker(executePath, {
            workerData: { sharedArrayBuffer: buffer, data },
        });

        worker.on('message', resolve);
        worker.on('error', reject);
        worker.on('exit', (code) => {
            if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
        });
    });
};
