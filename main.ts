input.onButtonPressed(Button.A, function () {
    if (!(Pause)) {
        Pause = true
        basic.showNumber(LeftPlayerScore)
        basic.pause(1000)
        Pause = false
    }
})
input.onButtonPressed(Button.AB, function () {
    control.reset()
})
input.onButtonPressed(Button.B, function () {
    if (!(Pause)) {
        Pause = true
        basic.showNumber(RightPlayerScore)
        basic.pause(1000)
        Pause = false
    }
})
let goal1 = 0
let goal = 0
let Pause = false
let RightPlayerScore = 0
let LeftPlayerScore = 0
let LeftPlayer = "Player 1"
let RightPlayer = "Player 2"
LeftPlayerScore = 0
RightPlayerScore = 0
let ScoreToWin = 5
let MatchTime = 3
basic.showArrow(ArrowNames.North)
while (!(input.logoIsPressed())) {
    basic.pause(1)
}
basic.clearScreen()
proportionalFont.showString("" + LeftPlayer + " vs " + RightPlayer, 150)
proportionalFont.showSpace(5, 150)
basic.pause(500)
basic.showString("GO!")
music.setVolume(255)
music.playTone(466, music.beat(BeatFraction.Whole))
music.rest(music.beat(BeatFraction.Whole))
music.playTone(466, music.beat(BeatFraction.Whole))
music.rest(music.beat(BeatFraction.Whole))
music.playTone(466, music.beat(BeatFraction.Whole))
music.rest(music.beat(BeatFraction.Whole))
music.playTone(932, music.beat(BeatFraction.Double))
basic.pause(1000)
Pause = false
let StartTime = control.millis()
basic.forever(function () {
    goal = pins.digitalReadPin(DigitalPin.P1)
    goal1 = pins.digitalReadPin(DigitalPin.P2)
    if (goal1 == 0 && !(goal == 0)) {
        Pause = true
        RightPlayerScore += 1
        music.startMelody(music.builtInMelody(Melodies.PowerDown), MelodyOptions.Once)
        basic.showNumber(RightPlayerScore)
        basic.pause(500)
        goal1 = 0
        Pause = false
    }
    if (goal == 0 && !(goal1 == 0)) {
        Pause = true
        LeftPlayerScore += 1
        music.startMelody(music.builtInMelody(Melodies.PowerUp), MelodyOptions.Once)
        basic.showNumber(LeftPlayerScore)
        basic.pause(500)
        goal = 0
        Pause = false
    }
})
basic.forever(function () {
    if (control.millis() > StartTime + MatchTime * 60000 || (LeftPlayerScore > ScoreToWin || RightPlayerScore > ScoreToWin)) {
        Pause = true
        music.startMelody(music.builtInMelody(Melodies.Dadadadum), MelodyOptions.Once)
        basic.showLeds(`
            # # # # #
            # . # . #
            # . # . #
            # . . . #
            # # # # #
            `)
        basic.pause(1000)
        if (LeftPlayerScore > RightPlayerScore) {
            while (true) {
                proportionalFont.showString("" + LeftPlayer + " wins!", 150)
            }
        } else if (LeftPlayerScore < RightPlayerScore) {
            while (true) {
                proportionalFont.showString("" + RightPlayer + " wins!", 150)
            }
        } else {
            while (true) {
                proportionalFont.showString("Draw!", 150)
            }
        }
    } else if (!(Pause)) {
        led.plotBarGraph(
        StartTime + MatchTime * 60000 - control.millis(),
        MatchTime * 60000
        )
    }
})
