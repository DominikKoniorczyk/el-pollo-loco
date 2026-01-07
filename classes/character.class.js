import { MovableObject } from "./movable-object.class.js";
import { ImageHub } from "./imagehub.class.js";
import { SoundHub } from "./soundhub.class.js";
import { gameOver } from "../js/game.js";

export class Character extends MovableObject {
    width = 122;
    height = 240;
    y = 190;
    speed = 10;
    standingGroundY = 190;
    offset = { top: 105, bottom: 12, left: 25, right: 35 };
    bottleCount = 10;
    coinCount = 0;
    throwObject = false;
    timeSinceLastMove = 0;
    canMove = true;
    sounds = [new Audio("./assets/audio/character/characterDamage.mp3"), new Audio("./assets/audio/character/characterSnoring.mp3"), new Audio("./assets/audio/character/characterRun.mp3"), 
        new Audio("./assets/audio/character/characterJump.wav"), new Audio("./assets/audio/character/characterDead.wav")
    ];
    score = 0;
    lastThrowedBottle = 0;
    runSoundPlaying = false;

    constructor(){
        super();
        this.loadImage(ImageHub.character.idle[0]);
        this.loadImages(ImageHub.character.idle);
        this.loadImages(ImageHub.character.idle_long);
        this.loadImages(ImageHub.character.walk);
        this.loadImages(ImageHub.character.jump);
        this.loadImages(ImageHub.character.hurt);
        this.loadImages(ImageHub.character.death);
    }

    /**
     * Updates the character state at 60 FPS.
     * Handles movement, jumping, and camera position.
     */
    interval60FPS(){
        super.interval60FPS();
        if(this.world.keyboard.RIGHT && (this.x < this.world.level.levelEndX - 720) && !this.checkIsDead() && this.canMove){
                this.moveRight();
            } else if(this.world.keyboard.LEFT && this.x > 100 && !this.checkIsDead() && this.canMove){
                this.moveLeft();
            }
        if(this.world.keyboard.SPACE && !this.isInAir() && !this.checkIsDead() && this.canMove){
            this.jump();
        }
        this.world.camera_x = -this.x + 100;
        this.world.level.air.x = this.x - 100;
        this.checkHeight();
    }

    /**
     * Ensures the character does not fall below the ground level.
     * Resets vertical position and speed if below standing ground.
     */
    checkHeight(){
        if(this.y > this.standingGroundY){
            this.speedY = 0;
            this.y = this.standingGroundY;
        }
    }

    /**
     * Checks if the character can throw an object.
     * Returns true if bottles are available, character is alive, and cooldown passed.
     */
    checkCanThrow(){
        return !this.throwObject && this.bottleCount != 0 && !this.checkIsDead() && new Date().getTime() - this.lastThrowedBottle >= 500;
    }

    /**
     * Updates character state every 10ms.
     * Handles animations, life state, and throw key checks at specific intervals.
     * @param {number} globalIntervalCounter - Current global interval tick.
     */
    interval10ms(globalIntervalCounter){
        super.interval10ms(globalIntervalCounter);
        if(globalIntervalCounter % 50 === 0){
            this.walking();       
            this.jumpAnimation();
            this.checkLifeState();
            this.hurtAnimation();
            this.checkThrowKeyUp();            
        }
        if(globalIntervalCounter % 200 === 0){
            this.idleAnimationSwitch();
        }
    }

    /**
     * Plays walking animation if character moves on the ground.
     * Resets move timer and plays sound; stops sound if not walking.
     */
    walking(){
        if((this.world.keyboard.RIGHT || this.world.keyboard.LEFT) && !this.isInAir() && !this.world.keyboard.SPACE && !this.checkIsDead() && this.canMove){
            this.playAnimation(ImageHub.character.walk);
            this.timeSinceLastMove = 0;
            this.playRunSound(true);
        } else {
            this.playRunSound(false);
        }
    }

    /**
     * Switches the character's idle animation based on inactivity.
     * Plays a short idle or long idle animation with sound after 5 seconds.
     */
    idleAnimationSwitch(){
        if(!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.isInAir() && !this.world.keyboard.SPACE && !this.checkIsDead() || !this.canMove){
            if(this.timeSinceLastMove === 0) this.timeSinceLastMove = new Date().getTime();
            if(new Date().getTime() - this.timeSinceLastMove <= 5000){
                this.playAnimation(ImageHub.character.idle);
            } else {
                this.playAnimation(ImageHub.character.idle_long);
                SoundHub.playOne(this.sounds[1]);
            }
        }
    }

