export class DrawableObject {
    x = 120;
    y = 275;
    height = 150;
    width = 100;
    img;
    imageCache = {};
    currentImageIndex = 0;
    otherDirection = false;
    offset = { top: 0, bottom: 0, left: 0, right: 0 };
    minPositionX = 400;
    deathTime = 0;
    isDead = false;
    timeSinceLastDamage = 0;
    realCollisionFram = {x: 0, y: 0, w: 0, h: 0};
    level;
    
    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    interval60FPS(){
        this.getRealCollisionFrame();
    }

    getRealCollisionFrame(){
        this.realCollisionFram = { 
            x: this.x + this.offset.left, 
            y: this.y + this.offset.top, 
            w: this.width - this.offset.left - this.offset.right, 
            h: this.height - this.offset.top - this.offset.bottom };
    }

    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    loadImages(arr){
        arr.forEach(path => {
            let img = new Image();  
            img.src = path;
            this.imageCache[path] = img;
        });
    }
    
    getRandomX(world_tiles){
        const maxX = (world_tiles - 1) * 720;
        const difference = maxX - this.minPositionX;
        let randomX = Math.floor(Math.random() * difference);
        randomX += this.minPositionX;
        return randomX; 
    }

    isColliding(mo){               
        return this.realCollisionFram.x + this.realCollisionFram.w > mo.realCollisionFram.x &&
        this.realCollisionFram.y + this.realCollisionFram.h > mo.realCollisionFram.y &&
        this.realCollisionFram.x < mo.realCollisionFram.x + mo.realCollisionFram.w &&
        this.realCollisionFram.y < mo.realCollisionFram.y + mo.realCollisionFram.h;
    }

    removeFromWorld(arr){
        const index = arr.indexOf(this);
        if(index !== -1) arr.splice(index, 1);
    }

    playAnimation(images){
        const i = this.currentImageIndex % images.length;
        const path = images[i];
        this.img = this.imageCache[path];
        this.currentImageIndex++;
    }
}