class World {
    character = new Character();
    level;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    constructor(_canvas, _keyboard, _level){
        this.ctx = _canvas.getContext('2d');
        this.canvas = _canvas;
        this.keyboard = _keyboard;
        this.level = _level;
        this.level.canvas = this.canvas;
        this.initWorld();
        this.draw();
        this.setWorld();
        this.checkCollisions();
    }

    setWorld(){
        this.character.world = this;
        this.addWorldToEnemies();
    }

    initWorld(){
        this.level.initLevel();
        for(let i = 0; i < this.level.world_tiles; i++){
            this.addDynamicClouds(i);
            this.addDynamicBackgrounds(i);
        }
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
            this.level.clouds.push(new Cloud(ImageHub.backgrounds.clouds[1], actualIndex * this.canvas.width, this.level.world_tiles));
        else this.level.clouds.push(new Cloud(ImageHub.backgrounds.clouds[0], actualIndex * this.canvas.width, this.level.world_tiles));
    }
 
    draw(){ 
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToViewport(this.level.backgroundObjects);
        this.addObjectsToViewport(this.level.clouds);
        this.addToViewport(this.character);
        this.addObjectsToViewport(this.level.enemies);        
        this.ctx.translate(-this.camera_x, 0);
        requestAnimationFrame(() => this.draw());
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
        if(mo.otherDirection && !(mo instanceof Chicken || mo instanceof Endboss) || ((mo instanceof Chicken || mo instanceof Endboss) && !mo.otherDirection)){
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawCollisionFrames(this.ctx);
        if(mo.otherDirection && !(mo instanceof Chicken || mo instanceof Endboss) || ((mo instanceof Chicken || mo instanceof Endboss) && !mo.otherDirection)){
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

    checkCollisions(){
        setInterval(() => {
            this.level.enemies.forEach(enemy => {
                if(this.character.isColliding(enemy)){
                    this.character.applyDamage(enemy.damage_per_attack);
                }});           
        }, 200);
    }
}