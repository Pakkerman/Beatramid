export default function Timer(callback, timeIntervals, options) {
  this.timeIntervals = timeIntervals
  this.index = 0
  // Start Timer
  this.start = () => {
    // Set expected time
    this.expected = performance.now() + this.timeIntervals[this.index]
    this.theTimeout = null

    if (options?.immediate) {
      callback()
    }

    this.timeout = setTimeout(this.round, this.timeIntervals[this.index])
    console.log("Timer Started")
  }

  // Method that takes care of running callback and adjusting the time interval
  this.round = () => {
    if (this.index === this.timeIntervals.length) this.index = 0
    // console.log("roundInterval", this.timeIntervals[this.index])

    let drift = performance.now() - this.expected
    // check if drift is greater than time interval, run errorCallback if true
    if (drift > this.timeInterval) {
      if (options.errorCallback) {
        options.errorCallback()
      }
    }
    callback()

    this.expected += this.timeIntervals[this.index]
    if (options?.showDrift) {
      console.log("Drift", drift)
      console.log("Next Round Time Interval", this.timeIntervals[this.index] - drift)
    }
    this.timeout = setTimeout(this.round, this.timeIntervals[this.index] - drift)

    this.index += 1
  }

  // Stop Timer
  this.stop = () => {
    clearTimeout(this.timeout)
    console.log("Stopped")
  }
}

// export default function Timer(callback, timeInterval, options) {
//   this.timeInterval = 1000

//   this.timeIntervalArray = [1000, 500, 300]
//   this.index = 0
//   // Start Timer
//   this.start = () => {
//     // Set expected time
//     this.expected = performance.now() + this.timeInterval
//     this.theTimeout = null

//     if (options?.immediate) {
//       callback()
//     }

//     this.timeout = setTimeout(this.round, this.timeInterval)
//     console.log("Timer Started")
//   }

//   // Method that takes care of running callback and adjusting the time interval
//   this.round = () => {
//     if (this.index === this.timeIntervalArray.length) this.index = 0
//     console.log("roundInterval", this.timeIntervalArray[this.index])
//     this.timeInterval = this.timeIntervalArray[this.index]

//     let drift = performance.now() - this.expected
//     // check if drift is greater than time interval, run errorCallback if true
//     if (drift > this.timeInterval) {
//       if (options.errorCallback) {
//         options.errorCallback()
//       }
//     }
//     callback()

//     this.expected += this.timeInterval
//     if (options?.showDrift) {
//       console.log("Drift", drift)
//       console.log("Next Round Time Interval", this.timeInterval - drift)
//     }
//     this.timeout = setTimeout(this.round, this.timeInterval - drift)

//     this.index += 1
//   }

//   // Stop Timer
//   this.stop = () => {
//     clearTimeout(this.timeout)
//     console.log("Stopped")
//   }
// }
