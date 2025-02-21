namespace SpriteKind {
    export const Cursor = SpriteKind.create()
}
let distanceToCursor: spriteutils.Position = null
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
forever(function () {
    distanceToCursor = spriteutils.pos(0, 0)
    cursorSprite.setPosition(Math.map(controller.acceleration(ControllerDimension.X), 0, 2048, 0, 320) + 160, Math.map(controller.acceleration(ControllerDimension.Y), 0, 2048, 0, 240) + 120)
    transformSprites.rotateSprite(playerShip, spriteutils.radiansToDegrees(Math.atan2(cursorSprite.y - playerShip.y, cursorSprite.x - playerShip.x)))
})
