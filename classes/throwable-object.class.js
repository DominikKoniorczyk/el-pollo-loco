import { MovableObject } from "./movable-object.class.js";
import { ImageHub } from "./imagehub.class.js";
import { SoundHub } from "./soundhub.class.js";

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
    }

    interval10ms(globalIntervalCounter){
        super.interval10ms(globalIntervalCounter);
        if(globalIntervalCounter % 50 === 0){
            this.fly();
        }
    }
    
    interval60FPS(){
        super.interval60FPS(); 
        this.checkHitEnemy();       
    }

    playRotationAnim(){
        this.playAnimation(ImageHub.bottle.rotation);
    }

    fly(){
        if(this.y < this.standingGroundY){
            this.playRotationAnim();
            this.x += this.speedx;
        } else {
            SoundHub.playOne(this.splashSound);
            this.splash();
        }
    }

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

    checkHitEnemy(){        
        this.world.level.enemies.forEach(e => {
            if(this.isColliding(e)){
                if(!this.damageApplied){
                    this.damageApplied = true;
                    e.applyDamage(20);
                }
                this.splash();
            }            
        });
    }
}