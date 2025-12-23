import { Chicken } from "./chicken.class.js";
import { Endboss } from "./endboss.class.js";
import { Coin } from "./coin.class.js";
import { Bottle } from "./bottle.class.js";
import { ImageHub } from "./imagehub.class.js";
import { BabyChicken } from "./baby-chicken.class.js";
import { gameOver } from "../js/game.js";

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
    gameTime = 0;

    constructor(amounts, world_tiles, endbossSize, time){
        this.endbossSize = endbossSize;
        this.enemiesCount = amounts.enemieCount;
        this.bottleCount = amounts.bottleCount;
        this.coinCount = amounts.coinCount;
        this.worldTiles = world_tiles;
        this.gameTime = time;
    }

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

    initLevel(){
        for(let i = 0; i < this.enemiesCount; i++){
            this.enemies.push(new Chicken(this.worldTiles, this, ImageHub.chicken));
            for(let j = 0; j < this.babyPerBig; j++ ){
                this.enemies.push(new BabyChicken(this.worldTiles, this, ImageHub.chickenSmall, {absolute: false, x: 0, speed: 1}));
            } 
        }
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
        this.enemies.push(new Endboss(this.worldTiles, this.endbossSize, this));        
        this.levelEndX = this.canvas.width * this.worldTiles;
    }

    bossSpawnMinions(worldX){
        let currentTime = new Date().getTime();
        if(currentTime - this.minionSpawnTimeout >= 5000){
            for(let i = 0; i < this.babyPerBig * this.difficultyLevel; i++){
                this.enemies.push(new BabyChicken(this.worldTiles, this, ImageHub.chickenSmall, {absolute: true, x: worldX, speed: 5}));
            }        
            this.minionSpawnTimeout = currentTime;
        }
    }

    clearWorld(){
        this.enemies = [];
        this.collectableObjects = [];
        this.clouds = [];
        this.backgroundObjects = [];
        this.coins = [];
        this.bottles = [];
    }

    decreaseTime(){
        this.gameTime--;
        if(this.gameTime < 0){
            gameOver(false);
        }
    }
}