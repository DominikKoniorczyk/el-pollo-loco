class World {
    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken()
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
        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height);
        this.enemies.forEach(e => {
            this.ctx.drawImage(e.img, e.x, e.y, e.width, e.height);
        });

        requestAnimationFrame(() => this.draw());
    }


}