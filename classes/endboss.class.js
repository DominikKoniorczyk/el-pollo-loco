import { ImageHub } from "./imagehub.class.js";
import { MovableObject } from "./movable-object.class.js";
import { SoundHub } from "./soundhub.class.js";

/**
 * Creats a new endboss.
 * @extends MovableObject
 * @class
 */
export class Endboss extends MovableObject {
    height = 400;
    width = 343;
    y = 60;
    otherDirection = true;
    offset = { top: 80, bottom: 40, left: 40, right: 40 };
    shouldDrawCollisionFrame = true;
    statBarOffset = { left: 90, top: 30} 
    health = 100;
    sequence = { startSequenceStart: false, startSequenceEnd: false, shouldChase: false, shouldFlee: false, shouldMoveBack: false, attack: false };
    left = false;
    canMove = false;    
    speed = 6;
    timeSinceLastRage = 0;
    currentAttackCounter = 0;
    difficultyLevel;
    killScorePoints = 2500;
    startSound = new Audio('./assets/audio/endboss/endbossApproach.wav');

    constructor(world_tiles, size, level){
        super();
        this.x = (world_tiles * 720) - 600;
        this.height = size.height;
        this.width = size.width;
        this.difficultyLevel = level.difficultyLevel;
        this.damagePerAttack = 20 * (level.difficultyLevel == 1 ? 1 : level.difficultyLevel == 2 ? 4 : 6);
        this.speed = 6 * level.difficultyLevel;
        this.addAudio();
        this.initEndboss();
    }

    /**
     * Initializes the end boss by adding audio and preloading all required images.
     * Loads alert, attack, death, hurt, and walk animations to ensure smooth playback.
     */
    initEndboss(){
        this.addAudio();
        this.loadImage(ImageHub.endboss.alert[0]);
        this.loadImages(ImageHub.endboss.alert);
        this.loadImages(ImageHub.endboss.attack);
        this.loadImages(ImageHub.endboss.death);
        this.loadImages(ImageHub.endboss.hurt);
        this.loadImages(ImageHub.endboss.walk);
    }

    /** Returns true if the character is in attack range. */
    checkDistanceToPlayer(){
        return this.world.character ? this.x - this.world.character.x : 0; 
    }

    /** Returns true if the boss could chase the player. */
    checkCanChase(){
        return this.sequence.startSequenceStart && this.sequence.startSequenceEnd && this.checkDistanceToPlayer() > 50;
    }

    /** Returns true if the boss could flee from the player. */
    checkCanFlee(){
        return this.checkDistanceToPlayer <= 500 && this.x <= (this.worldTiles * 720) - 600;
    }

    /**
     * Checks whether the player is positioned behind the collision frame.
     * If true, movement is enabled and the character is moved forward.
     */
    checkPlayerIsBehind(){
        if(this.world.character.x > this.realCollisionFram.x + this.realCollisionFram.w){
            this.canMove = true;
            this.left = false;
            this.move();            
        }
    }

    /**
     * Checks the current attack and chase state based on player distance. 
     * Disables movement during an active attack, or resets the sequence if rage has cooled down for 5 seconds.
     */
    checkAttackStatePlayerDistance(){
        if(!this.checkCanChase() && this.sequence.attack){
            this.setCanMove(false, false);
        } else if(new Date().getTime() - this.timeSinceLastRage >= 5000){
            this.setSequenceState(this.sequence.startSequenceStart, this.sequence.startSequenceEnd, true, this.sequence.shouldFlee, this.sequence.shouldMoveBack, false);
        }       
    }
    
