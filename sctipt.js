import Note from "./Note.js"
import tap from "./tap.js"
import Timer from "./Timer.js"

const appContainerElement = document.querySelector("#app-container")
const bpmDisplayElement = document.querySelector("#bpm-display")
const bpmInputElement = document.querySelector("#bpm-input")
const tapAreaElement = document.querySelector("#tap")

let bpm = 60
let trackIntervals = createTrackIntervals(bpm)
const track = createTrackTimer()
bpmDisplayElement.textContent = bpm

// create notes
const quarterNote = new Note().createNote("quarter")
const eighthNote = new Note().createNote("eighth")
const tupletNote = new Note().createNote("tuplet")
const sixteenthNote = new Note().createNote("sixteenth", "mute")
const quintupletNote = new Note().createNote("quintuplet", "mute")
const sextuplet = new Note().createNote("sextuplet", "mute")

bpmInputElement.addEventListener("input", (event) => {
  const value = event.target.value
  bpm = value
  bpmDisplayElement.textContent = bpm

  trackIntervals = createTrackIntervals(bpm)
  updateTrackIntervals(trackIntervals)
})

tapAreaElement.addEventListener("click", () => {
  tapSessionTimeout()
  const tappedBpm = clamp(tap(), 20, 280)
  if (isNaN(tappedBpm)) return
  bpm = tappedBpm
  bpmDisplayElement.textContent = bpm
  bpmInputElement.value = tappedBpm

  trackIntervals = createTrackIntervals(bpm)
  updateTrackIntervals(trackIntervals)
})

let tapTimeoutId
function tapSessionTimeout() {
  clearTimeout(tapTimeoutId)
  tapAreaElement.dataset.status = "active"
  tapTimeoutId = setTimeout(() => {
    tapAreaElement.dataset.status = "idle"
  }, 3000)
}

function createTrackIntervals(bpm) {
  let trackIntervals = [0]
  const msBpm = bpmCovert(bpm)

  for (let i = 0; i < 6; i++) {
    let bpmDivision = msBpm / (i + 1)
    let accumulator = bpmDivision
    let counter = 0
    while (counter <= i) {
      trackIntervals.push(Math.round(accumulator))
      accumulator += bpmDivision
      counter += 1
    }
  }
  trackIntervals.sort((a, b) => a - b)
  trackIntervals = [...new Set(trackIntervals)]
  console.log(trackIntervals)

  return [
    0,
    ...trackIntervals.map((item, index) => {
      return trackIntervals[index + 1] - item
    }),
  ].slice(0, trackIntervals.length)
}

const activateTrack = {
  0() {
    quarterNote.activate({ restart: true, sound: "click2" })
    tupletNote.activate({ restart: true, sound: "click2" })
    eighthNote.activate({ restart: true, sound: "click3" })
    sixteenthNote.activate({ restart: true, sound: "click2" })
    quintupletNote.activate({ restart: true, sound: "click2" })
    sextuplet.activate({ restart: true, sound: "click2" })
  },
  1() {},
  2() {
    sextuplet.activate()
  },
  3() {
    quintupletNote.activate()
  },
  4() {
    sixteenthNote.activate()
  },
  5() {
    tupletNote.activate()
    sextuplet.activate()
  },
  6() {
    quintupletNote.activate()
  },
  7() {
    eighthNote.activate()
    sixteenthNote.activate()
    sextuplet.activate()
  },
  8() {
    quintupletNote.activate()
  },
  9() {
    tupletNote.activate()
    sextuplet.activate()
  },
  10() {
    sixteenthNote.activate()
  },
  11() {
    quintupletNote.activate()
  },
  12() {
    sextuplet.activate()
  },
  13() {},
}

function createTrackTimer() {
  return new Timer(
    () => {
      activateTrack[track.index]()
    },
    trackIntervals,
    { showDrift: false, immediate: false }
  )
}

document.addEventListener("keydown", (event) => {
  if (event.code !== "Space") return
  event.preventDefault()
  toggleTrackPlayPause()
})

const playPauseBtnElement = document.querySelector("#play-pause-btn")
playPauseBtnElement.addEventListener("click", toggleTrackPlayPause)

function toggleTrackPlayPause() {
  toggleBtnStatus()
  if (track.status === "pause") {
    appContainerElement.dataset.status = "active"
    track.start()
    return
  } else if (track.status === "running") {
    appContainerElement.dataset.status = "idle"
    track.stop()
    return
  }
}

function toggleBtnStatus() {
  playPauseBtnElement.dataset.status = playPauseBtnElement.dataset.status === "pause" ? "play" : "pause"
  playPauseBtnElement.querySelector("#pause-svg").classList.toggle("hide")
  playPauseBtnElement.querySelector("#play-svg").classList.toggle("hide")
}

function updateTrackIntervals(newIntervals) {
  track.timeIntervals = newIntervals
}

//helpers
function bpmCovert(bpm) {
  return 60000 / bpm
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(value, max))
}
