import Note from "./Note.js"
import tap from "./tap.js"
import Tap from "./tap.js"
import Timer from "./Timer.js"
const beatContainerElement = document.querySelector(".beat-container")
const quarterRowElement = document.querySelector(".quarter")
const eighthRowElement = document.querySelectorAll(".eighth")
const tupletRowElement = document.querySelectorAll(".tuplet")
const sixteenthRowElement = document.querySelectorAll(".sixteenth")
const beatCtrlElement = document.querySelector(".beat-ctrl")
const playButtonElement = document.querySelector("#play-button")

const tapElement = document.querySelector("#tap")

const BPMinputElement = document.querySelector("#BPM-input")
const BPMDisplay = document.querySelector("#BPM-display")
let BPM = 60
let quarterNote = new Note("quarter", BPM)
let eighthNote = new Note("eighth", BPM)
let tuplet = new Note("tuplet", BPM)
let sixteenthNote = new Note("sixteenth", BPM)
let quintuplet = new Note("quintuplet", BPM)
let sextuplet = new Note("sextuplet", BPM)
let septuplet = new Note("septuplet", BPM)

function initDOM() {
  BPMDisplay.innerHTML = BPM
}

initDOM()

//BPM input
BPMinputElement.addEventListener("input", (event) => {
  const BPMInput = event.target.value
  updateBPM(BPMInput)
  BPMDisplay.innerHTML = BPMInput
})

function updateBPM(input) {
  BPM = input
  BPMDisplay.innerHTML = input
  BPMinputElement.value = input
  pauseBeat()
  // quarterNote = new Note("quarter", BPM)
  // eighthNote = new Note("eighth", BPM)
  // tuplet = new Note("tuplet", BPM)
  // sixteenthNote = new Note("sixteenth", BPM)
  // quintuplet = new Note("quintuplet", BPM)
  // sextuplet = new Note("sextuplet", BPM)
  // septuplet = new Note("septuplet", BPM)

  startBeat()
}

// using a main thread object to contain all the notes, notes devide time to detemeter
// when to be active and play sound

// create Beat class
// start and pause buttons
// beat with sound, find some simple beats
// control to skip note

// Start playing method #1
// have each type of beat their own row
// each row is a thread that answer to the play/pause of the app
// each thread will play their notes in side the row
// each note will have behaivor:
// beep, play the note and flash 100ms on the DOM
// mute, this will mute the sound and icon will appear disable
// accent, different accentst to choose via right click show with differnet color
//

// ---LOG---
// get row thread working
// finish the main playing function, each row is separated from each other, but start at the same time
// added mute function and
// added adjestable BPM slider
// added tap bpm function

// build a thread containing all the beats

let masterThread = [
  { beatType: "quarter", beatDurationDivision: 1, isActive: false },
  { beatType: "eighth", beatDurationDivision: 2, isActive: true },
  { beatType: "tuplet", beatDurationDivision: 3, isActive: true },
  { beatType: "sixeteenth", beatDurationDivision: 4, isActive: false },
  { beatType: "quintuplet", beatDurationDivision: 5, isActive: false },
  { beatType: "sixtuplet", beatDurationDivision: 6, isActive: true },
]

//create interval array
let intervalArray = createIntervalArray()
console.log(intervalArray, typeof intervalArray)

function createIntervalArray() {
  const intervalArray = [0]
  masterThread.forEach((beat) => {
    const { beatType, beatDurationDivision, isActive } = beat
    if (beatDurationDivision === 1) return
    let durations = getDurations(beatDurationDivision)
    intervalArray.push(...durations)

    function getDurations(division) {
      const duration = 60000 / BPM / division
      let counter = duration
      let result = []
      while (counter < 60000 / BPM) {
        result.push(Math.round(counter))
        counter += duration
      }
      return result
    }
  })
  const sorted = [...new Set(intervalArray.sort((a, b) => a - b))]

  console.log(sorted)

  return sorted.map((item, index) => {
    if (isNaN(sorted[index + 1])) return 67
    return sorted[index + 1] - sorted[index]
    // if (index === ) return time
    // return sorted[index] - sorted[index - 1]
  })
}

let threadCount = 0
// const track = [[1, 2, 3, 4, 5, 6], [6], [5], [4], [3, 6], [5], [2], [5], [3, 6], [4], [5], [6]]
const track = [[1, 2, 4, 7], [], [], [8], [5], [9], [3], [], [6], [10], [], []]
const beatId = {
  1: quarterRowElement,
  2: eighthRowElement[0],
  3: eighthRowElement[1],
  4: tupletRowElement[0],
  5: tupletRowElement[1],
  6: tupletRowElement[2],
  7: sixteenthRowElement[0],
  8: sixteenthRowElement[1],
  9: sixteenthRowElement[2],
  10: sixteenthRowElement[3],
}

function startMasterThread() {
  console.time("now")
  if (threadCount === intervalArray.length - 1) threadCount = 0
  playNote(track[threadCount])
  console.log(track[threadCount], threadCount)

  threadCount += 1

  function playNote(count) {
    count.forEach((item) => {
      requestAnimationFrame(() => noteFlash(beatId[item]))
    })
  }
  function noteFlash(element) {
    element.dataset.appearance = "active"
    setTimeout(() => {
      element.dataset.appearance = "idle"
    }, 50)
  }
  console.timeEnd("now")
}

const masterThreadTimer = new Timer(startMasterThread, intervalArray, { immediate: true, showDrift: true })

masterThreadTimer.start()
setTimeout(() => {
  // masterThreadTimer.stop()
}, 1000)

if (playButtonElement.dataset.state === "play") {
  startBeat()
}

beatContainerElement.addEventListener("click", (event) => {
  toggleMute(event.target)
})

playButtonElement.addEventListener("click", (event) => {
  const state = playButtonElement.dataset.state
  if (state === "pause") {
    startBeat()
    playButtonElement.dataset.state = "play"
    playButtonElement.textContent = "pause"
  } else if (state === "play") {
    pauseBeat()
    playButtonElement.dataset.state = "pause"
    playButtonElement.textContent = "play"
  }
})

function startBeat() {
  console.log("playing")
  // quarterNote.startNote()
  // eighthNote.startNote()
  // tuplet.startNote()
  // sixteenthNote.startNote()
  // quintuplet.startNote()
  // sextuplet.startNote()
  // septuplet.startNote()
}
function pauseBeat() {
  console.log("stoped")
  // quarterNote.stopNote()
  // eighthNote.stopNote()
  // tuplet.stopNote()
  // sixteenthNote.stopNote()
  // quintuplet.stopNote()
  // sextuplet.stopNote()
  // septuplet.stopNote()
  masterThreadTimer.stop()
}

function toggleMute(element) {
  if (element.dataset.status === "active") {
    element.dataset.status = "mute"
  } else if (element.dataset.status === "mute") {
    element.dataset.status = "active"
  }
}

tapElement.addEventListener("click", () => {
  const tapBPM = tap()
  if (!isNaN(tapBPM)) updateBPM(tapBPM)
})
