
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

//% weight=0 color=#b8860b icon="\uf021" block="Weapon Node"
//% advanced=true
namespace WeaponNode {

    class ProjectileNode {
        spriteImage: Image
        spriteKind: number
        damage: number
        health: number
        speed: number
        leftChildObject: ProjectileNode = null
        rightChildObject: ProjectileNode = null


        constructor(spriteImage: Image, spriteKind: number, damage: number, health: number, speed: number, leftChild: ProjectileNode, rightChild: ProjectileNode) {
            this.spriteImage = spriteImage
            this.spriteKind = spriteKind
            this.damage = damage
            this.health = health
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
        getHealth(){
            return this.health
        }
        getRightChildObject(){
            return this.rightChildObject
        }
        getLeftChildObject() {
            return this.rightChildObject
        }
        setLeftChildObject(child: ProjectileNode) {
            this.leftChildObject = child
        }
        setRightChildObject(child: ProjectileNode) {
            this.rightChildObject = child
        }
        createSprite() : Sprite {
            let projectileSprite = sprites.create(this.spriteImage, this.spriteKind)
            sprites.setDataNumber(projectileSprite, "health", this.health)
            sprites.setDataNumber(projectileSprite, "damage", this.damage)
            sprites.setDataNumber(projectileSprite, "speed", this.speed)
            return projectileSprite
        }
    }
    //% block="sprite %SpriteImage=screen_image_picker, damage $damage, health $health, speed $speed, left child $leftChild, right child $rightChild of kind %kind=spritekind"
    //% blockId=spritescreatenoset 
    //% target.shadow=variables_get
    //% weight=60
    //% blockSetVariable = "mySpriteNode"
    //% group="Create"
    export function createProjectileNode(spriteImage: Image, damage: number, health: number, speed: number, leftChild: ProjectileNode, rightChild: ProjectileNode, kind?: number): ProjectileNode {
        let projectileNode: ProjectileNode = new ProjectileNode(spriteImage, kind, damage, health, speed, leftChild, rightChild)
        return projectileNode
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
