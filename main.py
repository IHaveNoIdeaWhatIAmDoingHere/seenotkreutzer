@namespace
class SpriteKind:
    raft = SpriteKind.create()
    ship = SpriteKind.create()
    swimmer = SpriteKind.create()
    paused = SpriteKind.create()
    chopper = SpriteKind.create()
    finder = SpriteKind.create()
    hospital = SpriteKind.create()
    burningShip = SpriteKind.create()
    map2 = SpriteKind.create()
    treassure = SpriteKind.create()
@namespace
class StatusBarKind:
    Fuel = StatusBarKind.create()

def on_a_released():
    global maxCruiserSpeed, finderOn
    if maxCruiserSpeed != 0:
        maxCruiserSpeed = 100
    if finderOn == 0:
        pass
    else:
        finderOn = 0
        finder2.destroy()
controller.A.on_event(ControllerButtonEvent.RELEASED, on_a_released)

def CreateTressure():
    global CountTressure, Treassure
    if lastTreasureScore != info.score():
        if Math.percent_chance(16):
            if CountTressure <= 1 and (info.life() == 3 and info.score() > 300 and game.runtime() > 200000):
                CountTressure = 1
                Treassure = sprites.create(img("""
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
                        """),
                    SpriteKind.treassure)
                tiles.place_on_random_tile(Treassure, assets.tile("""
                    myTile20
                    """))
def macheEtwas():
    Cruiser.set_image(assets.image("""Repair"""))

def on_overlap_tile(sprite, location):
    if info.life() < 3:
        game.show_long_text("Das Schiff wurde Repariert!", DialogLayout.CENTER)
        info.set_life(3)
    statusbar.value = statusbar.max
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        myTile1
        """),
    on_overlap_tile)

def on_a_pressed():
    global maxCruiserSpeed, WaterY, WaterX, Water
    if GameInitDone == 1:
        if maxCruiserSpeed != 0:
            maxCruiserSpeed = 250
        if CruiserOrientation == 0:
            WaterY = -80
            WaterX = 0
        if CruiserOrientation == 180:
            WaterY = 80
            WaterX = 0
        if CruiserOrientation == 90:
            WaterY = 0
            WaterX = 80
        if CruiserOrientation == 270:
            WaterY = 0
            WaterX = -80
        Water = sprites.create_projectile_from_sprite(img("""
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
                """),
            Cruiser,
            WaterX + randint(-20, 20),
            WaterY + randint(-20, 20))
        Water.set_flag(SpriteFlag.GHOST_THROUGH_WALLS, True)
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def on_hit_wall(sprite2, location2):
    RandNewSpeed(sprite2, 1, 1)
scene.on_hit_wall(SpriteKind.swimmer, on_hit_wall)

def PlaceOnTopRandom(mySprite: Sprite):
    if Math.percent_chance(25):
        tiles.place_on_random_tile(mySprite, assets.tile("""
            myTile3
            """))
    else:
        tiles.place_on_random_tile(mySprite, assets.tile("""
            myTile2
            """))

def on_on_zero(status):
    game.show_long_text("dein Tank ist leer!", DialogLayout.BOTTOM)
    game.over(False, effects.dissolve)
statusbars.on_zero(StatusBarKind.Fuel, on_on_zero)

def on_hit_wall2(sprite3, location3):
    RandNewSpeed(sprite3, 3, 8)
scene.on_hit_wall(SpriteKind.raft, on_hit_wall2)

def on_on_destroyed(sprite4):
    global CountSwimmers
    CountSwimmers += -1
sprites.on_destroyed(SpriteKind.swimmer, on_on_destroyed)

def on_overlap_tile2(sprite5, location4):
    if game.ask("möchtest du beenden?",
        "Highscore bisher: " + str(info.high_score())):
        game.over(True, effects.confetti)
    else:
        Cruiser.y += -5
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        myTile12
        """),
    on_overlap_tile2)

def on_on_destroyed2(sprite6):
    global CountRafts
    CountRafts += -1
sprites.on_destroyed(SpriteKind.raft, on_on_destroyed2)

def on_hit_wall3(sprite7, location5):
    RandNewSpeed(sprite7, 7, 20)
scene.on_hit_wall(SpriteKind.ship, on_hit_wall3)

