import { ImageHub } from "./imagehub.class.js";
import { MovableObject } from "./movable-object.class.js";

export class Endboss extends MovableObject {
    height = 400;
    width = 343;
    y = 60;
    otherDirection = true;
    offset = { top: 80, bottom: 150, left: 40, right: 80 };
    shouldDrawCollisionFrame = true;
    statBarOffset = { left: 90, top: 30} 
    health = 100;
    sequence = { startSequenceStart: false, statSequenceEnd: false, lastSequence: "start", sequenceFinished: false };
    left = false;
    canMove = false;    
    speed = 1.5;
    timeSinceLastSequence = 0;

    constructor(world_tiles, size, level){
        super();
        this.x = 900;// (world_tiles * 720) - 600;
        this.height = size.height;
        this.width = size.width;
        this.damagePerAttack = 20 * level.difficultyLevel;
        this.loadImage(ImageHub.endboss.alert[0]);
        this.loadImages(ImageHub.endboss.alert);
        this.loadImages(ImageHub.endboss.attack);
        this.loadImages(ImageHub.endboss.death);
        this.loadImages(ImageHub.endboss.hurt);
        this.loadImages(ImageHub.endboss.walk);
    }

    interval10ms(globalIntervalCounter){
        super.interval10ms(globalIntervalCounter);
        if(globalIntervalCounter % 200 === 0){
            this.animate();       
        } 
    }

    returnCanSelectSequence(){
        return new Date().getTime() - this.timeSinceLastSequence >= 5000 && this.sequence.startSequenceStart && this.sequence.statSequenceEnd;
    }

    interval60FPS(){
        this.world.healthBarEndboss.setNewPositionInViewport(this.x + this.statBarOffset.left, this.y + this.statBarOffset.top);
        this.world.healthBarEndboss.setPercentage(this.health);
        this.startSequence();
        this.move();
        if(this.returnCanSelectSequence()){
            this.selectNextSequence();
            this.timeSinceLastSequence = new Date().getTime();
        }
    }

    startSequence(){
        if(!this.sequence.startSequenceStart && this.checkDistanceToPlayer() < 580){
            this.sequence.startSequenceStart = true;
            this.world.characterCanMove = false;
            this.world.character.canMove = false;
            this.left = true;
            this.canMove = true;   
        }
    }

    checkDistanceToPlayer(){
        return this.world.character ? this.x - this.world.character.x : 0; 
    }

    checkCanChase(){
        return this.sequence.startSequenceStart && this.sequence.statSequenceEnd && this.checkDistanceToPlayer() > 50;
    }
    
    animate(){
        if(this.sequence.startSequenceStart && this.checkDistanceToPlayer() > 270 && !this.sequence.statSequenceEnd){
            this.playAnimation(ImageHub.endboss.walk);         
        } else if(this.sequence.startSequenceStart && !this.sequence.statSequenceEnd){
            this.endStartSequence();
        } else {
            this.chasePlayer();
        }
    }

    chasePlayer(){
        if(this.checkCanChase()){
            this.canMove = true;
            this.left = true;
            this.playAnimation(ImageHub.endboss.walk); 
        } else {
            this.canMove = false;
            this.left = false;
            this.attack();
        }
    }

    endStartSequence(){
        this.left = false;
        this.canMove = false;
        this.playAnimation(ImageHub.endboss.alert);
        if(this.currentImageIndex % ImageHub.endboss.alert.length == ImageHub.endboss.alert.length -1)
        {
            this.sequence.statSequenceEnd = true;
            this.world.characterCanMove = true;
            this.world.character.canMove = true;
        }
    }

    selectNextSequence(){

    }

    attack(){
        const localImageIndex = this.currentImageIndex % ImageHub.endboss.alert.length;
        if(!this.world.character.checkIsDead() && localImageIndex <= ImageHub.endboss.alert.length -1)
        {
            this.playAnimation(ImageHub.endboss.attack);
            if(ImageHub.endboss.attack.length / 2 == localImageIndex) this.world.character.applyDamage(this.damagePerAttack);
        }
    }

    move(){
        if(this.left && this.canMove){
            this.moveLeft();
        } else if(this.canMove) {
            this.moveRight();
        }
    }
}