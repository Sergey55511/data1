const LOCKED = 1;
const UNLOCKED = 0;

export class BinarySemaphore {
    lock: Int32Array;
    constructor(shared: SharedArrayBuffer, offset = 0) {
        this.lock = new Int32Array(shared, offset, 1);
    }

    enter() {
        console.log('this.lock', this.lock);

        while (true) {
            if (Atomics.compareExchange(this.lock, 0, UNLOCKED, LOCKED) === UNLOCKED) {
                console.log('return');

                return;
            }
            console.log('wait');
            Atomics.wait(this.lock, 0, LOCKED, 1000 * 60 * 2);
        }
    }

    leave() {
        if (Atomics.compareExchange(this.lock, 0, LOCKED, UNLOCKED) !== LOCKED) {
            throw new Error('Cannot leave unlocked BinarySemaphore');
        }
        Atomics.notify(this.lock, 0, 1);
    }

    exec(callback: () => any) {
        this.enter();
        try {
            return callback();
        } finally {
            this.leave();
        }
    }
}
