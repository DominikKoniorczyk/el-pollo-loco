import { MovableObject } from "./movable-object.class.js";
import { ImageHub } from "./imagehub.class.js";
import { SoundHub } from "./soundhub.class.js";

/**
 * Creats a new throwable object.
 * @extends MovableObject
 * @class
 */
export class ThrowableObject extends MovableObject {
    width = 50;
    height = 60;
    speedY = 20;
    speedx = 30;
    standingGroundY = 360;
    world;
    currentSplashIndex = 0;
    damageApplied = false;
    splashSound = new Audio("./assets/audio/throwable/bottleBreak.mp3");
    character;

    constructor(world, x, y, character){
        super();
        const direction = character.otherDirection ? -1 : 1;
        this.loadImage(ImageHub.bottle.rotation[0]);
        this.loadImages(ImageHub.bottle.rotation);
        this.loadImages(ImageHub.bottle.splash);
        this.speedx = this.speedx * direction;
        this.world = world; 
        this.x = x;
        this.y = y;
        this.character = character;               
    }

    /**
     * Called every 10ms. Calls the parent method and triggers the fly() method every 50 intervals.
     * @param {number} globalIntervalCounter - The global interval counter.
     */
    interval10ms(globalIntervalCounter){
        super.interval10ms(globalIntervalCounter);
        if(globalIntervalCounter % 50 === 0){
            this.fly();
        }
    }
    
    /**
     * Called every frame (60 FPS). Calls the parent method and checks for collisions with enemies.
     */
    interval60FPS(){
        super.interval60FPS(); 
        this.checkHitEnemy();       
    }

    /**
     * Plays the bottle rotation animation.
     */
    playRotationAnim(){
        this.playAnimation(ImageHub.bottle.rotation);
    }

    /**
     * Moves the object forward and plays rotation animation, or triggers splash when reaching the ground.
     */
    fly(){
        if(this.y < this.standingGroundY){
            this.playRotationAnim();
            this.x += this.speedx;
        } else {
            SoundHub.playOne(this.splashSound);
            this.splash();
        }
    }

    /**
     * Plays the splash animation and removes the object from the world when the animation finishes.
     */
    splash(){
        if(this.currentSplashIndex < ImageHub.bottle.splash.length){
            const path = ImageHub.bottle.splash[this.currentSplashIndex];
            this.img = this.imageCache[path];
            this.currentSplashIndex++;
        } else {
            const index = this.world.throwableObjects.indexOf(this);
            if(index !== -1) this.world.throwableObjects.splice(index, 1);
        }
    }

    /**
     * Checks collisions with enemies, applies damage once, and triggers splash on hit.
     */
    checkHitEnemy(){        
        this.world.level.enemies.forEach(e => {
            if(this.isColliding(e)){
                if(!this.damageApplied){
                    this.damageApplied = true;
                    e.applyDamage(20, this.character);
                }
                this.splash();
            }            
        });
    }
}