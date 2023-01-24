const NOTE_QUANTITY_MAP = {
  quarter: 1,
  eighth: 2,
  tuplet: 3,
  sixteenth: 4,
  quintuplet: 5,
  sextuplet: 6,
  septuplet: 7,
}

const AUDIOFILES = {
  click1: new Audio("./sounds/click1.wav"),
  click2: new Audio("./sounds/click2.mp3"),
  click3: new Audio("./sounds/click3.mp3"),
}

export default class Note {
  constructor(type) {
    this.type = type
    this.elements = []
    this.elementIndex = 0
    this.counter = 0
  }

  // use create not method to create note with
  createNote(type, status = "active") {
    this.type = type
    const rowElement = document.querySelector(`#${type}-row`)
    rowElement.innerHTML = ""
    for (let i = 0; i < NOTE_QUANTITY_MAP[type]; i++) {
      const element = document.createElement("div")
      element.classList.add("beat-ctrl")
      element.setAttribute("data-status", status)
      element.setAttribute("data-appearance", "idle")
      element.addEventListener("click", (event) => this.mute(event))

      this.elements.push(element)
      rowElement.append(element)
    }
    return this
  }

  activate({ restart = false, sound = "click3" } = {}) {
    if (restart === true) this.elementIndex = 0

    this.flash(this.elements[this.elementIndex])
    this.playSound(this.elements[this.elementIndex], sound)
    this.incrementIndex()
  }

  flash(element) {
    if (element.dataset.status === "mute") return
    element.dataset.appearance = "active"
    setTimeout(() => {
      element.dataset.appearance = "idle"
    }, 50)
  }

  playSound(element, sound) {
    if (element.dataset.status === "mute") return
    AUDIOFILES[sound].volume = 0.2
    AUDIOFILES[sound].currentTime = 0
    AUDIOFILES[sound].play()
  }

  incrementIndex() {
    const elementQuantity = this.elements.length
    this.elementIndex =
      this.elementIndex === elementQuantity - 1 ? 0 : this.elementIndex + 1
  }

  mute({ target }) {
    const status = target.dataset.status
    target.dataset.status = status === "active" ? "mute" : "active"
  }
}
