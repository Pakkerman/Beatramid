// Self-adjusting timer originally from Muisc and Coding Youtube Channel https://www.youtube.com/watch?v=x8PBWobv6NY
// modified and added new feature to fit in this project
// 1. Modify taking array arguments as time intervals
// 2. Modify to use performance.now() for higher resoluation timestamping to calculate drift
// 3. Added additional options and status

export default function Timer(callback, timeIntervals, options) {
  this.isArrayFormat = Array.isArray(timeIntervals)
  this.timeIntervals = timeIntervals
  this.index = 0
  this.status = "pause"

  // Start Timer
  this.start = () => {
    this.status = "running"
    this.index = 0

    this.expected = performance.now() + (this.isArrayFormat ? this.timeIntervals[this.index] : timeIntervals)
    // the time outID
    this.theTimeoutId = null

    // OPTIONS: run immediately
    if (options?.immediate) {
      callback()
    }

    console.log("Timer Started")
    this.timeout = setTimeout(this.round, this.isArrayFormat ? this.timeIntervals[this.index] : timeIntervals)
  }

  // Method that takes care of running callback and adjusting the time interval
  this.round = () => {
    if (this.isArrayFormat) {
      if (this.index === this.timeIntervals.length) this.index = 0
    }

    const roundInterval = this.isArrayFormat ? this.timeIntervals[this.index] : timeIntervals
    let drift = performance.now() - this.expected

    // Error callback option
    if (drift > roundInterval) {
      if (options.errorCallback) {
        options.errorCallback()
      }
    }

    callback()

    // OPTIONS: show drift
    if (options?.showDrift) {
      console.log("Drift: ", parseInt(drift), "\tNext Round Time Interval: ", parseInt(roundInterval - drift))
    }

    this.expected += roundInterval

    this.timeoutId = setTimeout(this.round, roundInterval - drift)
    this.index += 1
  }

  // Stop Timer
  this.stop = () => {
    this.status = "pause"
    clearTimeout(this.timeoutId)
    console.log("Stopped")
  }
}
