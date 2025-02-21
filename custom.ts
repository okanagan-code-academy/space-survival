
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
    export const ARCADE_SCREEN_WIDTH = 320
    export const ARCADE_SCREEN_HEIGHT = 240
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
}
