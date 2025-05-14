namespace SpriteKind {
    export const Cursor = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (weaponType == 0) {
        projectileSprite = sprites.create(assets.image`projectile`, SpriteKind.Projectile)
        spriteutils.placeAngleFrom(
        projectileSprite,
        spriteutils.degreesToRadians(transformSprites.getRotation(playerShip)),
        15,
        playerShip
        )
        spriteutils.setVelocityAtAngle(projectileSprite, spriteutils.degreesToRadians(transformSprites.getRotation(playerShip)), 200)
        projectileSprite.setFlag(SpriteFlag.AutoDestroy, true)
    }
    pause(1000)
})
function spawnAsteroids () {
    asteroidSprite = sprites.create(img`
        . . . . . . . . . c c 8 . . . . 
        . . . . . . 8 c c c f 8 c c . . 
        . . . c c 8 8 f c a f f f c c . 
        . . c c c f f f c a a f f c c c 
        8 c c c f f f f c c a a c 8 c c 
        c c c b f f f 8 a c c a a a c c 
        c a a b b 8 a b c c c c c c c c 
        a f c a a b b a c c c c c f f c 
        a 8 f c a a c c a c a c f f f c 
        c a 8 a a c c c c a a f f f 8 a 
        . a c a a c f f a a b 8 f f c a 
        . . c c b a f f f a b b c c 6 c 
        . . . c b b a f f 6 6 a b 6 c . 
        . . . c c b b b 6 6 a c c c c . 
        . . . . c c a b b c c c . . . . 
        . . . . . c c c c c c . . . . . 
        `, SpriteKind.Enemy)
    asteroidPosition = spriteutils.pos(0, 0)
    if (Math.percentChance(50)) {
        if (Math.percentChance(50)) {
            asteroidPosition = spriteutils.pos(0, randint(0, scene.screenHeight()))
        } else {
            asteroidPosition = spriteutils.pos(scene.screenWidth(), randint(0, scene.screenHeight()))
        }
    } else {
        if (Math.percentChance(50)) {
            asteroidPosition = spriteutils.pos(randint(0, scene.screenWidth()), 0)
        } else {
            asteroidPosition = spriteutils.pos(randint(0, scene.screenWidth()), scene.screenHeight())
        }
    }
    asteroidSprite.setPosition(0, 0)
    spriteutils.setVelocityAtAngle(asteroidSprite, spriteutils.angleFrom(asteroidSprite, playerShip), 50)
    asteroidSprite.setFlag(SpriteFlag.AutoDestroy, true)
}
browserEvents.onMouseMove(function (x, y) {
    cursorSprite.setPosition(x, y)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    sprites.destroy(otherSprite)
})
let rotationOffset = 0
let asteroidPosition: spriteutils.Position = null
let asteroidSprite: Sprite = null
let projectileSprite: Sprite = null
let cursorSprite: Sprite = null
let playerShip: Sprite = null
let weaponType = 0
let distanceToCursor = 0
weaponType = 1
playerShip = sprites.create(assets.image`ship`, SpriteKind.Player)
controller.moveSprite(playerShip)
cursorSprite = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . 2 2 2 2 2 . . . . . 
    . . . . . . 2 2 2 2 2 . . . . . 
    . . . . . . 2 2 2 2 2 . . . . . 
    . . . . . . 2 2 2 2 2 . . . . . 
    . . . . . . 2 2 2 2 2 . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Cursor)
forever(function () {
    transformSprites.rotateSprite(playerShip, spriteutils.radiansToDegrees(Math.lerpAngle(spriteutils.degreesToRadians(transformSprites.getRotation(playerShip)), spriteutils.angleFrom(cursorSprite, playerShip) + 3.14159, 1 - 2 ** (-0.05 * game.getDeltaTime()))))
})
forever(function () {
    if (browserEvents.MouseLeft.isPressed()) {
        if (weaponType == 1) {
            rotationOffset = -15
            for (let index = 0; index <= 2; index++) {
                projectileSprite = sprites.create(assets.image`projectile`, SpriteKind.Projectile)
                spriteutils.placeAngleFrom(
                projectileSprite,
                spriteutils.degreesToRadians(transformSprites.getRotation(playerShip)),
                15,
                playerShip
                )
                spriteutils.setVelocityAtAngle(projectileSprite, spriteutils.degreesToRadians(transformSprites.getRotation(playerShip) + rotationOffset), 200)
                projectileSprite.setFlag(SpriteFlag.AutoDestroy, true)
                rotationOffset += 15
            }
            pause(500)
        }
    }
})
game.onUpdateInterval(500, function () {
    spawnAsteroids()
})
