# **Beatramid**

## **Description:**

As a bedroom guitarist, I often struggled with getting a feel for rhythms. Most metronomes only provide a single beat, but I needed a way to practice different types of notes at various speeds and mix them into any pattern.

That's where Beatramid came in. It's a advanced metronome built in JavaScript, with visualization of different types of notes that runs on most modern browsers.

Beatramid lets you customize your own note combinations, adjust the tempo (bpm) to your liking, or use the tap function to set the bpm based on your desired speed.

The goal of Beatramid is to provide an easy-to-use visualization of commonly used timing of notes to assist with instrument practice sessions.

#

### **Video Demo:** https://youtu.be/5z8qURV3Xms

#

### **Usage and Requirements**

Open with VScode and Live Server extension

#

## **Project Info**

Mainly build with vanilla JS with some more advanced methods and concepts.

Project is mostly follows object oriented programming principles

### **Challenges**

The biggest obstacle is accounting for the drifting between beats. Because of the way browser works, JavaScript is running on an Event Loop. The callstack isn't accurate on time every time, is only roughly accurate.

Because of this, notes cannot just be played simply by using setInterval() or setTimeout(), the delay will add up over time significantly.

So self adjusting timer is used. But it is still not enough for the synchronization of different notes. They will self-adjusting in a different rate and end up running asynchronously.

### **Solutions**

By only using one timer to account for all the notes. This way all notes will be played on the correct time with minimal drift .

Calculate current bpm and timer intervals that needed to be feed into the timer.

Containing all notes in a single object that runs on a single timer.

Finally adding a counter to count how many times the timer is executed, and execute the corresponding note in the object

Eliminating all drift and asynchronous issues.

#

## **File Contents**

> **index.html**

> **style.css**

> **script.js**
>
> - Contains main structure of the app.
> - After the bpm is set, the createTrackIntervals() function will, create a new interval array then pass to Timer Object to be process.
> - activateTrack object contains all sequences of notes objects. Everytime the Timer is executed the next item in the object will also be executed

> **tap.js**
>
> - contains tap function and returns new bpm value if user tapped 3 or more times, more taps will make the bpm more accurate.

> **Timer.js**
>
> - Timer object, that govern when notes to be played
>   Self-adjusting timer originally from [Muisc and Coding](https://www.youtube.com/watch?v=x8PBWobv6NY) Youtube Channel
>   modified and added new feature to fit in this project
> - Modifed to take array as arguments for time intervals
> - Modifed to use performance.now() for higher resoluation timestamping to calculate drift
> - With additional options and stats for debugging and testing

> **Note.js**
>
> - Note object, handles note related logics, including creation of the correct type of note and elements, playing and muting note sounds
> - Creates new note object and along with html elements
> - All visual rendering and playing sound is handle in Note object

#

## **How to Use**

### Setting BPM With 2 Methods

- Using the slider to set bpm
- Using the tap area to set bpm

### Set Notes to Play or Mute

- Simply by clicking on the note set play or mute, white means play, gray means muted

### Start or Pause Metronome

- By clicking the start and pause button at the bottom of the app
- By pressing space on the keyboard

#

## **Author**

Wang Paike

#

## **Other Informations**

This project is for Harvard CS50x 2023 course.

#
