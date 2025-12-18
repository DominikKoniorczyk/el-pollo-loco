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
    sequence = { startSequenceStart: false, startSequenceEnd: false, shouldChase: false, shouldFlee: false, shouldMoveBack: false };
    left = false;
    canMove = false;    
    speed = 3;
    timeSinceLastSequence = 0;
    currentAttackCounter = 0;
    difficultyLevel;

    constructor(world_tiles, size, level){
        super();
        this.x = 900;// (world_tiles * 720) - 600;
        this.height = size.height;
        this.width = size.width;
        this.difficultyLevel = level.difficultyLevel;
        this.damagePerAttack = 20 * level.difficultyLevel;
        this.loadImage(ImageHub.endboss.alert[0]);
        this.loadImages(ImageHub.endboss.alert);
        this.loadImages(ImageHub.endboss.attack);
        this.loadImages(ImageHub.endboss.death);
        this.loadImages(ImageHub.endboss.hurt);
        this.loadImages(ImageHub.endboss.walk);
    }

    checkDistanceToPlayer(){
        return this.world.character ? this.x - this.world.character.x : 0; 
    }

    checkCanChase(){
        return this.sequence.startSequenceStart && this.sequence.startSequenceEnd && this.checkDistanceToPlayer() > 50;
    }

    checkCanFlee(){
        return this.checkDistanceToPlayer <= 500 && this.x <= (this.worldTiles * 720) - 600;
    }
    
    animate(){
        if(this.sequence.startSequenceStart && this.checkDistanceToPlayer() > 270 && !this.sequence.startSequenceEnd) this.playAnimation(ImageHub.endboss.walk);         
        else if(this.sequence.startSequenceStart && !this.sequence.startSequenceEnd) this.endStartSequence();
        else if(this.sequence.shouldChase) this.chasePlayer();
        else if(this.canMove && !this.sequence.shouldMoveBack && !this.sequence.shouldFlee) this.playAnimation(ImageHub.endboss.walk);
        else if(this.sequence.shouldMoveBack) this.fleeFromPlayer();
    }

    setCanMove(left, move){
        this.left = left;
        this.canMove = move;
    }

    setCharacterCanMove(canMove){
        this.world.characterCanMove = canMove;
        this.world.character.canMove = canMove;
    }

    setSequenceState(_startSequenceStart, _startSequenceEnd, _shouldChase, _shouldFlee, _shouldMoveBack){
        this.sequence = {startSequenceStart: _startSequenceStart, startSequenceEnd: _startSequenceEnd, shouldChase: _shouldChase, shouldFlee: _shouldFlee, shouldMoveBack: _shouldMoveBack};
    }

    interval10ms(globalIntervalCounter){
        super.interval10ms(globalIntervalCounter);
        if(globalIntervalCounter % 200 === 0){
            this.animate();       
        } 
    }

    returnCanSelectSequence(){
        return new Date().getTime() - this.timeSinceLastSequence >= 5000 && this.sequence.startSequenceStart && this.sequence.startSequenceEnd;
    }

    interval60FPS(){
        this.world.healthBarEndboss.setNewPositionInViewport(this.x + this.statBarOffset.left, this.y + this.statBarOffset.top);
        this.world.healthBarEndboss.setPercentage(this.health);
        this.startSequence();
        this.move();
        this.checkHealthState();
    }

    startSequence(){
        if(!this.sequence.startSequenceStart && this.checkDistanceToPlayer() < 580){
            this.setSequenceState(true, false, false, false, false);
            this.setCanMove(true, true);
            this.setCharacterCanMove(false);
        }
    }

    endStartSequence(){
        this.setCanMove(false, false);
        this.playAnimation(ImageHub.endboss.alert);
        if(this.currentImageIndex % ImageHub.endboss.alert.length == ImageHub.endboss.alert.length -1)
        {
            this.setSequenceState(true, true, true, false, false);
            this.setCharacterCanMove(true);
        }
    }

    chasePlayer(){
        if(this.checkCanChase()){
            this.setCanMove(true, true);
            this.playAnimation(ImageHub.endboss.walk); 
        } else {
            this.setCanMove(false, false);
            this.attack();
        }
    }

    attack(){
        const localImageIndex = this.currentImageIndex % ImageHub.endboss.alert.length;
        if(!this.world.character.checkIsDead() && localImageIndex <= ImageHub.endboss.alert.length -1)
        {
            this.playAnimation(ImageHub.endboss.attack);
            if(ImageHub.endboss.attack.length / 2 == localImageIndex && this.checkDistanceToPlayer() <= 50) {
                this.world.character.applyDamage(this.damagePerAttack); 
                this.currentAttackCounter++;
                console.log(this.currentAttackCounter);
                
            } else if(!this.world.character.checkIsDead() && localImageIndex == ImageHub.endboss.alert.length -1 && this.currentAttackCounter == 2 * this.difficultyLevel){
                this.currentAttackCounter = 0;
                this.setSequenceState(this.sequence.startSequenceStart, this.sequence.startSequenceEnd, false, this.sequence.shouldFlee, true);
            }            
        }
    }

    checkHealthState(){
        if(this.health <= 15){
            this.setSequenceState(this.sequence.startSequenceStart, this.sequence.startSequenceEnd, true, false, false);
        } else if(this.health <= 25) {
            this.setSequenceState(this.sequence.startSequenceStart, this.sequence.startSequenceEnd, true, false, false);
        }
    }

    fleeFromPlayer(){
        if(this.sequence.shouldMoveBack && this.checkDistanceToPlayer() < 300){
            this.setCanMove(false, true);
            this.playAnimation(ImageHub.endboss.walk);
        } else if(this.sequence.shouldFlee && this.x < (world_tiles * 720) - 600){
            this.setCanMove(false, true);
            this.playAnimation(ImageHub.endboss.walk);
        } else {
            this.setCanMove(false, false);
            this.setSequenceState(this.sequence.startSequenceStart, this.sequence.startSequenceEnd, this.sequence.shouldChase, false, false);
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