def on_hit_wall4(sprite8, location6):
    RandNewSpeed(sprite8, 1, 3)
scene.on_hit_wall(SpriteKind.burningShip, on_hit_wall4)

def rescue():
    global finderOn, maxCruiserSpeed, hospital2, chopper2
    effects.clear_particles(Cruiser)
    if finderOn == 1:
        finderOn = 0
        finder2.destroy()
    music.power_up.play()
    Cruiser.say("Gerettet!", 1000)
    if Math.percent_chance(50) and game.ask("Hubschrauber anfordern?"):
        Cruiser.set_velocity(0, 0)
        maxCruiserSpeed = 0
        controller.move_sprite(Cruiser, maxCruiserSpeed, maxCruiserSpeed)
        Cruiser.say("wir brauchen einen Hubschrauber!", 2000)
        pause(1500)
        hospital2 = sprites.create(img("""
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
                """),
            SpriteKind.hospital)
        tiles.place_on_random_tile(hospital2, assets.tile("""
            hospital2
            """))
        chopper2 = sprites.create(img("""
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
                """),
            SpriteKind.chopper)
        animation.run_image_animation(chopper2,
            [img("""
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
                    """),
                img("""
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
                    """),
                img("""
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
                    """),
                img("""
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
                    """)],
            50,
            True)
        chopper2.set_flag(SpriteFlag.GHOST_THROUGH_WALLS, True)
        tiles.place_on_random_tile(chopper2, assets.tile("""
            myTile
            """))
        scene.camera_follow_sprite(chopper2)
        pause(750)
        chopper2.follow(Cruiser, 250)
def RotateCruiser():
    global CruiserOrientation
    if abs(Cruiser.vx) > 0 or abs(Cruiser.vy) > 0:
        if controller.A.is_pressed():
            statusbar.value += -5
        else:
            statusbar.value += -1
        if Cruiser.vy > 0:
            Cruiser.set_image(assets.image("""
                boat3
                """))
            CruiserOrientation = 180
        else:
            Cruiser.set_image(assets.image("""
                boat2
                """))
            CruiserOrientation = 0
        if Cruiser.vx > 0:
            if abs(Cruiser.vx) >= abs(Cruiser.vy):
                Cruiser.set_image(assets.image("""
                    boat0
                    """))
                CruiserOrientation = 90
        elif Cruiser.vx < 0:
            if abs(Cruiser.vx) >= abs(Cruiser.vy):
                Cruiser.set_image(assets.image("""
                    boat5
                    """))
                CruiserOrientation = 270

def on_on_overlap(sprite9, otherSprite):
    global CountShips, CountRafts
    music.big_crash.play()
    scene.camera_shake(4, 1000)
    otherSprite.start_effect(effects.bubbles, 500)
    RandNewSpeed(otherSprite, 3, 8)
    otherSprite.set_kind(SpriteKind.raft)
    otherSprite.set_image(assets.image("""
        raft
        """))
    CountShips += -1
    CountRafts += 1
    RandNewSpeed(sprite9, 7, 20)
    if CountBurningShips < 1:
        sprite9.destroy(effects.bubbles, 500)
        CountShips += -1
        Create_Burning_Ship()
sprites.on_overlap(SpriteKind.ship, SpriteKind.ship, on_on_overlap)

def play_sos(num: number):
    global beep
    for index in range(num):
        beep = 1600
        music.set_tempo(180)
        for index2 in range(3):
            music.play_tone(beep, music.beat(BeatFraction.EIGHTH))
            music.rest(music.beat(BeatFraction.QUARTER))
        for index3 in range(3):
            music.play_tone(beep, music.beat(BeatFraction.WHOLE))
            music.rest(music.beat(BeatFraction.QUARTER))
        for index4 in range(3):
            music.play_tone(beep, music.beat(BeatFraction.EIGHTH))
            music.rest(music.beat(BeatFraction.QUARTER))
        music.rest(music.beat(BeatFraction.DOUBLE))

def on_on_overlap2(sprite10, otherSprite2):
    info.change_score_by(5)
    otherSprite2.destroy()
    rescue()
sprites.on_overlap(SpriteKind.player, SpriteKind.raft, on_on_overlap2)