    /**
     * Updates the end boss each frame by selecting the appropriate animation or behavior based on health, sequence state,
     * distance to the player, and movement flags. Plays the death animation once if the boss is dead.
     */
    animate(){
        if(!this.checkIsDead()){
            if(this.isHurt()) this.playAnimation(ImageHub.endboss.hurt);
            else if(this.sequence.startSequenceStart && this.checkDistanceToPlayer() > 270 && !this.sequence.startSequenceEnd) this.playAnimation(ImageHub.endboss.walk);         
            else if(this.sequence.startSequenceStart && !this.sequence.startSequenceEnd) this.endStartSequence();
            else if(this.sequence.shouldChase) this.chasePlayer();
            else if(this.canMove && !this.sequence.shouldMoveBack && !this.sequence.shouldFlee) this.playAnimation(ImageHub.endboss.walk);
            else if(this.sequence.shouldMoveBack) this.fleeFromPlayer();
            else this.playAnimation(ImageHub.endboss.alert);
        } else {
            this.playDeathAnimationOnce(ImageHub.endboss.death, true);
        }
    }

    /**
     * Sets the object's left position and movement ability.
     * @param {number} left - The new left position.
     * @param {boolean} move - Whether the object can move.
     */
    setCanMove(left, move){
        this.left = left;
        this.canMove = move;
    }

    /**
     * Sets whether the character is allowed to move in the world.
     * @param {boolean} canMove - True to allow movement, false to disable it.
     */
    setCharacterCanMove(canMove){
        this.world.characterCanMove = canMove;
        this.world.character.canMove = canMove;
    }

    /**
     * Sets the state of a sequence with timing and behavior flags.
     * @param {number} _startSequenceStart - Start time of the sequence.
     * @param {number} _startSequenceEnd - End time of the sequence.
     * @param {boolean} _shouldChase - Whether to chase during the sequence.
     * @param {boolean} _shouldFlee - Whether to flee during the sequence.
     * @param {boolean} _shouldMoveBack - Whether to move back during the sequence.
     * @param {boolean} _attack - Whether to perform an attack during the sequence.
     */
    setSequenceState(_startSequenceStart, _startSequenceEnd, _shouldChase, _shouldFlee, _shouldMoveBack, _attack){
        this.sequence = {startSequenceStart: _startSequenceStart, startSequenceEnd: _startSequenceEnd, shouldChase: _shouldChase, shouldFlee: _shouldFlee, shouldMoveBack: _shouldMoveBack, attack: _attack};
    }

    /**
     * Called every 10ms; triggers the parent interval handler and runs animation every 2 seconds.
     * @param {number} globalIntervalCounter - The global counter incremented every 10ms.
     */
    interval10ms(globalIntervalCounter){
        super.interval10ms(globalIntervalCounter);
        if(globalIntervalCounter % 200 === 0){
            this.animate();       
        }         
    }

    /**
     * Updates the endboss state and UI each frame at 60 FPS, including position, health bar, movement, and attack checks.
     */
    interval60FPS(){
        super.interval60FPS();
        this.world.healthBarEndboss.setNewPositionInViewport(this.x + this.statBarOffset.left, this.y + this.statBarOffset.top);
        this.world.healthBarEndboss.setPercentage(this.health);
        this.startSequence();
        this.checkPlayerIsBehind();
        this.move();
        this.checkHealthState();
        this.checkAttackStatePlayerDistance();
    }

    startSequence(){
        if(!this.sequence.startSequenceStart && this.checkDistanceToPlayer() < 580){
            this.setSequenceState(true, false, false, false, false);
            this.setCanMove(true, true);
            this.setCharacterCanMove(false);
            SoundHub.playOne(this.startSound);
        }
    }

    /**
     * Initiates the sequence if it hasn't started and the player is within 580 units,
     * updating movement states and playing the start sound.
     */
    endStartSequence(){
        this.setCanMove(false, false);
        this.playAnimation(ImageHub.endboss.alert);
        if(this.currentImageIndex % ImageHub.endboss.alert.length == ImageHub.endboss.alert.length -1)
        {
            this.setSequenceState(true, true, true, false, false);
            this.setCharacterCanMove(true);
        }
    }

