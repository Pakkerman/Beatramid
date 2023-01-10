// Return new bpm value by calling tap function 3 or more times
// This function will use Date.now() to create timestamps, calculate difference between 2 taps
// Pushing into an array of avg difference, and reduce and convert to bpm
// Finally returning the value
// Tap will reset by clearout avg array after 3 second of not being called

let tapTimeStamps = []
let isActive = false
let avg = []
let timeout

export default function tap() {
  isActive = true
  clearTapSession()
  const tapTime = Date.now()
  const diff = calculateDiff(tapTime)
  const avg = getAvg(diff)
  // console.log(avg)

  const BPM = parseInt((1000 / avg) * 60)
  return BPM
}

function calculateDiff(tapTime) {
  tapTimeStamps.push(tapTime)
  if (tapTimeStamps.length === 3) {
    tapTimeStamps.shift()
    const diff = tapTimeStamps[1] - tapTimeStamps[0]
    return diff
  }
}

function getAvg(diff) {
  if (diff) {
    avg.push(diff)
  }
  if (avg.length >= 1) {
    console.log(avg)
    return avg.reduce((acc, curr) => acc + curr, 0) / avg.length
  }
}

function clearTapSession() {
  clearTimeout(timeout)
  timeout = setTimeout(() => {
    tapTimeStamps = []
    avg = []
    console.log("Tap area reset")
    isActive = false
  }, 3000)
}


