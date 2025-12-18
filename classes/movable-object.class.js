import { DrawableObject } from "./drawable-object.class.js";

export class MovableObject extends DrawableObject {
    speed = 0.15;
    world;
    worldTiles;
    speedY = 0;
    acceleration = 1;
    standingGroundY = 0;
    jump_height = 20;
    health = 100;
    damagePerAttack = 20;
    msCounter = 0;
    lastHit = 0;

    interval60FPS(){
        this.checkIfOffScreen();
        this.applyGravity();        
    }

    interval10ms(globalIntervalCounter){
        this.msCounter == globalIntervalCounter;
    }

    moveRight(){
        this.x += this.speed;
        this.otherDirection = false;
    }

    moveLeft(){
        this.x -= this.speed;  
        this.otherDirection = true; 
    }

    checkIfOffScreen(offset){
       return this.x + this.width - offset < 0;
    }

    playAnimation(images){
        const i = this.currentImageIndex % images.length;
        const path = images[i];
        this.img = this.imageCache[path];
        this.currentImageIndex++;
    }

    applyGravity(){
        if(this.isInAir() || this.speedY > 0){
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
        }
    }

    isInAir(){
        return this.y < this.standingGroundY;
    }

    jump(){
        this.speedY = this.jump_height;
    }

    applyDamage(damage){
        this.health -= damage;
        if(this.health < 0) {
            this.health = 0;
        } else {
            this.lastHit = new Date().getTime();
        }       
    }

    checkIsDead(){
        return this.health == 0;
    }

    isHurt(){
        let timePassed = new Date().getTime() - this.lastHit;
        return timePassed < 200; 
    }
}