namespace SpriteKind {
    export const raft = SpriteKind.create()
    export const ship = SpriteKind.create()
    export const swimmer = SpriteKind.create()
    export const paused = SpriteKind.create()
    export const chopper = SpriteKind.create()
    export const finder = SpriteKind.create()
    export const hospital = SpriteKind.create()
    export const burningShip = SpriteKind.create()
    export const map = SpriteKind.create()
    export const treassure = SpriteKind.create()
}
namespace StatusBarKind {
    export const Fuel = StatusBarKind.create()
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
    if (lastTreasureScore != info.score()) {
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
        game.showLongText("Das Schiff wurde Repariert!", DialogLayout.Center)
        info.setLife(3)
    }
    statusbar.value = statusbar.max
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
scene.onHitWall(SpriteKind.swimmer, function (sprite, location) {
    RandNewSpeed(sprite, 1, 1)
})
function PlaceOnTopRandom (mySprite: Sprite) {
    if (Math.percentChance(25)) {
        tiles.placeOnRandomTile(mySprite, assets.tile`myTile3`)
    } else {
        tiles.placeOnRandomTile(mySprite, assets.tile`myTile2`)
    }
}
statusbars.onZero(StatusBarKind.Fuel, function (status) {
    game.showLongText("dein Tank ist leer!", DialogLayout.Bottom)
    game.over(false, effects.dissolve)
})
scene.onHitWall(SpriteKind.raft, function (sprite, location) {
    RandNewSpeed(sprite, 3, 8)
})
sprites.onDestroyed(SpriteKind.swimmer, function (sprite) {
    CountSwimmers += -1
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile12`, function (sprite, location) {
    if (game.ask("möchtest du beenden?", "Highscore bisher: " + info.highScore())) {
        game.over(true, effects.confetti)
    } else {
        Cruiser.y += -5
    }
})
sprites.onDestroyed(SpriteKind.raft, function (sprite) {
    CountRafts += -1
})
scene.onHitWall(SpriteKind.ship, function (sprite, location) {
    RandNewSpeed(sprite, 7, 20)
})
scene.onHitWall(SpriteKind.burningShip, function (sprite, location) {
    RandNewSpeed(sprite, 1, 3)
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
sprites.onOverlap(SpriteKind.ship, SpriteKind.ship, function (sprite, otherSprite) {
    music.bigCrash.play()
    scene.cameraShake(4, 1000)
    otherSprite.startEffect(effects.bubbles, 500)
    RandNewSpeed(otherSprite, 3, 8)
    otherSprite.setKind(SpriteKind.raft)
    otherSprite.setImage(assets.image`raft`)
    CountShips += -1
    CountRafts += 1
    RandNewSpeed(sprite, 7, 20)
    if (CountBurningShips < 1) {
        sprite.destroy(effects.bubbles, 500)
        CountShips += -1
        Create_Burning_Ship()
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
sprites.onOverlap(SpriteKind.Player, SpriteKind.raft, function (sprite, otherSprite) {
    info.changeScoreBy(5)
    otherSprite.destroy()
    rescue()
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
        statusbar.setColor(7, 2)
        statusbar.max = 5000
        statusbar.value = statusbar.max
        lastTreasureScore = 0
        info.setLifeImage(img`
 . . . 1 . . .  
 . . 1 1 1 . .  
 . 1 1 4 1 1 .  
 . 1 4 4 4 1 .  
 . 1 4 9 4 1 .  
 . 1 9 9 9 1 .  
 . 1 4 1 4 1 .  
 . 1 4 1 4 1 .  
 . 1 4 4 4 1 .  
 . 1 4 4 4 1 .  
 . 1 1 1 1 1 .  
 . 1 1 1 1 1 .  
 . 1 4 4 4 1 .  
`)
info.setBackgroundColor(8)
info.setBorderColor(13)
info.setFontColor(1)
GameInitDone = 1
    }
}
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
    music.siren.play()
}
info.onLifeZero(function () {
    game.showLongText("dein Schiff ist kaputt!", DialogLayout.Bottom)
    game.over(false, effects.dissolve)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.treassure, function (sprite, otherSprite) {
    otherSprite.destroy(effects.confetti, 1000)
    music.magicWand.play()
    info.changeScoreBy(333)
    CountTressure += -1
    lastTreasureScore = info.score()
})
sprites.onOverlap(SpriteKind.chopper, SpriteKind.Player, function (sprite, otherSprite) {
    chopper2.say("Hochziehen!", 1200)
    pause(1200)
    chopper2.follow(hospital2, 250)
    pause(3000)
    scene.cameraFollowSprite(Cruiser)
    maxCruiserSpeed = 100
    hospital2.destroy()
    chopper2.destroy()
    if (Math.percentChance(50)) {
        info.changeScoreBy(33)
        music.magicWand.play()
    }
})
function RandNewSpeed (mySprite: Sprite, min: number, max: number) {
    oldSpeedX = mySprite.vx
    RandNewSpeddMax = min
    RandNewSpeedX = randint(0, max)
    RandNewSpeedY = randint(0, max)
    if (RandNewSpeedX == 0 && RandNewSpeedY == 0) {
        if (Math.percentChance(50)) {
            RandNewSpeedY = min
        } else {
            RandNewSpeedX = min
        }
    }
    if (Math.percentChance(50)) {
        RandNewSpeedY = 0 - RandNewSpeedY
    }
    if (Math.percentChance(50)) {
        RandNewSpeedX = 0 - RandNewSpeedX
    }
    mySprite.setVelocity(RandNewSpeedX, RandNewSpeedY)
    if (oldSpeedX < 0 && RandNewSpeedX >= 0) {
        mySprite.image.flipX()
    }
    if (oldSpeedX >= 0 && RandNewSpeedX < 0) {
        mySprite.image.flipX()
    }
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.burningShip, function (sprite, otherSprite) {
    HitWithWater += 1
    sprite.destroy()
    if (HitWithWater >= 5) {
        effects.clearParticles(otherSprite)
        otherSprite.setKind(SpriteKind.ship)
        otherSprite.setFlag(SpriteFlag.GhostThroughSprites, true)
        CountBurningShips += -1
        CountShips += 1
        HitWithWater = 0
        info.changeScoreBy(125)
        otherSprite.say("Danke! Gelöscht!", 1000)
        pause(5000)
        RandNewSpeed(otherSprite, 8, 20)
        otherSprite.setFlag(SpriteFlag.GhostThroughSprites, false)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.swimmer, function (sprite, otherSprite) {
    info.changeScoreBy(50)
    otherSprite.destroy()
    rescue()
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.ship, function (sprite, otherSprite) {
    HitWithWater += 1
    sprite.destroy()
    if (HitWithWater >= 3) {
        RandNewSpeed(otherSprite, 8, 20)
        HitWithWater = 0
        otherSprite.say("hey", 1000)
        info.changeScoreBy(-1)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.ship, function (sprite, otherSprite) {
    music.bigCrash.play()
    otherSprite.startEffect(effects.bubbles, 2000)
    Cruiser.setVelocity(0, 0)
    info.changeLifeBy(-1)
    info.changeScoreBy(-100)
    otherSprite.setFlag(SpriteFlag.GhostThroughSprites, true)
    scene.cameraShake(4, 2000)
    otherSprite.x += 1
    otherSprite.y += 1
    RandNewSpeed(otherSprite, 3, 8)
    otherSprite.setKind(SpriteKind.raft)
    otherSprite.setImage(assets.image`raft`)
    CountShips += -1
    CountRafts += 1
    pause(5000)
    otherSprite.setFlag(SpriteFlag.GhostThroughSprites, false)
})
blockMenu.onMenuOptionSelected(function (option, index) {
    if (index == 0) {
        tiles.setTilemap(tilemap`Level1`)
        blockMenu.closeMenu()
        initGame()
    }
    if (index == 1) {
        tiles.setTilemap(tilemap`Karte2`)
        blockMenu.closeMenu()
        initGame()
    }
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (GameInitDone == 1) {
        if (controller.A.isPressed()) {
            game.showLongText("Ships: " + CountShips + " Rafts: " + CountRafts + " Swimmers: " + CountSwimmers + " Burners: " + CountBurningShips + " Treasure: " + CountTressure + " Time:" + Math.round(game.runtime() / 1000) + " Fuel :" + statusbar.value, DialogLayout.Bottom)
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
            } else {
                if (Math.percentChance(50) && CountSwimmers > 0) {
                    finder2.follow(swimmer1, 300)
                } else if (CountRafts > 0) {
                    finder2.follow(RAFT1, 300)
                } else {
                    finderOn = 0
                    finder2.destroy()
                }
            }
        } else {
            finderOn = 0
            finder2.destroy()
        }
    }
})
function SelectShip (mySprite: Sprite) {
    mySprite.vx = -1
    SelectSHip = randint(0, 8)
    if (SelectSHip == 0) {
        mySprite.setImage(img`
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
        mySprite.setImage(img`
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
        mySprite.setImage(img`
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
        mySprite.setImage(img`
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
        mySprite.setImage(img`
            .............b..............
            ............b...............
            ..........ddd...............
            ....6616161616..............
            ....111111111111............
            ....616161616161............
            ...1111111111111111111111...
            ...616161616161616161616161.
            ..1111111111111111111111111.
            ..6161616161616161616161616.
            .111111111111111111111111111
            .616161616161616161616161616
            ffffffffffffffffffffffffffff
            .fffffffffffffffffffffffffff
            ..ffffffffffffffffffffffffff
            ...fffffffffffffffffffffffff
            `)
    }
    if (SelectSHip == 5) {
        mySprite.setImage(img`
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
        mySprite.setImage(img`
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
            7 e 7 e 7 e 7 e 7 e 7 e 7 e 
            . 7 e 7 e 7 e 7 e 7 e 7 e 7 
            . . 7 e 7 e 7 e 7 e 7 e 7 e 
            `)
    }
    if (SelectSHip == 7) {
        mySprite.setImage(img`
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
        mySprite.setImage(img`
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
}
let Schiff1: Sprite = null
let SelectSHip = 0
let RAFT1: Sprite = null
let swimmer1: Sprite = null
let HitWithWater = 0
let RandNewSpeedY = 0
let RandNewSpeedX = 0
let RandNewSpeddMax = 0
let oldSpeedX = 0
let BurnShip: Sprite = null
let beep = 0
let CountBurningShips = 0
let CountShips = 0
let chopper2: Sprite = null
let hospital2: Sprite = null
let CountRafts = 0
let CountSwimmers = 0
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
let GameInitDone = 0
blockMenu.setControlsEnabled(false)
GameInitDone = 0
music.setVolume(80)
game.splash("Hallo Pizza")
game.splash("für Alfred")
blockMenu.setColors(1, 15)
blockMenu.showMenu(["Karte 1", "Karte 2"], MenuStyle.List, MenuLocation.FullScreen)
blockMenu.setControlsEnabled(true)
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
