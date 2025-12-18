import { MovableObject } from "./movable-object.class.js";
import { ImageHub } from "./imagehub.class.js";

export class Character extends MovableObject {
    width = 122;
    height = 240;
    y = 190;
    speed = 10;
    standingGroundY = 190;
    offset = { top: 95, bottom: 105, left: 30, right: 60 };
    bottleCount = 5;
    coinCount = 0;
    throwObject = false;
    shouldDrawCollisionFrame = true;
    time_since_last_move = 0;
    canMove = true;

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
    }

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

    walking(){
        if((this.world.keyboard.RIGHT || this.world.keyboard.LEFT) && !this.isInAir() && !this.world.keyboard.SPACE && !this.checkIsDead() && this.canMove){
            this.playAnimation(ImageHub.character.walk);
            this.time_since_last_move = 0;
        } 
    }

    idleAnimationSwitch(){
        if(!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.isInAir() && !this.world.keyboard.SPACE && !this.checkIsDead() || !this.canMove){
            if(this.time_since_last_move === 0) this.time_since_last_move = new Date().getTime();
            if(new Date().getTime() - this.time_since_last_move <= 5000){
                this.playAnimation(ImageHub.character.idle);
            } else {
                this.playAnimation(ImageHub.character.idle_long);
            }
        }
    }

    jumpAnimation(){
        if(this.isInAir() || this.speedY > 0 && !this.checkIsDead()){
            this.playAnimation(ImageHub.character.jump);
            this.time_since_last_move = 0;
        }
    }

    checkThrowKeyUp(){
        if(this.throwObject && !this.world.keyboard.THROW){
            this.throwObject = false;
        }
    }

    hurtAnimation(){
        if(this.isHurt()){
            this.playAnimation(ImageHub.character.hurt);
        }
    }

    checkLifeState(){
        if(this.checkIsDead()){
            this.playAnimation(ImageHub.character.death);
            if(!this.isInAir() && this.speedY <= 0){
                this.standingGroundY = 1000;
                this.jump();
            }
        }
    }

    throwAnObject(){
        this.bottleCount--;
        this.throwObject = true;
        this.world.bottleBar.setPercentage(this.bottleCount *20);
    }

    checkEnemyCollision(enemies){        
        enemies.forEach(enemy => {
            if(this.isColliding(enemy) && !enemy.isDead){
                if(!(this.isInAir() && this.speedY < 0)){
                    this.applyDamage(enemy.damagePerAttack);
                    this.world.healthBar.setPercentage(this.health);
                } else if(!this.checkIsDead()) {
                    enemy.applyDamage();
                }           
        }});
    }

    checkBottleCollision(bottles){
        bottles.forEach(bottle => {
            if(this.isColliding(bottle) && this.bottleCount < 5){
                this.bottleCount++;
                this.world.bottleBar.setPercentage(this.bottleCount);
            }
        })
    }

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

    addCoin(coin){        
        this.coinCount++;
        this.world.coinBar.setPercentage((this.coinCount + 1) *10);
        coin.removeFromWorld(this.world.level.coins, this.world.level.collectableObjects);
    }

    checkBottleCollision(bottles){
        bottles.forEach(bottle => {
            if(this.isColliding(bottle)){             
                if(this.bottleCount < 5) {             
                    this.bottleCount++;     
                    this.world.bottleBar.setPercentage((this.bottleCount) *20);
                    bottle.removeFromWorld(this.world.level.bottles, this.world.level.collectableObjects); 
                }
            }
        })
    }
}