def initGame():
    global maxCruiserSpeed, Cruiser, statusbar, lastTreasureScore, GameInitDone
    blockMenu.set_controls_enabled(False)
    if GameInitDone == 0:
        game.show_long_text("Hallo Seenotretter, in deinem Revier sind viele Schiffe unterwegs, fahre auf Patrouille und halte Ausschau vor allem nach Rettungsinseln und im Wasser treibenden Personen! Pass auf, dass du keine anderen Schiffe Rammst.      Gute Wache! ",
            DialogLayout.FULL)
        maxCruiserSpeed = 100
        Cruiser = sprites.create(assets.image("""
            boat2
            """), SpriteKind.player)
        tiles.place_on_random_tile(Cruiser, assets.tile("""
            myTile0
            """))
        scene.camera_follow_sprite(Cruiser)
        info.set_life(3)
        info.set_score(0)
        statusbar = statusbars.create(60, 5, StatusBarKind.Fuel)
        statusbar.position_direction(CollisionDirection.TOP)
        statusbar.set_offset_padding(0, 0)
        statusbar.set_bar_border(1, 13)
        statusbar.set_color(7, 2)
        statusbar.max = 5000
        statusbar.value = statusbar.max
        lastTreasureScore = 0
        info.set_life_image(img("""
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
            """))
        info.set_background_color(0)
        info.set_border_color(13)
        info.set_font_color(1)
        GameInitDone = 1
def Create_Burning_Ship():
    global BurnShip, CountBurningShips
    BurnShip = sprites.create(img("""
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
            """),
        SpriteKind.burningShip)
    SelectShip(BurnShip)
    PlaceOnTopRandom(BurnShip)
    CountBurningShips += 1
    RandNewSpeed(BurnShip, 1, 3)
    BurnShip.start_effect(effects.fire)
    music.siren.play()

def on_life_zero():
    game.show_long_text("dein Schiff ist kaputt!", DialogLayout.BOTTOM)
    game.over(False, effects.dissolve)
info.on_life_zero(on_life_zero)

def on_on_overlap3(sprite11, otherSprite3):
    global CountTressure, lastTreasureScore
    otherSprite3.destroy(effects.confetti, 1000)
    music.magic_wand.play()
    info.change_score_by(333)
    CountTressure += -1
    lastTreasureScore = info.score()
sprites.on_overlap(SpriteKind.player, SpriteKind.treassure, on_on_overlap3)

def on_on_overlap4(sprite12, otherSprite4):
    global maxCruiserSpeed
    chopper2.say("Hochziehen!", 1200)
    pause(1200)
    chopper2.follow(hospital2, 250)
    pause(3000)
    scene.camera_follow_sprite(Cruiser)
    maxCruiserSpeed = 100
    hospital2.destroy()
    chopper2.destroy()
    if Math.percent_chance(50):
        info.change_score_by(33)
        music.magic_wand.play()
sprites.on_overlap(SpriteKind.chopper, SpriteKind.player, on_on_overlap4)

def RandNewSpeed(mySprite2: Sprite, min2: number, max2: number):
    global oldSpeedX, RandNewSpeddMax, RandNewSpeedX, RandNewSpeedY
    oldSpeedX = mySprite2.vx
    RandNewSpeddMax = min2
    RandNewSpeedX = randint(0, max2)
    RandNewSpeedY = randint(0, max2)
    if RandNewSpeedX == 0 and RandNewSpeedY == 0:
        if Math.percent_chance(50):
            RandNewSpeedY = min2
        else:
            RandNewSpeedX = min2
    if Math.percent_chance(50):
        RandNewSpeedY = 0 - RandNewSpeedY
    if Math.percent_chance(50):
        RandNewSpeedX = 0 - RandNewSpeedX
    mySprite2.set_velocity(RandNewSpeedX, RandNewSpeedY)
    if oldSpeedX < 0 and RandNewSpeedX >= 0:
        mySprite2.image.flip_x()
    if oldSpeedX >= 0 and RandNewSpeedX < 0:
        mySprite2.image.flip_x()

