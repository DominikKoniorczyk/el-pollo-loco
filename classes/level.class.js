class Level {
    enemies = [];
    clouds = [];
    backgroundObjects = [];
    world_tiles;
    level_end_x;

    constructor(enemiesCount, world_tiles, endbossSize){
        for(let i = 0; i < enemiesCount; i++){
            this.enemies.push(new Chicken());
        }
        this.enemies.push(new Endboss(world_tiles, endbossSize));
        this.world_tiles = world_tiles;
        this.level_end_x = 720 * world_tiles;
    }
}