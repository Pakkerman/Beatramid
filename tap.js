// tap method to input tempo

//get difference
// push to array
// get average
// return average
// timeout, clear current array and aveage to reset

let tapTimeStamps = []
let avg = []
let timeout

export default function tap() {
  setupTimeout()
  const tapTime = Date.now()
  const diff = recordDiffernece(tapTime)
  const avg = getAvg(diff)
  console.log(avg)

  const BPM = parseInt((1000 / avg) * 60)
  return BPM
}

function recordDiffernece(tapTime) {
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
  if (avg.length >= 2) {
    console.log(avg)
    return avg.reduce((acc, curr) => acc + curr, 0) / avg.length
  }
}

function setupTimeout() {
  //after 3 seconds clear out array and re-calculate BPM
  clearTimeout(timeout)
  timeout = setTimeout(() => {
    tapTimeStamps = []
    avg = []
    console.log("timeout")
  }, 3000)
}
