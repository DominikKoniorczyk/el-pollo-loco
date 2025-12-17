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
    shouldDrawCollisionFrame = false;
    minPositionX = 400;
    
    loadImage(path){
        this.img = new Image();
        this.img.src = path;
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
    
    drawCollisionFrames(ctx){
        if(this.shouldDrawCollisionFrame){
            ctx.beginPath();
            ctx.linewidth = "10";
            ctx.strokeStyle = "blue";
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.right, this.height - this.offset.bottom);
            ctx.stroke();
        }
    }
    
    getRandomX(world_tiles){
        const maxX = (world_tiles - 1) * 720;
        const difference = maxX - this.minPositionX;
        let randomX = Math.floor(Math.random() * difference);
        randomX += this.minPositionX;
        return randomX; 
    }

    isColliding(mo){               
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
               this.y + this.height - this.offset.bottom + this.offset.top > mo.y + mo.offset.top &&
               this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
               this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }
}