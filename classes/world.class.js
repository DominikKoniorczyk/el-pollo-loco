class World {
    world_tiles = 4;
    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken()
    ];
    clouds = [] ;
    backgroundObjects = [
        new BackgroundObject(ImageHub.backgrounds.air),
        new BackgroundObject(ImageHub.backgrounds.layer_three[0]),
        new BackgroundObject(ImageHub.backgrounds.layer_two[0]),
        new BackgroundObject(ImageHub.backgrounds.layer_one[0])
    ];
    canvas;
    ctx;
    keyboard;

    constructor(_canvas, _keyboard){
        this.ctx = _canvas.getContext('2d');
        this.canvas = _canvas;
        this.keyboard = _keyboard;
        this.initWorld();
        this.draw();
        this.setWorld();
    }

    setWorld(){
        this.character.world = this;
    }

    initWorld(){
        for(let i = 0; i < this.world_tiles; i++){
            this.addDynamicClouds(i);
        }
    }

    addDynamicClouds(actualIndex){
        if(actualIndex % 2 == 0)
            this.clouds.push(new Cloud(ImageHub.backgrounds.clouds[1], actualIndex * 720));
        else this.clouds.push(new Cloud(ImageHub.backgrounds.clouds[0], actualIndex * 720));
    }
 
    draw(){ 
        this.ctx.clearRect(0, 0, 720, 480);
        this.addObjectsToViewport(this.backgroundObjects);
        this.addObjectsToViewport(this.clouds);
        this.addToViewport(this.character);
        this.addObjectsToViewport(this.enemies);
        requestAnimationFrame(() => this.draw());
    }

    addObjectsToViewport(objects){
        objects.forEach(object => {
            this.addToViewport(object);
        });
    }

    addToViewport(mo){
        if(mo.otherDirection){
            this.flipImage(mo);
        }
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
        if(mo.otherDirection){
            mo.x = mo.x * -1;
            this.ctx.restore();
        }
    }

    flipImage(mo){
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }
}