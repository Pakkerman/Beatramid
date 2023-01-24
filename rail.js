import Note from "./Note.js"

// create notes
const quarterNote = new Note().createNote("quarter")
const eighthNote = new Note().createNote("eighth")
const tupletNote = new Note().createNote("tuplet")
const sixteenthNote = new Note().createNote("sixteenth", "mute")
const quintupletNote = new Note().createNote("quintuplet", "mute")
const sextuplet = new Note().createNote("sextuplet", "mute")

// The main track rail that timer will run on, is for up to sextuplet only,
// If want to add septuplet or 32th note, rail will need to be modified,
// and the intervals might get smaller than the drift, or too close to the drift
const rail = {
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

export default rail