def on_on_overlap5(sprite13, otherSprite5):
    global HitWithWater, CountBurningShips, CountShips
    HitWithWater += 1
    sprite13.destroy()
    if HitWithWater >= 5:
        effects.clear_particles(otherSprite5)
        otherSprite5.set_kind(SpriteKind.ship)
        otherSprite5.set_flag(SpriteFlag.GHOST_THROUGH_SPRITES, True)
        CountBurningShips += -1
        CountShips += 1
        HitWithWater = 0
        info.change_score_by(125)
        otherSprite5.say("Danke! Gelöscht!", 1000)
        pause(5000)
        RandNewSpeed(otherSprite5, 8, 20)
        otherSprite5.set_flag(SpriteFlag.GHOST_THROUGH_SPRITES, False)
sprites.on_overlap(SpriteKind.projectile,
    SpriteKind.burningShip,
    on_on_overlap5)

def on_on_overlap6(sprite14, otherSprite6):
    info.change_score_by(50)
    otherSprite6.destroy()
    rescue()
sprites.on_overlap(SpriteKind.player, SpriteKind.swimmer, on_on_overlap6)

def on_on_overlap7(sprite15, otherSprite7):
    global HitWithWater
    HitWithWater += 1
    sprite15.destroy()
    if HitWithWater >= 3:
        RandNewSpeed(otherSprite7, 8, 20)
        HitWithWater = 0
        otherSprite7.say("hey", 1000)
        info.change_score_by(-1)
sprites.on_overlap(SpriteKind.projectile, SpriteKind.ship, on_on_overlap7)

def on_on_overlap8(sprite16, otherSprite8):
    global CountShips, CountRafts
    music.big_crash.play()
    otherSprite8.start_effect(effects.bubbles, 2000)
    Cruiser.set_velocity(0, 0)
    info.change_life_by(-1)
    info.change_score_by(-100)
    otherSprite8.set_flag(SpriteFlag.GHOST_THROUGH_SPRITES, True)
    scene.camera_shake(4, 2000)
    otherSprite8.x += 1
    otherSprite8.y += 1
    RandNewSpeed(otherSprite8, 3, 8)
    otherSprite8.set_kind(SpriteKind.raft)
    otherSprite8.set_image(assets.image("""
        raft
        """))
    CountShips += -1
    CountRafts += 1
    pause(5000)
    otherSprite8.set_flag(SpriteFlag.GHOST_THROUGH_SPRITES, False)
sprites.on_overlap(SpriteKind.player, SpriteKind.ship, on_on_overlap8)

def on_menu_option_selected(option, index5):
    if index5 == 0:
        tiles.set_tilemap(tilemap("""
            Level1
            """))
        blockMenu.close_menu()
        initGame()
    if index5 == 1:
        tiles.set_tilemap(tilemap("""
            Karte2
            """))
        blockMenu.close_menu()
        initGame()
blockMenu.on_menu_option_selected(on_menu_option_selected)

def on_b_pressed():
    global finderOn, finder2
    if GameInitDone == 1:
        if controller.A.is_pressed():
            game.show_long_text("Ships: " + str(CountShips) + " Rafts: " + str(CountRafts) + " Swimmers: " + str(CountSwimmers) + " Burners: " + str(CountBurningShips) + " Treasure: " + str(CountTressure) + " Time:" + str(Math.round(game.runtime() / 1000)) + " Fuel :" + str(statusbar.value),
                DialogLayout.BOTTOM)
        if finderOn == 0:
            finderOn = 1
            finder2 = sprites.create(assets.image("""
                finder0
                """), SpriteKind.finder)
            finder2.set_flag(SpriteFlag.GHOST_THROUGH_WALLS, True)
            finder2.set_flag(SpriteFlag.GHOST_THROUGH_SPRITES, True)
            finder2.set_position(Cruiser.x, Cruiser.y)
            finder2.set_stay_in_screen(True)
            if CountBurningShips >= 1:
                finder2.follow(BurnShip, 300)
            else:
                if Math.percent_chance(50) and CountSwimmers > 0:
                    finder2.follow(swimmer1, 300)
                elif CountRafts > 0:
                    finder2.follow(RAFT1, 300)
                else:
                    finderOn = 0
                    finder2.destroy()
        else:
            finderOn = 0
            finder2.destroy()
controller.B.on_event(ControllerButtonEvent.PRESSED, on_b_pressed)

