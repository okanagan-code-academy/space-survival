
/**
* Use this file to define custom functions and blocks.
* Read more at https://arcade.makecode.com/blocks/custom
*/


namespace SpriteSheet {
    export let shipImage: Image =assets.image`ship`
    export let projectileImage: Image =assets.image`projectile`

    export let asteroidImages: Image[] = [
        sprites.space.spaceAsteroid0,
        sprites.space.spaceAsteroid1,
        sprites.space.spaceAsteroid2,
        sprites.space.spaceAsteroid3,
        sprites.space.spaceAsteroid4,
    ]
    export const explosionAnimation: Image[] = [
        sprites.projectile.explosion1,
        sprites.projectile.explosion2,
        sprites.projectile.explosion3,
        sprites.projectile.explosion4,
    ]
    export const blankImage: Image = assets.image`blank`
}

// namespace VFXSprites {
//     const frameInterval: number = 50
//     export function createExplosion(animations: Image[], position: Vector2, scale: number): void {
//         let explosionSprite: Sprite = sprites.create(SpriteSheet.blankImage, SpriteKind.Explosion)
//         explosionSprite.setPosition(position.x, position.y)
//         explosionSprite.scale = scale
//         explosionSprite.lifespan = animations.length * frameInterval
//         animation.runImageAnimation(explosionSprite, animations, frameInterval, false)
//     }
// }

namespace SpriteKind {
    export const Asteroid = SpriteKind.create()
    export const Explosion = SpriteKind.create()
}
namespace userconfig {
    export const ARCADE_SCREEN_WIDTH = 640
    export const ARCADE_SCREEN_HEIGHT = 480
}

enum upgradeType {
    

}
class ProjectileNode {
    name: string
    spriteImage: Image
    spriteKind: number
    damage: number
    delay: number
    speed: number
    leftChildObject: ProjectileNode = null
    rightChildObject: ProjectileNode = null


    constructor(name: string, spriteImage: Image, spriteKind: number, damage: number, delay: number, speed: number, leftChild: ProjectileNode, rightChild: ProjectileNode) {
        this.name = name
        this.spriteImage = spriteImage
        this.spriteKind = spriteKind
        this.damage = damage
        this.delay = delay
        this.speed = speed
        this.leftChildObject = leftChild
        this.rightChildObject = rightChild
    }
    getImage() {
        return this.spriteImage
    }
    getKind() {
        return this.spriteKind
    }
    getDamage() {
        return this.damage
    }
    getdelay(){
        return this.delay
    }
    getSpeed(){
        return this.speed
    }
    getRightChildObject(){
        return this.rightChildObject
    }
    getLeftChildObject() {
        return this.leftChildObject
    }
    setLeftChildObject(child: ProjectileNode) {
        this.leftChildObject = child
    }
    setRightChildObject(child: ProjectileNode) {
        this.rightChildObject = child
    }
    createSprite() : Sprite {
        let projectileSprite = sprites.create(this.spriteImage, this.spriteKind)
        sprites.setDataNumber(projectileSprite, "delay", this.delay)
        sprites.setDataNumber(projectileSprite, "damage", this.damage)
        sprites.setDataNumber(projectileSprite, "speed", this.speed)
        projectileSprite.setPosition(playerShip.x, playerShip.y)
        return projectileSprite
    }
    shootProjectile() : void {
        
    }

}
   
//% weight=100 color=#8E2EC4 icon=""
namespace Math {
    /**
    * Linear interpolation between two values
    * @param value0 is a real number, eg: 25.44
    * @param value1 is a different real number, eg: 52.14
    */
    //% block
    export function lerp(value0: number, value1: number, t: number): number {
        return value0 + t * (value1 - value0);
    }
    /**
    * Linear interpolation between two values, in particular with angles
    * as angles are restricted between the interval [-Math.PI, Math.PI]
    * @param value0 is a real number, eg: 25.44
    * @param value1 is a different real number, eg: 52.14
    */
    //% block
    export function lerpAngle(value0: number, value1: number, t: number): number {
        let horizontalComponent = (1 - t) * Math.cos(value0) + t * Math.cos(value1);
        let verticalComponent = (1 - t) * Math.sin(value0) + t * Math.sin(value1);
        return Math.atan2(verticalComponent, horizontalComponent);
    }
}

//% weight=100 color=#8E2EC4 icon=""
namespace game {
    /**
    * The amount of time elapsed per frame
    *
    */
    //% block
    export function getDeltaTime(): number {
        return control.eventContext().deltaTimeMillis
    }
}
