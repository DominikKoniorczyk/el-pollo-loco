import { Character } from "./character.class.js";
import { StatusBar } from "./status-bar.class.js";
import { ImageHub } from "./imagehub.class.js";
import { Cloud } from "./cloud.class.js";
import { BackgroundObject } from "./background-object.class.js";
import { Chicken } from "./chicken.class.js";
import { Endboss } from "./endboss.class.js";
import { ThrowableObject } from "./throwable-object.class.js";
import { TimerText } from "./timer-text.class.js";
import { ScoreText } from "./score-text.class.js";

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
    timerText;
    scoreText;
    throwableObjects = [];
    characterCanMove = true;

    constructor(_canvas, _keyboard, _level){
        this.ctx = _canvas.getContext('2d');
        this.canvas = _canvas;
        this.keyboard = _keyboard;
        this.level = _level;
        this.level.canvas = this.canvas;
        this.timerText = new TimerText(this, this.ctx);
        this.scoreText = new ScoreText(this, this.ctx);
        this.draw();
        this.initWorld();
        this.setWorld();
        this.checkCollisions();
    }

    /**
     * Sets the world reference for the main character and updates enemies with the world.
     */
    setWorld(){
        this.character.world = this;
        this.addWorldToEnemies();
    }

    /**
     * Initializes the level and populates it with dynamic clouds and background objects for each world tile.
     */
    initWorld(){
        this.level.initLevel();
        for(let i = 0; i < this.level.worldTiles; i++){
            this.addDynamicClouds(i);
            this.addDynamicBackgrounds(i);
        }
    }

    /**
     * Updates the world every 10ms: level logic, throwable objects, and collision checks.
     * @param {number} globalIntervalCounter - The global counter for interval updates.
     */
    interval10ms(globalIntervalCounter){
        this.level.interval10ms(globalIntervalCounter);
        this.throwableObjects.forEach(to => {
            to.interval10ms(globalIntervalCounter);
        });
        this.checkCollisions();
        this.checkThrowObjects();
    }

    /**
     * Updates the world at 60 frames per second: rendering, level updates, timer, and throwable objects.
     */
    interval60FPS(){
        this.draw();
        this.level.interval60FPS();
        this.timerText.interval60FPS();
        this.throwableObjects.forEach(to => {
            to.interval60FPS();
        });
    }

    /**
     * Adds layered background objects for the given world tile index, alternating textures for variety.
     * @param {number} actualIndex - Index of the world tile for which backgrounds are added.
     */
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

    /**
     * Adds clouds to the level dynamically based on the world tile index, alternating textures.
     * @param {number} actualIndex - Index of the world tile for which clouds are added.
     */
    addDynamicClouds(actualIndex){
        if(actualIndex % 2 == 0)
            this.level.clouds.push(new Cloud(ImageHub.backgrounds.clouds[1], actualIndex * this.canvas.width, this.level.worldTiles));
        else this.level.clouds.push(new Cloud(ImageHub.backgrounds.clouds[0], actualIndex * this.canvas.width, this.level.worldTiles));
    }
 
    /**
     * Clears the canvas and renders all game elements, including background, clouds, characters, enemies, collectibles, and UI.
     */
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
        this.addToViewport(this.timerText);
        this.addToViewport(this.scoreText);
    }

    /**
     * Adds multiple movable objects to the viewport by calling `addToViewport` on each.
     * @param {Array} objects - Array of objects to render.
     */
    addObjectsToViewport(objects){
        objects.forEach(object => {
            this.addToViewport(object);
        });
    }

    /**
     * Sets the current world context to all enemies in the level.
     */
    addWorldToEnemies(){
        this.level.enemies.forEach(enemy => {
            enemy.world = this;
        });
    }

    /**
     * Renders a single movable object, flipping it horizontally if needed.
     * @param {Object} mo - Movable object to render.
     */
    addToViewport(mo){
        if((mo.otherDirection && !(mo instanceof Chicken || mo instanceof Endboss)) || ((mo instanceof Chicken || mo instanceof Endboss) && !mo.otherDirection)){
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if((mo.otherDirection && !(mo instanceof Chicken || mo instanceof Endboss)) || ((mo instanceof Chicken || mo instanceof Endboss) && !mo.otherDirection)){
            this.flipImageBack(mo);
        }
    }

    /**
     * Flips an object horizontally on the canvas for rendering.
     * @param {Object} mo - Movable object to flip.
     */
    flipImage(mo){
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Restores the canvas state after flipping an object and resets its x-coordinate.
     * @param {Object} mo - Movable object to restore.
     */
    flipImageBack(mo){
        this.ctx.restore();
        mo.x = mo.x * -1;
    }

    /**
     * Checks for collisions between the character and enemies, coins, or bottles.
     */
    checkCollisions() {
        this.character.checkEnemyCollision(this.level.enemies);
        this.character.checkCoinCollision(this.level.coins);
        this.character.checkBottleCollision(this.level.bottles);
    }

    /**
     * Checks if the character can throw an object and creates a new throwable object if possible.
     * Adds the object to the throwableObjects array and updates the last throw time.
     */
    checkThrowObjects(){        
        if(this.keyboard.THROW && this.characterCanMove && this.character.checkCanThrow()){
            const newBottle = new ThrowableObject(this, this.character.x + 100, this.character.y + 100, this.character);
            this.throwableObjects.push(newBottle);
            this.lastThrowObjectTime = new Date().getTime();
            this.character.throwAnObject();
        }
    }
}