    /**
     * Plays the jump animation if the character is in the air and not dead.
     * Resets idle timer and plays the jump sound effect.
     */
    jumpAnimation(){
        if(this.isInAir() || this.speedY > 0 && !this.checkIsDead()){
            this.playAnimation(ImageHub.character.jump);
            this.timeSinceLastMove = 0;        
            SoundHub.playOne(this.sounds[3]);
        }
        else {
            SoundHub.stopAndResetOne(this.sounds[3]);
        }
    }

    /**
     * Resets the throw action when the throw key is released.
     */
    checkThrowKeyUp(){
        if(this.throwObject && !this.world.keyboard.THROW){
            this.throwObject = false;
        }
    }

    /**
     * Plays the hurt animation if the character is injured.
     * Resets idle timer and plays the hurt sound effect.
     */
    hurtAnimation(){
        if(this.isHurt()){
            this.playAnimation(ImageHub.character.hurt);
            this.timeSinceLastMove = 0;
            SoundHub.playOne(this.sounds[0]);
        }
    }

    /**
     * Checks if the character is dead and handles death animation and effects.
     * Triggers jump if on ground and ends the game if fallen off screen.
     */
    checkLifeState(){
        if(this.checkIsDead()){
            this.playAnimation(ImageHub.character.death);
            if(!this.isInAir() && this.speedY <= 0){
                this.standingGroundY = 1000;
                this.jump();
                SoundHub.playOne(this.sounds[4]);
            }
            if(this.y >= 700) gameOver(false);
        }
    }

    /**
     * Throws an object and updates inventory and UI.
     * Marks the throw action and records the last throw time.
     */
    throwAnObject(){
        this.bottleCount--;
        this.throwObject = true;
        this.world.bottleBar.setPercentage(this.bottleCount *10);
        this.lastThrowedBottle = new Date().getTime();
    }

    /**
     * Checks collision with enemies and applies damage to either the player or the enemy.
     * @param {Array} enemies - Array of enemy objects to check collision against.
     */
    checkEnemyCollision(enemies){        
        enemies.forEach(enemy => {
            if(this.isColliding(enemy) && !enemy.isDead){
                if(!(this.isInAir() && this.speedY < 0)){
                    this.applyDamage(enemy.damagePerAttack);                    
                } else if(!this.checkIsDead()) {
                    enemy.applyDamage(10, this);
                    this.speedY = this.jump_height / 2;                
                }           
        }});
    }

    /**
     * Checks collision with coins, increments coin count or restores health if max coins reached.
     * @param {Array} coins - Array of coin objects to check collision against.
     */
    checkCoinCollision(coins){
        coins.forEach(coin => {
            if(this.isColliding(coin)){
                if(this.coinCount + 1 < 10) {
                    this.addCoin(coin);
                }
                else {
                    this.coinCount = 0;
                    this.health = 100;
                    this.world.healthBar.setPercentage(this.health);  
                    this.world.coinBar.setPercentage((this.coinCount + 1) *10);                  
                }
            }            
        })
    }

    /**
     * Increases coin count and score, updates coin UI, and removes the collected coin from the world.
     * @param {Object} coin - Coin object to be collected.
     */
    addCoin(coin){        
        this.coinCount++;        
        this.score += 100;
        this.world.coinBar.setPercentage((this.coinCount + 1) *10);
        coin.removeFromWorld(this.world.level.coins, this.world.level.collectableObjects);
    }

    /**
     * Checks collision with bottles, increments bottle count, updates bottle UI, and removes bottle from world.
     * @param {Array} bottles - Array of bottle objects to check collision against.
     */
    checkBottleCollision(bottles){
        bottles.forEach(bottle => {
            if(this.isColliding(bottle)){             
                if(this.bottleCount < 10) {             
                    this.bottleCount++;     
                    this.world.bottleBar.setPercentage((this.bottleCount) *10);
                    bottle.removeFromWorld(this.world.level.bottles, this.world.level.collectableObjects); 
                }
            }
        })
    }

    /**
     * Applies damage to the player if enough time has passed since the last hit and updates health UI.
     * @param {number} damage - Amount of damage to apply.
     */
    applyDamage(damage){
        if(!this.isInAir() && new Date().getTime() - this.timeSinceLastDamage > 1000){
            super.applyDamage(damage);
            this.world.healthBar.setPercentage(this.health);
            this.timeSinceLastDamage = new Date().getTime();
        }
    }

    stopMoveSound(){
        SoundHub.stopOne(this.sounds[2]);
    }

    playRunSound(run){
        if(run && !this.runSoundPlaying) {
            this.runSoundPlaying = true;
            SoundHub.playOne(this.sounds[2]);
        }
        else if(!run && this.runSoundPlaying) {
            SoundHub.stopOne(this.sounds[2]);
            this.runSoundPlaying = false;
        }
    }
}
