class Level {
    enemies = [];
    clouds = [];
    backgroundObjects = [];
    world_tiles;
    level_end_x;

    constructor(enemies, world_tiles){
        this.enemies = enemies;
        this.world_tiles = world_tiles;
        this.level_end_x = 720 * world_tiles;
    }
}