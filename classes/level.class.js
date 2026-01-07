import { Chicken } from "./chicken.class.js";
import { Endboss } from "./endboss.class.js";
import { Coin } from "./coin.class.js";
import { Bottle } from "./bottle.class.js";
import { ImageHub } from "./imagehub.class.js";
import { BabyChicken } from "./baby-chicken.class.js";
import { gameOver } from "../js/game.js";
import { SoundHub } from "./soundhub.class.js";

export class Level {
    enemies = [];
    clouds = [];
    backgroundObjects = [];
    collectableObjects = [];
    coins = [];
    bottles = [];
    worldTiles;
    levelEndX;
    canvas;
    enemiesCount;
    bottleCount;
    coinCount;
    endbossSize;
    babyPerBig = 2;
    difficultyLevel = 1;
    minionSpawnTimeout = 0;
    defaultTime = 0;
    gameTime = 0;
    startGameTime = 0;
    music = new Audio("./assets/audio/music/819267__johnmode__160bpm-retro-game-square-wave-song-mysterious-exploration.mp3");

    constructor(amounts, world_tiles, endbossSize, time){
        this.endbossSize = endbossSize;
        this.enemiesCount = amounts.enemieCount;
        this.bottleCount = amounts.bottleCount;
        this.coinCount = amounts.coinCount;
        this.worldTiles = world_tiles;
        this.defaultTime = time;        
    }

   /**
     * Updates the difficulty level and adjusts the game timer accordingly.
     * @param {number} difficulty - The new difficulty level (integer).
     */ 
    updateDifficulty(difficulty){
        this.difficultyLevel = difficulty;
        this.gameTime = Math.round(this.defaultTime - (this.defaultTime / 6 * difficulty));
        this.startGameTime = this.gameTime;     
    }

    /**
     * Updates all enemies, clouds, and coins every 10ms, and decreases game time periodically.
     * @param {number} globalIntervalCounter - The global interval tick counter.
     */
    interval10ms(globalIntervalCounter){
        this.enemies.forEach(enemy => {
            enemy.interval10ms(globalIntervalCounter);
        });
        this.clouds.forEach(cloud => {
            cloud.interval10ms(globalIntervalCounter);
        });
        this.coins.forEach(coin => {
            coin.interval10ms(globalIntervalCounter);
        });
        if(globalIntervalCounter % 1000 === 0){
            this.decreaseTime();
        }
    }

    /**
     * Updates all enemies, clouds, and collectable objects at 60 frames per second.
     */
    interval60FPS(){
        this.enemies.forEach(enemy => {
            enemy.interval60FPS();
        });        
        this.clouds.forEach(cloud => {
            cloud.interval60FPS();
        });
        this.collectableObjects.forEach(collectable => {
            collectable.interval60FPS();
        })
    }

    /**
     * Initializes the level by spawning enemies, collectables, the end boss, and playing background music.
     */
    initLevel(){
        this.spawnEnemies();
        this.spawnCollectableObjects();
        this.enemies.push(new Endboss(this.worldTiles, this.endbossSize, this));        
        this.levelEndX = this.canvas.width * this.worldTiles;
        this.playMusic();
    }

    /**
     * Starts looping the level’s background music.
     */
    playMusic(){
        this.music.loop = true;
        SoundHub.playOne(this.music);
    }

    /**
     * Spawns all standard enemies and their respective baby versions in the level.
     */
    spawnEnemies(){
        for(let i = 0; i < this.enemiesCount; i++){
            this.enemies.push(new Chicken(this.worldTiles, this, ImageHub.chicken));
            for(let j = 0; j < this.babyPerBig; j++ ){
                this.enemies.push(new BabyChicken(this.worldTiles, this, ImageHub.chickenSmall, {absolute: false, x: 0, speed: 1}));
            } 
        }
    }

    /**
     * Spawns collectable objects in the world, including coins and bottles, 
     * and adds them to the relevant tracking arrays.
     */
    spawnCollectableObjects(){        
        for(let i = 0; i < this.coinCount; i++){
            const newCoin = new Coin(this.worldTiles);
            this.collectableObjects.push(newCoin);
            this.coins.push(newCoin);         
        }
        for(let i = 0; i < this.bottleCount; i++){
            const newBottle = new Bottle(this.worldTiles);
            this.collectableObjects.push(newBottle);
            this.bottles.push(newBottle);
        }
    }

    /**
     * Spawns minion enemies at a given X position if the spawn cooldown has passed,
     * scaling the amount based on difficulty level.
     * @param {number} worldX - The X coordinate where minions should spawn.
     */
    bossSpawnMinions(worldX){
        let currentTime = new Date().getTime();
        if(currentTime - this.minionSpawnTimeout >= 5000){
            for(let i = 0; i < this.babyPerBig * this.difficultyLevel; i++){
                this.enemies.push(new BabyChicken(this.worldTiles, this, ImageHub.chickenSmall, {absolute: true, x: worldX, speed: 5}));
            }        
            this.minionSpawnTimeout = currentTime;
        }
    }

    /**
     * Clears all dynamic elements from the world, including enemies, collectibles,
     * clouds, and background objects.
     */
    clearWorld(){
        this.enemies = [];
        this.collectableObjects = [];
        this.clouds = [];
        this.backgroundObjects = [];
        this.coins = [];
        this.bottles = [];
    }

    /**
     * Decreases the game timer by one unit and triggers game over if time runs out.
     */
    decreaseTime(){
        this.gameTime--;
        if(this.gameTime < 0){
            gameOver(false);
        }
    }
}