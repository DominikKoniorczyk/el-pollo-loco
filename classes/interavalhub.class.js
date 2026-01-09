/**
 * Creats a new IntervalHub.
 * @class
 */
export class IntervalHub {

    static allIntervals = [];

    constructor() {
    }   

    /**
     * Starts a new interval and stores it for later clearing.
     * @param {Function} callback - The function to execute repeatedly.
     * @param {number} intervalTime - Time in milliseconds between executions.
     */
    static startInterval(callback, intervalTime) {
        const newInterval = setInterval(callback, intervalTime);
        this.allIntervals.push(newInterval);
    }
    
    /**
     * Clears all stored intervals and resets the interval list.
     */
    static clearAllIntervals() {
        this.allIntervals.forEach(interval => clearInterval(interval));
        this.allIntervals = [];
    }
}
