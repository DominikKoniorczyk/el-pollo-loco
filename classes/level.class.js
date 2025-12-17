import { Chicken } from "./chicken.class.js";
import { Endboss } from "./endboss.class.js";
import { Coin } from "./coin.class.js";
import { Bottle } from "./bottle.class.js";

export class Level {
    enemies = [];
    clouds = [];
    backgroundObjects = [];
    collectableObjects = [];
    coins = [];
    bottles = [];
    world_tiles;
    level_end_x;
    canvas;
    enemiesCount;
    bottleCount;
    coinCount;
    endbossSize;

    constructor(amounts, world_tiles, endbossSize){
        this.endbossSize = endbossSize;
        this.enemiesCount = amounts.enemieCount;
        this.bottleCount = amounts.bottleCount;
        this.coinCount = amounts.coinCount;
        this.world_tiles = world_tiles;
    }

    initLevel(){
        for(let i = 0; i < this.enemiesCount; i++){
            this.enemies.push(new Chicken(this.world_tiles)); 
        }
        for(let i = 0; i < this.coinCount; i++){
            const newCoin = new Coin(this.world_tiles);
            this.collectableObjects.push(newCoin);
            this.coins.push(newCoin);         
        }
        for(let i = 0; i < this.bottleCount; i++){
            const newBottle = new Bottle(this.world_tiles);
            this.collectableObjects.push(newBottle);
            this.bottles.push(newBottle);
        }
        this.enemies.push(new Endboss(this.world_tiles, this.endbossSize));        
        this.level_end_x = this.canvas.width * this.world_tiles;
    }
}