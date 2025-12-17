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
    isDead = false;


    constructor(world_tiles){
        super();
        super.loadImage(ImageHub.chicken.walk[0]);
        super.loadImages(ImageHub.chicken.walk);
        super.loadImages(ImageHub.chicken.death);
        this.world_tiles = world_tiles;  
        this.calculateSpeeds();
    }

    calculateSpeeds(){
        this.x = this.getRandomX(this.world_tiles);
        this.speed = 0.5 + Math.random() * 0.5;      
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
        } else if(this.x < (this.world_tiles - 1) *720 && this.wasOffScreen){
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