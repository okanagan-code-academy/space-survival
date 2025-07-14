namespace SpriteKind {
    export const Cursor = SpriteKind.create()
    export const Upgrade = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    let currentScene: scene.Scene = game.currentScene()
    pauseScene(currentScene)
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
    asteroidSprite.setFlag(SpriteFlag.AutoDestroy, true)
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
    asteroidSprite.setPosition(asteroidPosition.x, asteroidPosition.y)
    spriteutils.setVelocityAtAngle(asteroidSprite, spriteutils.angleFrom(asteroidSprite, playerShip), 50)
    asteroidSprite.setFlag(SpriteFlag.AutoDestroy, true)
}
browserEvents.onMouseMove(function (x, y) {
    cursorSprite.setPosition(x, y)
})
function onStart () {
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
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    sprites.destroy(otherSprite)
    info.changeScoreBy(15)
})

let cursorSprite: Sprite = null
let asteroidPosition: spriteutils.Position = null
let asteroidSprite: Sprite = null
let playerShip: Sprite = null
let rotationOffset = 0
let upgradeRound = false
class Base extends ProjectileNode {
    shootProjectile() {
        let projectileSprite = super.createSprite()
        spriteutils.placeAngleFrom(
            projectileSprite,
            spriteutils.degreesToRadians(transformSprites.getRotation(playerShip)),
            15,
            playerShip
        )
        spriteutils.setVelocityAtAngle(projectileSprite, spriteutils.degreesToRadians(transformSprites.getRotation(playerShip)), this.speed)
        pause(this.delay)
    }
}
class MinorShotgun extends ProjectileNode {
    shootProjectile() {
        let rotationOffsetAngle = -Math.PI / 8
        for (let i = 0; i <= 2; i++) {
            let projectileSprite = super.createSprite()
            spriteutils.placeAngleFrom(
                projectileSprite,
                spriteutils.degreesToRadians(transformSprites.getRotation(playerShip)) + rotationOffsetAngle,
                15,
                playerShip
            )
            spriteutils.setVelocityAtAngle(projectileSprite, spriteutils.degreesToRadians(transformSprites.getRotation(playerShip)) + rotationOffsetAngle, this.speed)
            rotationOffsetAngle += (Math.PI / 8)
        }
        pause(this.delay)
    }
}
class MinorMachineGun extends ProjectileNode{
    shootProjectile() {
        let projectileSprite = super.createSprite()
        spriteutils.placeAngleFrom(
            projectileSprite,
            spriteutils.degreesToRadians(transformSprites.getRotation(playerShip)),
            15,
            playerShip
        )
        spriteutils.setVelocityAtAngle(projectileSprite, spriteutils.degreesToRadians(transformSprites.getRotation(playerShip)), this.speed)
        pause(this.delay)
    }
}
let baseNode = new Base("Base", assets.image`projectile`, SpriteKind.Projectile, 1000000, 400, 200, null, null)
let minorShotgunNode = new MinorShotgun("Minor Shotgun", assets.image`projectile`, SpriteKind.Projectile, 1000000, 200, 200, null, null)
let minorMachineGun = new MinorMachineGun("Minor Machine", assets.image`projectile`, SpriteKind.Projectile, 1000, 500, 75, null, null)
baseNode.setLeftChildObject(minorShotgunNode)
baseNode.setRightChildObject(minorMachineGun)
let currentProjectileNode: ProjectileNode = baseNode

onStart()
function pauseScene(scene: scene.Scene){
    // game.addScenePopHandler()
    // game.popScene()
    // controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    //     game.
    // })

}
forever(function () {
    transformSprites.rotateSprite(playerShip, spriteutils.radiansToDegrees(Math.lerpAngle(spriteutils.degreesToRadians(transformSprites.getRotation(playerShip)), spriteutils.angleFrom(cursorSprite, playerShip) + 3.14159, 1 - 2 ** (-0.05 * game.getDeltaTime()))))
})
forever(function () {
    if (browserEvents.MouseLeft.isPressed()) {
        currentProjectileNode.shootProjectile()
    }
})
game.onUpdateInterval(500, function () {
    if(upgradeRound){
        return
    }
    spawnAsteroids()
})
info.onScore(30, function(){
    upgradeRound = true
    const offsetX: number = 50
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    createUpgradeCards(screen.width / 3 - offsetX, screen.height / 2, currentProjectileNode.getLeftChildObject(), "left")
    createUpgradeCards(2*screen.width / 3 + offsetX, screen.height / 2, currentProjectileNode.getRightChildObject(), "right")
    
})
function createUpgradeCards(positionX: number, positionY: number, childNode: ProjectileNode, childType: string ) {
    if(!childNode){
        return
    }
    let upgradeCardSprite = sprites.create(assets.image`upgradeCard`, SpriteKind.Upgrade)
    sprites.setDataString(upgradeCardSprite, "childType", childType)
    upgradeCardSprite.setScale(3, ScaleAnchor.Middle)
    upgradeCardSprite.setPosition(positionX, positionY)
    let titleTextSprite = textsprite.create(childNode.name, 0, 15)
    titleTextSprite.setScale(2.5, ScaleAnchor.Middle)
    titleTextSprite.setPosition(upgradeCardSprite.x, upgradeCardSprite.y - upgradeCardSprite.height / 2 + 25)
    let damageLabelSprite = textsprite.create("Damage: " + childNode.damage, 0, 15)
    damageLabelSprite.setPosition(titleTextSprite.x, titleTextSprite.y + 50)
    damageLabelSprite.setScale(2, ScaleAnchor.Middle)

}
sprites.onOverlap(SpriteKind.Cursor, SpriteKind.Upgrade, function(sprite: Sprite, otherSprite: Sprite){
    otherSprite.setImage(assets.image`selectedUpgradeCard`)
    if(browserEvents.MouseLeft.isPressed()){
        sprites.destroyAllSpritesOfKind(SpriteKind.Upgrade)
        sprites.destroyAllSpritesOfKind(SpriteKind.Text)
        pause(100)
        let childType: string = sprites.readDataString(otherSprite, "childType")
        if(!childType){
            return
        }
        if(childType == "left"){
            currentProjectileNode = currentProjectileNode.getLeftChildObject()
        } else {
            currentProjectileNode = currentProjectileNode.getRightChildObject()
        }
        
        upgradeRound = false
    }
})

forever(function(){
    for(let card of sprites.allOfKind(SpriteKind.Upgrade)){
        if(!card.overlapsWith(cursorSprite)){
            card.setImage(assets.image`upgradeCard`)
        }
    }
})
