class Level {
    enemies = [];
    clouds = [];
    backgroundObjects = [];
    world_tiles;
    level_end_x;
    canvas;
    enemiesCount;
    endbossSize;

    constructor(enemiesCount, world_tiles, endbossSize){
        this.endbossSize = endbossSize;
        this.enemiesCount = enemiesCount;
        this.world_tiles = world_tiles;
    }

    initLevel(){
        for(let i = 0; i < this.enemiesCount; i++){
            this.enemies.push(new Chicken());
        }
        this.enemies.push(new Endboss(this.world_tiles, this.endbossSize));        
        this.level_end_x = this.canvas.width * this.world_tiles;
    }
}