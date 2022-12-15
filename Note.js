const NOTE_TYPE = {
  quarter: 1,
  eighth: 2,
  tuplet: 3,
  sixteenth: 4,
  quintuplet: 5,
  sextuplet: 6,
  septuplet: 7,
}

// divide all note and give the play and render function blocks for notes for fall into
// and play when it is pass by?
// how many division do the main thread obj needs?
// lets say 60 bpm, 1 beat is 1 second
// quarter:     1000
// eighth:      500
// tuplet:      333
// sixteenth:   250
// quintuplet:  200
// sextuplet:   166
// septuplet:   143

export default class Note {
  constructor(noteType, BPM) {
    this.type = noteType
    this.BPM = BPM
    this.timeDivision = NOTE_TYPE[noteType]
    this.intervalID
    this.element = document.querySelectorAll(`.${noteType}`)
  }

  startNote() {
    //issue: after pressing play it will delay 1 BPM before start playing
    this.playNote()
    intervalID = setTimeout(() => {
      this.startNote()
    }, 1000)
    // this.intervalID = setInterval(() => {}, (60 / this.BPM) * 1000)
  }

  playNote() {
    const noteTiming = this.getNoteTimeArray(this.timeDivision)
    this.element.forEach((item, index) => {
      setTimeout(() => {
        if (item.dataset.status === "active") {
          this.noteFlash(item)
          // this.playSound()
        }
      }, noteTiming[index])
    })
  }

  // startNote() {
  //   //issue: after pressing play it will delay 1 BPM before start playing
  //   const noteTiming = this.getNoteTimeArray(this.timeDivision)
  //   this.intervalID = setInterval(() => {
  //     this.element.forEach((item, index) => {
  //       setTimeout(() => {
  //         if (item.dataset.status === "active") {
  //           this.noteFlash(item)
  //           // this.playSound()
  //         }
  //       }, noteTiming[index])
  //     })
  //   }, (60 / this.BPM) * 1000)
  // }

  stopNote() {
    clearInterval(this.intervalID)
  }

  getNoteTimeArray(timeDivision) {
    const noteDuration = ((60 / this.BPM) * 1000) / this.timeDivision // how long the note last in ms
    const beatLength = (60 / this.BPM) * 1000 // the length of the tempo beat in ms
    const timingArray = [] // return this array containing the interval of each note in a beatLength
    let currentTime = 0
    while (currentTime < beatLength) {
      timingArray.push(currentTime)
      currentTime += noteDuration
    }
    return timingArray
  }

  noteFlash(element) {
    element.dataset.appearance = "active"
    setTimeout(() => {
      element.dataset.appearance = "idle"
    }, 50)
  }

  playSound() {
    const audio = new Audio("sounds/click1.wav")
    audio.play()
  }
}