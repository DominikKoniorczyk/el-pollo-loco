import { Character } from "./character.class.js";
import { StatusBar } from "./status-bar.class.js";
import { ImageHub } from "./imagehub.class.js";
import { Cloud } from "./cloud.class.js";
import { BackgroundObject } from "./background-object.class.js";
import { Chicken } from "./chicken.class.js";
import { Endboss } from "./endboss.class.js";
import { ThrowableObject } from "./throwable-object.class.js";
import { IntervalHub } from "./interavalhub.class.js";

export class World {
    character = new Character();
    level;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    healthBar = new StatusBar(20, 0, ImageHub.statBars.health, true);
    coinBar = new StatusBar(20, 70, ImageHub.statBars.coin, false);
    bottleBar = new StatusBar(20, 35, ImageHub.statBars.bottle, true);
    charStatBars = [this.healthBar, this.coinBar, this.bottleBar];
    healthBarEndboss = new StatusBar(20, 0, ImageHub.statBars.endboss, true);
    throwableObjects = [];
    characterCanMove = true;

    constructor(_canvas, _keyboard, _level){
        this.ctx = _canvas.getContext('2d');
        this.canvas = _canvas;
        this.keyboard = _keyboard;
        this.level = _level;
        this.level.canvas = this.canvas;
        this.draw();
        this.initWorld();
        this.setWorld();
        this.checkCollisions();
    }

    setWorld(){
        this.character.world = this;
        this.addWorldToEnemies();
    }

    initWorld(){
        this.level.initLevel();
        for(let i = 0; i < this.level.worldTiles; i++){
            this.addDynamicClouds(i);
            this.addDynamicBackgrounds(i);
        }
    }

    interval10ms(globalIntervalCounter){
        this.level.enemies.forEach(enemy => {
            enemy.interval10ms(globalIntervalCounter);
        });
        this.level.clouds.forEach(cloud => {
            cloud.interval10ms(globalIntervalCounter);
        });
        this.throwableObjects.forEach(to => {
            to.interval10ms(globalIntervalCounter);
        });
        this.checkCollisions(globalIntervalCounter);
        this.checkThrowObjects();
    }

    interval60FPS(){
        this.draw();
        this.level.enemies.forEach(enemy => {
            enemy.interval60FPS();
        });        
        this.level.clouds.forEach(cloud => {
            cloud.interval60FPS();
        });
        this.throwableObjects.forEach(to => {
            to.interval60FPS();
        });
    }

    addDynamicBackgrounds(actualIndex){        
        if(actualIndex % 2 == 0){
            this.level.backgroundObjects.push(new BackgroundObject(ImageHub.backgrounds.air, actualIndex * this.canvas.width));
            this.level.backgroundObjects.push(new BackgroundObject(ImageHub.backgrounds.layer_three[0], actualIndex * this.canvas.width));
            this.level.backgroundObjects.push(new BackgroundObject(ImageHub.backgrounds.layer_two[0], actualIndex * this.canvas.width));
            this.level.backgroundObjects.push(new BackgroundObject(ImageHub.backgrounds.layer_one[0], actualIndex * this.canvas.width));
        } else {
            this.level.backgroundObjects.push(new BackgroundObject(ImageHub.backgrounds.air, actualIndex * this.canvas.width));
            this.level.backgroundObjects.push(new BackgroundObject(ImageHub.backgrounds.layer_three[1], actualIndex * this.canvas.width));
            this.level.backgroundObjects.push(new BackgroundObject(ImageHub.backgrounds.layer_two[1], actualIndex * this.canvas.width));
            this.level.backgroundObjects.push(new BackgroundObject(ImageHub.backgrounds.layer_one[1], actualIndex * this.canvas.width));
        } 
    }

    addDynamicClouds(actualIndex){
        if(actualIndex % 2 == 0)
            this.level.clouds.push(new Cloud(ImageHub.backgrounds.clouds[1], actualIndex * this.canvas.width, this.level.worldTiles));
        else this.level.clouds.push(new Cloud(ImageHub.backgrounds.clouds[0], actualIndex * this.canvas.width, this.level.worldTiles));
    }
 
    draw(){ 
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToViewport(this.level.backgroundObjects);
        this.addObjectsToViewport(this.level.clouds);
        this.addToViewport(this.character);
        this.addObjectsToViewport(this.level.enemies); 
        this.addObjectsToViewport(this.level.collectableObjects);
        this.addObjectsToViewport(this.throwableObjects);   
        this.addToViewport(this.healthBarEndboss);   
        this.ctx.translate(-this.camera_x, 0);
        this.addObjectsToViewport(this.charStatBars);
    }

    addObjectsToViewport(objects){
        objects.forEach(object => {
            this.addToViewport(object);
        });
    }

    addWorldToEnemies(){
        this.level.enemies.forEach(enemy => {
            enemy.world = this;
        });
    }

    addToViewport(mo){
        if((mo.otherDirection && !(mo instanceof Chicken || mo instanceof Endboss)) || ((mo instanceof Chicken || mo instanceof Endboss) && !mo.otherDirection)){
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawCollisionFrames(this.ctx);
        if((mo.otherDirection && !(mo instanceof Chicken || mo instanceof Endboss)) || ((mo instanceof Chicken || mo instanceof Endboss) && !mo.otherDirection)){
            this.flipImageBack(mo);
        }
    }

    flipImage(mo){
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo){
        this.ctx.restore();
        mo.x = mo.x * -1;
    }

    checkCollisions(globalIntervalCounter) {
        this.character.checkEnemyCollision(this.level.enemies);
        this.character.checkCoinCollision(this.level.coins);
        this.character.checkBottleCollision(this.level.bottles);
    }

    checkThrowObjects(){
        if(this.keyboard.THROW && this.characterCanMove && !this.character.throwObject && this.character.bottleCount != 0 && !this.character.checkIsDead()){
            const newBottle = new ThrowableObject(this, this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(newBottle);
            this.lastThrowObjectTime = new Date().getTime();
            this.character.throwAnObject();
        }
    }
}