    /**
     * Handles the boss's behavior when chasing the player, enabling movement and walk animation 
     * if possible, otherwise executes attack and sequence logic.
     */
    chasePlayer(){
        if(this.checkCanChase()){
            this.setCanMove(true, true);
            this.playAnimation(ImageHub.endboss.walk); 
        } else {
            this.setCanMove(false, false);
            this.setSequenceState(this.sequence.startSequenceStart, this.sequence.startSequenceEnd, this.sequence.shouldChase, this.sequence.shouldFlee, this.sequence.shouldMoveBack, true);
            this.attack();
        }
    }

    /**
     * Performs the endboss attack sequence, updating animation, offsets, 
     * and applying damage if the player is within range.
     */
    attack(){
        const localImageIndex = this.currentImageIndex % ImageHub.endboss.alert.length;
        if(!this.world.character.checkIsDead() && localImageIndex <= ImageHub.endboss.alert.length -1)
        {
            this.offset = { top: 80, bottom: 40, left: 70, right: 40 }
            this.playAnimation(ImageHub.endboss.attack);
            if(ImageHub.endboss.attack.length / 2 == localImageIndex && this.checkDistanceToPlayer() <= 60) this.applyDamageToPlayer();           
            else if(!this.world.character.checkIsDead() && localImageIndex == ImageHub.endboss.alert.length -1 && this.currentAttackCounter == 2 * this.difficultyLevel){
                this.currentAttackCounter = 0;
                this.offset = { top: 80, bottom: 40, left: 40, right: 40 }
                this.setSequenceState(this.sequence.startSequenceStart, this.sequence.startSequenceEnd, false, this.sequence.shouldFlee, true, false);
                this.timeSinceLastRage = new Date().getTime();
            }            
        }
    }

    /**
     * Applies damage to the entity, plays hurt sound/animation, and updates score if killed.
     * @param {number} damage - Amount of damage to apply.
     * @param {Object} character - Character dealing the damage, whose score may increase.
     */
    applyDamage(damage, character){
        super.applyDamage(damage);
        SoundHub.playOne(this.hurtSound);
        if(this.health > 0) this.playAnimation(ImageHub.endboss.hurt);
        else {
            this.isDead = true;           
            character.score += this.killScorePoints;
        }
    }

    /**
     * Applies damage to the player character and increments the attack counter.
     */
    applyDamageToPlayer(){
        this.world.character.applyDamage(this.damagePerAttack); 
        this.currentAttackCounter++;
    }

    /**
     * Checks the entity's health and updates its behavior accordingly,
     * triggering sequences, spawning minions, and adjusting speed when thresholds are met.
     */
    checkHealthState(){
        if(this.health < 15){
            this.setSequenceState(this.sequence.startSequenceStart, this.sequence.startSequenceEnd, true, false, false);
        } else if(this.health <= 25) {
            this.setSequenceState(this.sequence.startSequenceStart, this.sequence.startSequenceEnd, true, false, false);
            this.world.level.bossSpawnMinions(this.x);
            this.speed = this.speed < 12 ? this.speed * 2 : this.speed;
        }
    }

    /**
     * Controls the enemy's behavior to either flee from the player or switch to a different sequence
     * based on distance and internal state flags, updating movement and animations accordingly.
     */
    fleeFromPlayer(){
        if(this.sequence.shouldMoveBack && this.checkDistanceToPlayer() < 300){
            this.setCanMove(false, true);
            this.playAnimation(ImageHub.endboss.walk);
        } else if(this.sequence.shouldFlee && this.x < (world_tiles * 720) - 600){
            this.setCanMove(false, true);
            this.playAnimation(ImageHub.endboss.walk);
        } else {
            this.setCanMove(false, false);
            this.otherDirection = true;
            this.setSequenceState(this.sequence.startSequenceStart, this.sequence.startSequenceEnd, this.sequence.shouldChase, false, false);
        }
    }

    /**
     * Moves the object left if `left` is true and movement is allowed, 
     * otherwise moves it right, provided it is not dead.
     */
    move(){
        if(this.left && this.canMove && !this.isDead){
            this.moveLeft();
        } else if(this.canMove && !this.isDead) {
            this.moveRight();
        }
    }
}