def SelectShip(mySprite3: Sprite):
    global SelectSHip
    mySprite3.vx = -1
    SelectSHip = randint(0, 9)
    if SelectSHip == 0:
        mySprite3.set_image(img("""
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
            """))
    if SelectSHip == 1:
        mySprite3.set_image(img("""
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
            """))
    if SelectSHip == 2:
        mySprite3.set_image(img("""
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
            """))
    if SelectSHip == 3:
        mySprite3.set_image(img("""
            . . . . . . . . . . . . . . . . 1 1 1 .
            . . . . . . . . . . . . . . . . 9 9 1 .
            . . c c . c c . c c . c c . c c 1 1 1 .
            . c c c c c c c c c c c c c c c 1 1 1 .
            2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
            . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
            . . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
            . . . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
            """))
    if SelectSHip == 4:
        mySprite3.set_image(img("""
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
            """))
    if SelectSHip == 5:
        mySprite3.set_image(img("""
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
            """))
    if SelectSHip == 6:
        mySprite3.set_image(assets.image("""
            Edith
            """))
    if SelectSHip == 7:
        mySprite3.set_image(img("""
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
            """))
    if SelectSHip == 8:
        mySprite3.set_image(img("""
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
            """))
    if SelectSHip == 9:
        mySprite3.set_image(assets.image("""
            Edith
            """))
Schiff1: Sprite = None
SelectSHip = 0
RAFT1: Sprite = None
swimmer1: Sprite = None
HitWithWater = 0
RandNewSpeedY = 0
RandNewSpeedX = 0
RandNewSpeddMax = 0
oldSpeedX = 0
BurnShip: Sprite = None
beep = 0
CountBurningShips = 0
CountShips = 0
chopper2: Sprite = None
hospital2: Sprite = None
CountRafts = 0
CountSwimmers = 0
Water: Sprite = None
WaterX = 0
WaterY = 0
CruiserOrientation = 0
statusbar: StatusBarSprite = None
Cruiser: Sprite = None
Treassure: Sprite = None
CountTressure = 0
lastTreasureScore = 0
finder2: Sprite = None
finderOn = 0
maxCruiserSpeed = 0
GameInitDone = 0
blockMenu.set_controls_enabled(False)
GameInitDone = 0
music.set_volume(80)
game.splash("Wir sind Seenotretter",
    "      jetzt spenden!                 www.seenotretter.de    ")
game.splash("für Alfred, Ruth & Albert",
    "                                   von Papa                                   v1.5")
play_sos(2)
blockMenu.set_colors(1, 15)
blockMenu.show_menu(["Karte 1", "Karte 2"],
    MenuStyle.LIST,
    MenuLocation.FULL_SCREEN)
blockMenu.set_controls_enabled(True)

def on_update_interval():
    global RAFT1, CountRafts, swimmer1, CountSwimmers, Schiff1, CountShips
    if GameInitDone == 1:
        if CountRafts < 3:
            RAFT1 = sprites.create(assets.image("""
                raft
                """), SpriteKind.raft)
            PlaceOnTopRandom(RAFT1)
            CountRafts += 1
            RandNewSpeed(RAFT1, 1, 8)
        if CountSwimmers < 3:
            swimmer1 = sprites.create(img("""
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
                    """),
                SpriteKind.swimmer)
            animation.run_image_animation(swimmer1,
                assets.animation("""
                    SwimAnim
                    """),
                500,
                True)
            PlaceOnTopRandom(swimmer1)
            CountSwimmers += 1
            RandNewSpeed(swimmer1, 1, 1)
        if CountShips < 6 and CountRafts <= 3:
            if CountBurningShips == 0:
                Create_Burning_Ship()
            else:
                Schiff1 = sprites.create(img("""
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
                        """),
                    SpriteKind.ship)
                SelectShip(Schiff1)
                PlaceOnTopRandom(Schiff1)
                CountShips += 1
                RandNewSpeed(Schiff1, 8, 20)
game.on_update_interval(1000, on_update_interval)

def on_forever():
    global maxCruiserSpeed
    if GameInitDone == 1:
        controller.move_sprite(Cruiser, maxCruiserSpeed, maxCruiserSpeed)
        RotateCruiser()
        if statusbar.value == 0:
            maxCruiserSpeed = 0
forever(on_forever)

def on_update_interval2():
    CreateTressure()
game.on_update_interval(30000, on_update_interval2)
