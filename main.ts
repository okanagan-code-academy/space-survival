namespace SpriteKind {
    export const Cursor = SpriteKind.create()
}
let projectileSprite: Sprite = null
let distanceToCursor = null
let playerShip = sprites.create(assets.image`ship`, SpriteKind.Player)
controller.moveSprite(playerShip)
let cursorSprite = sprites.create(img`
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
game.onUpdate(function () {
	
})
forever(function () {
    cursorSprite.setPosition(Math.map(controller.acceleration(ControllerDimension.X), 0, 2048, 0, 320) + 160, Math.map(controller.acceleration(ControllerDimension.Y), 0, 2048, 0, 240) + 120)
    transformSprites.rotateSprite(playerShip, Math.lerp(transformSprites.getRotation(playerShip), spriteutils.radiansToDegrees(Math.atan2(cursorSprite.y - playerShip.y, cursorSprite.x - playerShip.x)), 1 - 2 ** (-0.005 * game.getDeltaTime())))
})
forever(function () {
    if (controller.A.isPressed()) {
        projectileSprite = sprites.create(assets.image`projectile`, SpriteKind.Projectile)
        spriteutils.placeAngleFrom(
        projectileSprite,
        spriteutils.degreesToRadians(transformSprites.getRotation(playerShip)),
        10,
        playerShip
        )
        spriteutils.setVelocityAtAngle(projectileSprite, spriteutils.degreesToRadians(transformSprites.getRotation(playerShip)), 200)
        pause(100)
    }
})
