class World {
    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken()
    ];
    clouds = [new Cloud()] ;
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
        this.enemies.forEach(enemy => {
            this.ctx.drawImage(enemy.img, enemy.x, enemy.y, enemy.width, enemy.height);
        });
        
        this.clouds.forEach(cloud => {
            this.ctx.drawImage(cloud.img, cloud.x, cloud.y, cloud.width, cloud.height);
        });

        requestAnimationFrame(() => this.draw());
    }


}