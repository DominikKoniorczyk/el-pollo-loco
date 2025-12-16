export class IntervalHub {

    static allIntervals = [];

    constructor() {
    }   

    static startInterval(callback, intervalTime) {
        const newInterval = setInterval(callback, intervalTime);
        this.allIntervals.push(newInterval);
    }

    static clearAllIntervals() {
        this.allIntervals.forEach(interval => clearInterval(interval));
        this.allIntervals = [];
    }
}
