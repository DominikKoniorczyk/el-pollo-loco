import { MovableObject } from "./movable-object.class.js";
import { ImageHub } from "./imagehub.class.js";

export class ThrowableObject extends MovableObject {
    width = 50;
    height = 60;
    speedY = 20;
    standing_ground_y = 360;
    world;
    currentSplashIndex = 0;

    constructor(world, x, y){
        super();
        this.loadImage(ImageHub.bottle.rotation[0]);
        this.loadImages(ImageHub.bottle.rotation);
        this.loadImages(ImageHub.bottle.splash);
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
        if(this.y < this.standing_ground_y){
            this.playRotationAnim();
            this.x += 30;
        } else {
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
                e.applyDamage();
                this.splash();
            }            
        });
    }
}