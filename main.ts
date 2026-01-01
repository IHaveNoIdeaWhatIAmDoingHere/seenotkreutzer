namespace SpriteKind {
    export const raft = SpriteKind.create()
    export const ship = SpriteKind.create()
    export const swimmer = SpriteKind.create()
    export const paused = SpriteKind.create()
    export const chopper = SpriteKind.create()
    export const finder = SpriteKind.create()
    export const hospital = SpriteKind.create()
    export const burningShip = SpriteKind.create()
    export const map2 = SpriteKind.create()
    export const treassure = SpriteKind.create()
}
namespace StatusBarKind {
    export const Fuel = StatusBarKind.create()
    export const Pos = StatusBarKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Released, function () {
    if (maxCruiserSpeed != 0) {
        maxCruiserSpeed = 100
    }
    if (finderOn == 0) {
    	
    } else {
        finderOn = 0
        finder2.destroy()
    }
})
function CreateTressure () {
    if (info.score() > lastTreasureScore) {
        if (Math.percentChance(16)) {
            if (CountTressure <= 1 && (info.life() == 3 && info.score() > 300 && game.runtime() > 200000)) {
                CountTressure = 1
                Treassure = sprites.create(img`
                    . . . . . . . 5 . . . . . . . . 
                    . . . . f . . . . . . . 5 . . . 
                    . . f f f f . . . . . . . . . . 
                    . f e e e e . 5 . . 5 . . . . . 
                    f e e e e e . . . . . . . . . 5 
                    f e e e e e . 5 . . . . . . . . 
                    f e e e e 5 4 5 5 5 . . 5 . . . 
                    . f e e e 4 5 5 5 5 5 . . . . . 
                    . f e e e 5 5 5 4 5 4 5 . . . . 
                    . . f e 4 5 4 5 5 5 5 5 . 5 . 5 
                    . . . f f f f f f f f f f . . . 
                    . . . f e e e e e e e e f . . . 
                    . . . f e e e e e e e e f . . . 
                    . . . f e e e e e e e e f . . . 
                    . . . f e e e e e e e e f . . . 
                    . . . f e e e e e e e e f . . . 
                    `, SpriteKind.treassure)
                tiles.placeOnRandomTile(Treassure, assets.tile`myTile20`)
            }
        }
    }
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile1`, function (sprite, location) {
    if (info.life() < 3) {
        info.setLife(3)
        statusbar.value = statusbar.max
        game.showLongText("Das Schiff wurde repariert und aufgetankt", DialogLayout.Center)
    } else {
        if (statusbar.value < statusbar.max - 100) {
            statusbar.value = statusbar.max
            game.showLongText("Das Schiff wurde aufgetankt", DialogLayout.Center)
        }
    }
})
scene.onHitWall(SpriteKind.swimmer, function (sprite2, location2) {
    RandNewSpeed(sprite2, 1, 1)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (GameInitDone == 1) {
        if (maxCruiserSpeed != 0) {
            maxCruiserSpeed = 250
        }
        if (CruiserOrientation == 0) {
            WaterY = -80
            WaterX = 0
        }
        if (CruiserOrientation == 180) {
            WaterY = 80
            WaterX = 0
        }
        if (CruiserOrientation == 90) {
            WaterY = 0
            WaterX = 80
        }
        if (CruiserOrientation == 270) {
            WaterY = 0
            WaterX = -80
        }
        Water = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . 1 . . . . . . . . . 
            . . . . . 8 9 8 9 . . . . . . . 
            . . . . 1 9 8 9 8 . . . . . . . 
            . . . . . 8 9 8 9 1 . . . . . . 
            . . . . . 9 8 9 8 . . . . . . . 
            . . . . . . . 1 . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, Cruiser, WaterX + randint(-20, 20), WaterY + randint(-20, 20))
        Water.setFlag(SpriteFlag.GhostThroughWalls, true)
    }
})
function PlaceOnTopRandom (mySprite: Sprite) {
    if (Math.percentChance(25)) {
        tiles.placeOnRandomTile(mySprite, assets.tile`myTile3`)
    } else {
        tiles.placeOnRandomTile(mySprite, assets.tile`myTile2`)
    }
}
function B_Diff1 () {
    sprites.destroy(PosBarHaverist)
    if (finderOn == 0) {
        finderOn = 1
        if (Difficulty == 1) {
            PosBarHaverist = statusbars.create(0, 3, StatusBarKind.Pos)
            PosBarHaverist.positionDirection(CollisionDirection.Bottom)
            PosBarHaverist.setOffsetPadding(-80, 15)
        }
        finder2 = sprites.create(assets.image`finder0`, SpriteKind.finder)
        finder2.destroy()
        if (CountBurningShips >= 1) {
            CalcPosition(BurnShip)
            game.showLongText("Eine Rettungsinsel wurde bei Position " + CalcPositionReturn + " gesichtet - überprüfe was da los ist! ", DialogLayout.Top)
        } else if (Math.percentChance(50) && CountSwimmers > 0) {
            CalcPosition(swimmer1)
            game.showLongText("Eine im Wasser treibende Person wurde bei Position " + CalcPositionReturn + " gesichtet - überprüfe was da los ist! ", DialogLayout.Top)
        } else if (CountRafts > 0) {
            CalcPosition(RAFT1)
            game.showLongText("Eine Rettungsinsel wurde bei Position " + CalcPositionReturn + " gesichtet - überprüfe was da los ist! ", DialogLayout.Top)
        } else {
            finderOn = 0
            sprites.destroy(PosBarHaverist)
        }
        PosBarHaverist.setLabel(CalcPositionReturn)
    } else {
        finderOn = 0
        sprites.destroy(PosBarHaverist)
    }
}
statusbars.onZero(StatusBarKind.Fuel, function (status) {
    game.showLongText("dein Tank ist leer!", DialogLayout.Bottom)
    game.over(false, effects.dissolve)
})
function SetDifficulty () {
    console.log("set Diff")
    blockMenu.setColors(2, 1)
    blockMenu.setControlsEnabled(true)
    blockMenu.showMenu(["Einfach", "Schwer"], MenuStyle.List, MenuLocation.FullScreen)
}
scene.onHitWall(SpriteKind.raft, function (sprite3, location3) {
    RandNewSpeed(sprite3, 3, 8)
})
function rescue () {
    effects.clearParticles(Cruiser)
    if (finderOn == 1) {
        finderOn = 0
        finder2.destroy()
    }
    music.powerUp.play()
    Cruiser.say("Gerettet!", 1000)
    if (Math.percentChance(50) && game.ask("Hubschrauber anfordern?")) {
        Cruiser.setVelocity(0, 0)
        maxCruiserSpeed = 0
        controller.moveSprite(Cruiser, maxCruiserSpeed, maxCruiserSpeed)
        Cruiser.say("wir brauchen einen Hubschrauber!", 2000)
        pause(1500)
        hospital2 = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.hospital)
        tiles.placeOnRandomTile(hospital2, assets.tile`hospital2`)
        chopper2 = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.chopper)
        animation.runImageAnimation(
        chopper2,
        [img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . 4 . . . . . . . . . . 4 . . . 
            . . f . . 9 9 9 9 . . f . . . . 
            . . . f . 9 5 5 9 . f . . . . . 
            . . . . f 9 5 5 9 f . . . . . . 
            . . . . . f 5 5 f . . . . . . . 
            . . . . . 5 f f 5 . . . . . . . 
            . . . . . 5 f f 5 . . . . . . . 
            . . . . . f 5 5 f . . . . . . . 
            . . . . f . 5 5 . f . . . . . . 
            . . . f . . . 5 . . f . . . . . 
            . . f . . . . 5 . . . f . . . . 
            . 4 . . . . . 5 . . . . 4 . . . 
            . . . . . . . 5 . . . . . . . . 
            . . . . . . f 5 5 . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . 4 . . . . . . . . . . . . 
            . . . . f . . . . . . . . . . . 
            . . . . . f 9 9 9 . . . . . . . 
            . . . . . f 5 5 9 . . . . 4 . . 
            . . . . . 9 f 5 9 . . . f . . . 
            . . . . . 5 f 5 5 . f f . . . . 
            . . . . . 5 f f f f . . . . . . 
            . . . . f f f f 5 . . . . . . . 
            . . f f . 5 5 f 5 . . . . . . . 
            . f . . . . 5 f . . . . . . . . 
            4 . . . . . . 5 f . . . . . . . 
            . . . . . . . 5 f . . . . . . . 
            . . . . . . . 5 . f . . . . . . 
            . . . . . . . 5 . . 4 . . . . . 
            . . . . . . f 5 5 . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . 4 . . . . . . . . . 
            . . . . . . f . . . . . . . . . 
            . . . . . 9 f 9 9 . . . . . . . 
            . . . . . 9 f 5 9 . . . . . . . 
            . . . . . 9 f 5 9 . . . . . . . 
            . . . . . 5 f 5 5 . . . . . . . 
            . . . . . 5 f f f f f f f f 4 . 
            4 f f f f f f f 5 . . . . . . . 
            . . . . . 5 5 f 5 . . . . . . . 
            . . . . . . 5 f . . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . . f . . . . . . . . 
            . . . . . . . 4 . . . . . . . . 
            . . . . . . f 5 5 . . . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . 4 . . . . . 
            . . . . . . . . . f . . . . . . 
            . . . . . 9 9 9 f . . . . . . . 
            4 . . . . 9 5 5 f . . . . . . . 
            . f . . . 9 5 f 9 . . . . . . . 
            . . f f . 5 5 f 5 . . . . . . . 
            . . . . f f f f 5 . . . . . . . 
            . . . . . 5 f f f f . . . . . . 
            . . . . . 5 f 5 5 . f f . . . . 
            . . . . . . f 5 . . . . f . . . 
            . . . . . f . 5 . . . . . 4 . . 
            . . . . . f . 5 . . . . . . . . 
            . . . . f . . 5 . . . . . . . . 
            . . . 4 . . . 5 . . . . . . . . 
            . . . . . . f 5 5 . . . . . . . 
            `],
        50,
        true
        )
        chopper2.setFlag(SpriteFlag.GhostThroughWalls, true)
        tiles.placeOnRandomTile(chopper2, assets.tile`myTile`)
        scene.cameraFollowSprite(chopper2)
        pause(750)
        chopper2.follow(Cruiser, 250)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.swimmer, function (sprite14, otherSprite6) {
    info.changeScoreBy(50)
    otherSprite6.destroy()
    rescue()
})
function RotateCruiser () {
    if (Math.abs(Cruiser.vx) > 0 || Math.abs(Cruiser.vy) > 0) {
        if (controller.A.isPressed()) {
            statusbar.value += -5
        } else {
            statusbar.value += -1
        }
        if (Cruiser.vy > 0) {
            Cruiser.setImage(assets.image`boat3`)
            CruiserOrientation = 180
        } else {
            Cruiser.setImage(assets.image`boat2`)
            CruiserOrientation = 0
        }
        if (Cruiser.vx > 0) {
            if (Math.abs(Cruiser.vx) >= Math.abs(Cruiser.vy)) {
                Cruiser.setImage(assets.image`boat0`)
                CruiserOrientation = 90
            }
        } else if (Cruiser.vx < 0) {
            if (Math.abs(Cruiser.vx) >= Math.abs(Cruiser.vy)) {
                Cruiser.setImage(assets.image`boat5`)
                CruiserOrientation = 270
            }
        }
    }
}
statusbars.onStatusReached(StatusBarKind.Fuel, statusbars.StatusComparison.LTE, statusbars.ComparisonType.Percentage, 25, function (status) {
    if (GameInitDone == 1) {
        game.showLongText("dein Tank ist gleich leer! Fahr zum gelben Hafenkran zum Aufladen", DialogLayout.Bottom)
    }
})
function play_sos (num: number) {
    for (let index = 0; index < num; index++) {
        beep = 1600
        music.setTempo(180)
        for (let index = 0; index < 3; index++) {
            music.playTone(beep, music.beat(BeatFraction.Eighth))
            music.rest(music.beat(BeatFraction.Quarter))
        }
        for (let index = 0; index < 3; index++) {
            music.playTone(beep, music.beat(BeatFraction.Whole))
            music.rest(music.beat(BeatFraction.Quarter))
        }
        for (let index = 0; index < 3; index++) {
            music.playTone(beep, music.beat(BeatFraction.Eighth))
            music.rest(music.beat(BeatFraction.Quarter))
        }
        music.rest(music.beat(BeatFraction.Double))
    }
}
function CalcPosition (mySprite: Sprite) {
    CalcPositionReturn = "L: " + Math.round(5000 + -1 * mySprite.y) / 1 + " N - B:" + Math.round(5000 + mySprite.x) / 1 + " O"
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.ship, function (sprite15, otherSprite7) {
    HitWithWater += 1
    sprite15.destroy()
    if (HitWithWater >= 3) {
        RandNewSpeed(otherSprite7, 8, 20)
        HitWithWater = 0
        otherSprite7.say("hey", 1000)
        info.changeScoreBy(-1)
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile12`, function (sprite5, location4) {
    if (game.ask("möchtest du beenden?", "Highscore bisher: " + ("" + info.highScore()))) {
        game.over(true, effects.confetti)
    } else {
        Cruiser.y += -5
    }
})
function initGame () {
    blockMenu.setControlsEnabled(false)
    if (GameInitDone == 0) {
        game.showLongText("Hallo Seenotretter, in deinem Revier sind viele Schiffe unterwegs, fahre auf Patrouille und halte Ausschau vor allem nach Rettungsinseln und im Wasser treibenden Personen! Pass auf, dass du keine anderen Schiffe Rammst.      Gute Wache! ", DialogLayout.Full)
        maxCruiserSpeed = 100
        Cruiser = sprites.create(assets.image`boat2`, SpriteKind.Player)
        tiles.placeOnRandomTile(Cruiser, assets.tile`myTile0`)
        scene.cameraFollowSprite(Cruiser)
        info.setLife(3)
        info.setScore(0)
        statusbar = statusbars.create(60, 5, StatusBarKind.Fuel)
        statusbar.positionDirection(CollisionDirection.Top)
        statusbar.setOffsetPadding(0, 0)
        statusbar.setBarBorder(1, 13)
        statusbar.max = 5000
        statusbar.value = statusbar.max
        statusbar.setColor(7, 2)
        lastTreasureScore = 0
        info.setLifeImage(img`
                . . . . .f d. 
                . 1. . .f d f
                . . 1.f f f f
                . . . 1 f. . . 
                . .f f 1 5. . 
                f f f. 5 5 5. 
                f d f. . 5 5 5
                .d f. . . 5 5
            `)
info.setBackgroundColor(8)
info.setBorderColor(13)
info.setFontColor(1)
if (Difficulty == 1) {
            PosBar = statusbars.create(0, 3, StatusBarKind.Pos)
            PosBar.positionDirection(CollisionDirection.Bottom)
            PosBar.setOffsetPadding(-80, 5)
        }
        GameInitDone = 1
    }
}
scene.onHitWall(SpriteKind.ship, function (sprite7, location5) {
    RandNewSpeed(sprite7, 7, 20)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.treassure, function (sprite11, otherSprite3) {
    otherSprite3.destroy(effects.confetti, 1000)
    music.magicWand.play()
    info.changeScoreBy(333)
    CountTressure += -1
    lastTreasureScore = info.score()
})
function Create_Burning_Ship () {
    BurnShip = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . 5 5 5 5 5 5 . . . . . 
        . . . . 5 5 . . . . 5 . . . . . 
        . . . . 5 . . . . . . . . . . . 
        . . . . 5 . . . . . . . . . . . 
        . . . . 5 5 . . . . . . . . . . 
        . . . . . 5 5 5 5 5 . . . . . . 
        . . . . . . . . . 5 . . . . . . 
        . . . . . . . . . 5 5 . . . . . 
        . . . . 5 . . . . 5 5 . . . . . 
        . . . . 5 5 5 5 5 5 . . . . . . 
        . . . . . 5 5 . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.burningShip)
    SelectShip(BurnShip)
    PlaceOnTopRandom(BurnShip)
    CountBurningShips += 1
    RandNewSpeed(BurnShip, 1, 3)
    BurnShip.startEffect(effects.fire)
}
sprites.onDestroyed(SpriteKind.swimmer, function (sprite4) {
    CountSwimmers += -1
})
info.onLifeZero(function () {
    game.showLongText("dein Schiff ist kaputt!", DialogLayout.Bottom)
    game.over(false, effects.dissolve)
})
function RandNewSpeed (mySprite2: Sprite, min2: number, max2: number) {
    oldSpeedX = mySprite2.vx
    RandNewSpeddMax = min2
    RandNewSpeedX = randint(0, max2)
    RandNewSpeedY = randint(0, max2)
    if (RandNewSpeedX == 0 && RandNewSpeedY == 0) {
        if (Math.percentChance(50)) {
            RandNewSpeedY = min2
        } else {
            RandNewSpeedX = min2
        }
    }
    if (Math.percentChance(50)) {
        RandNewSpeedY = 0 - RandNewSpeedY
    }
    if (Math.percentChance(50)) {
        RandNewSpeedX = 0 - RandNewSpeedX
    }
    mySprite2.setVelocity(RandNewSpeedX, RandNewSpeedY)
    if (oldSpeedX < 0 && RandNewSpeedX >= 0) {
        mySprite2.image.flipX()
    }
    if (oldSpeedX >= 0 && RandNewSpeedX < 0) {
        mySprite2.image.flipX()
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.ship, function (sprite16, otherSprite8) {
    music.bigCrash.play()
    otherSprite8.startEffect(effects.bubbles, 2000)
    Cruiser.setVelocity(0, 0)
    info.changeLifeBy(-1)
    if (info.life() < 2) {
        game.showLongText("dein Kreuzer ist schwer Beschädigt. Rette alle Beteiligten & fahre zum gelben Hafenkran zum reparieren.", DialogLayout.Center)
    }
    info.changeScoreBy(-100)
    otherSprite8.setFlag(SpriteFlag.GhostThroughSprites, true)
    scene.cameraShake(4, 2000)
    otherSprite8.x += 1
    otherSprite8.y += 1
    RandNewSpeed(otherSprite8, 3, 8)
    otherSprite8.setKind(SpriteKind.raft)
    otherSprite8.setImage(assets.image`raft`)
    CountShips += -1
    CountRafts += 1
    pause(5000)
    otherSprite8.setFlag(SpriteFlag.GhostThroughSprites, false)
})
function SelectMap () {
    console.log("setMap")
    blockMenu.setColors(1, 15)
    blockMenu.setControlsEnabled(true)
    blockMenu.showMenu(["Karte 1", "Karte 2"], MenuStyle.List, MenuLocation.FullScreen)
}
sprites.onOverlap(SpriteKind.chopper, SpriteKind.Player, function (sprite12, otherSprite4) {
    chopper2.say("Hochziehen!", 1200)
    pause(1200)
    chopper2.follow(hospital2, 250)
    pause(5000)
    scene.cameraFollowSprite(Cruiser)
    maxCruiserSpeed = 100
    hospital2.destroy()
    chopper2.destroy()
    if (Math.percentChance(50)) {
        info.changeScoreBy(33)
        music.magicWand.play()
    }
})
function UpdatePosBar () {
    CalcPosition(Cruiser)
    PosBar.setLabel(CalcPositionReturn)
    console.logValue("CalcPosREaturn", CalcPositionReturn)
}
function B_Diff0 () {
    if (controller.A.isPressed()) {
        game.showLongText("Ships: " + ("" + CountShips) + " Rafts: " + ("" + CountRafts) + " Swimmers: " + ("" + CountSwimmers) + " Burners: " + ("" + CountBurningShips) + " Treasure: " + ("" + CountTressure) + " Time:" + ("" + Math.round(game.runtime() / 1000)) + " Fuel :" + ("" + statusbar.value) + "Position X:" + Cruiser.x + "Position Y:" + Cruiser.y + "", DialogLayout.Full)
    }
    if (finderOn == 0) {
        finderOn = 1
        finder2 = sprites.create(assets.image`finder0`, SpriteKind.finder)
        finder2.setFlag(SpriteFlag.GhostThroughWalls, true)
        finder2.setFlag(SpriteFlag.GhostThroughSprites, true)
        finder2.setPosition(Cruiser.x, Cruiser.y)
        finder2.setStayInScreen(true)
        if (CountBurningShips >= 1) {
            finder2.follow(BurnShip, 300)
        } else if (Math.percentChance(50) && CountSwimmers > 0) {
            finder2.follow(swimmer1, 300)
        } else if (CountRafts > 0) {
            finder2.follow(RAFT1, 300)
        } else {
            finderOn = 0
            finder2.destroy()
        }
    } else {
        finderOn = 0
        finder2.destroy()
    }
}
sprites.onOverlap(SpriteKind.ship, SpriteKind.ship, function (sprite9, otherSprite) {
    music.bigCrash.play()
    scene.cameraShake(4, 1000)
    otherSprite.startEffect(effects.bubbles, 500)
    RandNewSpeed(otherSprite, 3, 8)
    otherSprite.setKind(SpriteKind.raft)
    otherSprite.setImage(assets.image`raft`)
    CountShips += -1
    CountRafts += 1
    RandNewSpeed(sprite9, 7, 20)
    play_sos(2)
    if (CountBurningShips < 1) {
        sprite9.destroy(effects.bubbles, 500)
        CountShips += -1
        Create_Burning_Ship()
    }
})
sprites.onDestroyed(SpriteKind.raft, function (sprite6) {
    CountRafts += -1
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.raft, function (sprite10, otherSprite2) {
    info.changeScoreBy(25)
    otherSprite2.destroy()
    rescue()
})
blockMenu.onMenuOptionSelected(function (option, index) {
    console.logValue("Selected Option:", blockMenu.selectedMenuOption())
    if (blockMenu.selectedMenuOption() == "Karte 1") {
        tiles.setTilemap(tilemap`Level1`)
    }
    if (blockMenu.selectedMenuOption() == "Karte 2") {
        tiles.setTilemap(tilemap`Karte2`)
    }
    if (blockMenu.selectedMenuOption() == "Einfach") {
        Difficulty = blockMenu.selectedMenuIndex()
    }
    if (blockMenu.selectedMenuOption() == "Schwer") {
        Difficulty = blockMenu.selectedMenuIndex()
    }
    console.logValue("Selected Option:", blockMenu.selectedMenuOption())
    blockMenu.closeMenu()
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (GameInitDone == 1) {
        if (Difficulty == 0) {
            B_Diff0()
        }
        if (Difficulty == 1) {
            B_Diff1()
        }
    }
})
function SelectShip (mySprite3: Sprite) {
    mySprite3.vx = -1
    SelectSHip = randint(0, 9)
    if (SelectSHip == 0) {
        mySprite3.setImage(img`
            . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . e 2 . . . . . 
            . . . 1 e 2 . . . . 1 e . . . . . . 
            . . 1 1 e . . . . 1 1 e . . . . . . 
            . . 1 1 e . . . . 1 1 e . . . . . . 
            . . 1 1 e . . . . 1 1 e . . . . . . 
            . . 1 1 e . . . . 1 1 e . . . . . . 
            . . 1 1 e . . . . 1 1 e . . . e 2 2 
            . . . . e . . . . . . e . . . e 2 2 
            . . . . e . . . . . . e . . . e . . 
            f f f f f f f f f f f f f f f f . . 
            . . e e e e e e e e e e e e e . . . 
            . . . . e e e e e e e e e e . . . . 
            . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . . . 
            `)
    }
    if (SelectSHip == 1) {
        mySprite3.setImage(img`
            . . . . . . . d 2 7 . . . . 
            . . . . . . 1 d 1 . . . . . 
            . . . . . . 1 d 1 1 . . . . 
            . . . . . 1 1 d 1 1 . . . . 
            . . . . 1 1 1 d 1 1 1 . . . 
            . . . . 1 1 1 d 1 1 1 . . . 
            . . . 1 1 1 1 d 1 1 1 1 . . 
            . . . 1 1 1 1 d 1 1 1 1 . . 
            . . 1 1 1 1 1 d 1 1 1 1 1 . 
            . 1 1 1 1 1 1 d 1 1 1 1 1 1 
            . 1 1 1 1 1 1 d 1 1 1 1 1 1 
            1 . . . . . . d . . . . . . 
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 
            . 5 5 5 5 5 5 5 5 5 5 5 5 5 
            . . 5 5 5 5 5 5 5 5 5 5 5 5 
            `)
    }
    if (SelectSHip == 2) {
        mySprite3.setImage(img`
            ...........11...................
            ...........91...................
            ..333cccaaa11eeefff555111eee222.
            ..999666ddd11aaa222fff555999ccc.
            7755544455511555444222444333555.
            77777777777777777777777777777777
            .7777777777777777777777777777777
            .7777711111111111111177777777777
            ..777777777777777777777777777777
            ..222222222222222222222222222222
            `)
    }
    if (SelectSHip == 3) {
        mySprite3.setImage(img`
            . . . . . . . . . . . . . . . . 1 1 1 . 
            . . . . . . . . . . . . . . . . 9 9 1 . 
            . . c c . c c . c c . c c . c c 1 1 1 . 
            . c c c c c c c c c c c c c c c 1 1 1 . 
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
            . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
            . . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
            . . . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
            `)
    }
    if (SelectSHip == 4) {
        mySprite3.setImage(img`
            ............bbb.............
            ...........bb...............
            ..........ddd...............
            ....661616ddd...............
            .....11111ddd...............
            .....16161ddd...............
            ...1111111111111111111111...
            ...616161616161616161616161.
            ..1111111111111111111111111.
            ..6161616161616161616161616.
            .111111111111111111111111111
            .616161616161616161616161616
            dddddddddddddddddddddddddddd
            .ddd5d8d7d2ddddddddddddddddd
            ..dd5d8d7d2ddddddddddddddddd
            ...dddddddddddddddddddddddd.
            `)
    }
    if (SelectSHip == 5) {
        mySprite3.setImage(img`
            . . . . d . . . . . . . . 
            . . . d d d d . . . . . . 
            . . . d d d d . . . . . . 
            . . . d d d d d . . . . . 
            . . . d d d d d d . . . . 
            . . . d d d d d d . . . . 
            . . . d d d d d d . . . . 
            . . . d . . . . . . e e . 
            8 6 6 6 6 6 6 6 6 6 6 e . 
            . 8 6 4 4 4 6 6 6 6 6 e . 
            . . 8 6 6 6 6 6 6 6 6 8 . 
            . . . 8 8 8 8 8 8 8 8 8 . 
            `)
    }
    if (SelectSHip == 6) {
        mySprite3.setImage(assets.image`Edith`)
    }
    if (SelectSHip == 7) {
        mySprite3.setImage(img`
            ..........1f5..1f2......
            .....1f7.11f..11f..1fa..
            ....11f.111f.111f.11f...
            ....11f.111f.111f.11f1..
            ...111f.111f.111f.11f11.
            ...111f.111f.111f.11f11.
            ..1111f.111f.111f.11f111
            ..1111f.111f.111f.11f111
            .11111f..11f..11f.11f111
            .11111f...1f...1f..1f111
            1.....f....f....f...f...
            ffffffffffffffffffffffff
            ..eeeeeeeeeeeeeeeeeeeeee
            ....eeefeefeefeefeefeee.
            .....eeeeeeeeeeeeeeeee..
            .......eeeeeeeeeeeeee...
            `)
    }
    if (SelectSHip == 8) {
        mySprite3.setImage(img`
            . . . . . . . . . . . . b . 
            . . . . . . . . . . . b . . 
            . . . . . . . . . . b . . . 
            . . . . . d d . . b . . . . 
            . . . . . d d . . b . . . . 
            . . . . . 4 4 d b . . . . . 
            . . . . . 4 4 . b . . . . . 
            7 e e e e e e e e e e e e 7 
            . 7 7 7 7 7 7 7 7 7 7 7 7 . 
            . . 7 7 7 7 7 7 7 7 7 7 7 . 
            `)
    }
    if (SelectSHip == 9) {
        mySprite3.setImage(assets.image`Edith`)
    }
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.burningShip, function (sprite13, otherSprite5) {
    HitWithWater += 1
    sprite13.destroy()
    if (HitWithWater >= 5) {
        effects.clearParticles(otherSprite5)
        otherSprite5.setKind(SpriteKind.ship)
        otherSprite5.setFlag(SpriteFlag.GhostThroughSprites, true)
        CountBurningShips += -1
        CountShips += 1
        HitWithWater = 0
        info.changeScoreBy(125)
        otherSprite5.say("Danke! Gelöscht!", 1000)
        pause(5000)
        RandNewSpeed(otherSprite5, 8, 20)
        otherSprite5.setFlag(SpriteFlag.GhostThroughSprites, false)
    }
})
scene.onHitWall(SpriteKind.burningShip, function (sprite8, location6) {
    RandNewSpeed(sprite8, 1, 3)
})
let Schiff1: Sprite = null
let SelectSHip = 0
let CountShips = 0
let RandNewSpeedY = 0
let RandNewSpeedX = 0
let RandNewSpeddMax = 0
let oldSpeedX = 0
let PosBar: StatusBarSprite = null
let HitWithWater = 0
let beep = 0
let chopper2: Sprite = null
let hospital2: Sprite = null
let RAFT1: Sprite = null
let swimmer1: Sprite = null
let CalcPositionReturn = ""
let BurnShip: Sprite = null
let CountRafts = 0
let CountSwimmers = 0
let CountBurningShips = 0
let PosBarHaverist: StatusBarSprite = null
let Cruiser: Sprite = null
let Water: Sprite = null
let WaterX = 0
let WaterY = 0
let CruiserOrientation = 0
let statusbar: StatusBarSprite = null
let Treassure: Sprite = null
let CountTressure = 0
let lastTreasureScore = 0
let finder2: Sprite = null
let finderOn = 0
let maxCruiserSpeed = 0
let Difficulty = 0
let GameInitDone = 0
blockMenu.setControlsEnabled(false)
GameInitDone = 0
music.setVolume(80)
game.splash("Wir sind Seenotretter", "      jetzt spenden!                 www.seenotretter.de    ")
game.splash("für Alfred, Ruth & Albert", "                                   von Papa                                   v1.6")
SetDifficulty()
pauseUntil(() => !(blockMenu.isMenuOpen()))
console.log("wait 1 over")
SelectMap()
pauseUntil(() => !(blockMenu.isMenuOpen()))
console.log("wait 2 over")
initGame()
console.log("init done")
console.logValue("diff", Difficulty)
game.onUpdateInterval(1000, function () {
    if (GameInitDone == 1) {
        if (CountRafts < 3) {
            RAFT1 = sprites.create(assets.image`raft`, SpriteKind.raft)
            PlaceOnTopRandom(RAFT1)
            CountRafts += 1
            RandNewSpeed(RAFT1, 1, 8)
        }
        if (CountSwimmers < 3) {
            swimmer1 = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . e . . . . . . . . 
                . . . . d . . d . . d . . . . . 
                . . . . . d 4 4 4 d . . . . . . 
                . . . . . . 4 4 4 . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, SpriteKind.swimmer)
            animation.runImageAnimation(
            swimmer1,
            assets.animation`SwimAnim`,
            500,
            true
            )
            PlaceOnTopRandom(swimmer1)
            CountSwimmers += 1
            RandNewSpeed(swimmer1, 1, 1)
        }
        if (CountShips < 6 && CountRafts <= 3) {
            if (CountBurningShips == 0) {
                Create_Burning_Ship()
            } else {
                Schiff1 = sprites.create(img`
                    . . . . . . . . . . . . . . . . 
                    . . . . . 5 5 5 5 5 5 . . . . . 
                    . . . . 5 5 . . . . 5 . . . . . 
                    . . . . 5 . . . . . . . . . . . 
                    . . . . 5 . . . . . . . . . . . 
                    . . . . 5 5 . . . . . . . . . . 
                    . . . . . 5 5 5 5 5 . . . . . . 
                    . . . . . . . . . 5 . . . . . . 
                    . . . . . . . . . 5 5 . . . . . 
                    . . . . 5 . . . . 5 5 . . . . . 
                    . . . . 5 5 5 5 5 5 . . . . . . 
                    . . . . . 5 5 . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `, SpriteKind.ship)
                SelectShip(Schiff1)
                PlaceOnTopRandom(Schiff1)
                CountShips += 1
                RandNewSpeed(Schiff1, 8, 20)
            }
        }
    }
})
forever(function () {
    if (GameInitDone == 1) {
        controller.moveSprite(Cruiser, maxCruiserSpeed, maxCruiserSpeed)
        RotateCruiser()
        if (statusbar.value == 0) {
            maxCruiserSpeed = 0
        }
    }
})
game.onUpdateInterval(30000, function () {
    CreateTressure()
})
game.onUpdateInterval(200, function () {
    if (Difficulty == 1) {
        UpdatePosBar()
    }
})
