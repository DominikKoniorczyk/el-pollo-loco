class World {
    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken()
    ];
    clouds = [new Cloud()] ;
    backgroundObjects = [
        new BackgroundObject(ImageHub.backgrounds.air),
        new BackgroundObject(ImageHub.backgrounds.layer_three[0]),
        new BackgroundObject(ImageHub.backgrounds.layer_two[0]),
        new BackgroundObject(ImageHub.backgrounds.layer_one[0])
    ];

    canvas;
    ctx;

    constructor(_canvas){
        this.ctx = _canvas.getContext('2d');
        this.canvas = _canvas;
        this.draw();
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
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    }
}