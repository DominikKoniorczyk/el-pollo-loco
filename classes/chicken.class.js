import { MovableObject } from "./movable-object.class.js";
import { ImageHub } from "./imagehub.class.js";

export class Chicken extends MovableObject {
    width = 60;
    height = 60;
    y = 363;
    standingGroundY = 363;
    minPositionX = 200;
    offset = { top: 5, bottom: 10, left: 5, right: 10 };
    shouldDrawCollisionFrame = true;
    wasOffScreen = false;
    
    constructor(world_tiles, level, img){
        super();
        this.damagePerAttack = 10 * level.difficultyLevel;
        super.loadImage(img.walk[0]);
        super.loadImages(img.walk);
        super.loadImages(img.death);
        this.worldTiles = world_tiles;  
        this.calculateSpeeds();
    }

    calculateSpeeds(){
        this.x = this.getRandomX(this.worldTiles);
        this.speed = 1 + Math.random() * 0.5;      
    }

    interval60FPS(){
        super.interval60FPS();
        this.move();
    }

    move(){
        if(!this.checkIfOffScreen(80) && !this.wasOffScreen){
            super.moveLeft();    
        } else if(this.checkIfOffScreen(80)) { 
            this.wasOffScreen = true;  
            super.moveRight();     
        } else if(this.x < (this.worldTiles - 1) *720 && this.wasOffScreen){
            super.moveRight();
        } else {
            this.wasOffScreen = false;
            super.moveLeft();
        }
    }

    interval10ms(globalIntervalCounter){
        if(globalIntervalCounter % 110 === 0){
            this.animate();
        }
    }

    animate(){
        if(!this.isDead) this.playAnimation(ImageHub.chicken.walk);   
        else if(this.isDead && this.deathTime == 0){
            this.playAnimation(ImageHub.chicken.death)
            this.deathTime = new Date().getTime();
        } else if(new Date().getTime() - this.deathTime < 2000){
            this.playAnimation(ImageHub.chicken.death)
        } else {
            this.removeFromWorld(this.world.level.enemies, this.world.level.enemies);
        }
    }

    applyDamage(){
        this.isDead = true;
        this.speed = 0;
    }
}