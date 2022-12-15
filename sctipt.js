import Note from "./Note.js"
import tap from "./tap.js"
import Tap from "./tap.js"
const beatContainerElement = document.querySelector(".beat-container")
const fourthRowElement = document.querySelector(".fourth")
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
  quarterNote = new Note("quarter", BPM)
  eighthNote = new Note("eighth", BPM)
  tuplet = new Note("tuplet", BPM)
  sixteenthNote = new Note("sixteenth", BPM)
  quintuplet = new Note("quintuplet", BPM)
  sextuplet = new Note("sextuplet", BPM)
  septuplet = new Note("septuplet", BPM)

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
  quarterNote.startNote()
  // eighthNote.startNote()
  tuplet.startNote()
  // sixteenthNote.startNote()
  // quintuplet.startNote()
  // sextuplet.startNote()
  // septuplet.startNote()
}
function pauseBeat() {
  console.log("stoped")
  quarterNote.stopNote()
  // eighthNote.stopNote()
  tuplet.stopNote()
  // sixteenthNote.stopNote()
  // quintuplet.stopNote()
  // sextuplet.stopNote()
  // septuplet.stopNote()
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
