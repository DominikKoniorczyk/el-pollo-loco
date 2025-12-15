class MovableObject {
    x = 120;
    y = 275;
    img;
    height = 150;
    width = 100;
    offset = { top: 0, bottom: 0, left: 0, right: 0 };
    imageCache = {};
    currentImageIndex = 0;
    speed = 0.15;
    world;
    world_tiles;
    otherDirection = false;
    speedY = 0;
    acceleration = 1;
    standing_ground_y;
    jump_height = 20;
    health = 100;
    damagePerAttack = 20;
    msCounter = 0;
    lastHit = 0;

    constructor(){
    }

    interval60FPS(){
        this.checkIfOffScreen();
        this.applyGravity();
    }

    interval10ms(globalIntervalCounter){
        this.msCounter == globalIntervalCounter;
    }

    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr){
        arr.forEach(path => {
            let img = new Image();  
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    moveRight(){
        this.x += this.speed;
        this.otherDirection = false;
    }

    moveLeft(){
        this.x -= this.speed;  
        this.otherDirection = true; 
    }

    checkIfOffScreen = () =>{
        if(this.x + this.width < 0){
            this.x = (720 * (this.world_tiles - 1));                      
        }    
    }

    playAnimation(images){
        const i = this.currentImageIndex % images.length;
        const path = images[i];
        this.img = this.imageCache[path];
        this.currentImageIndex++;
    }

    applyGravity(){
        if(this.isInAir() || this.speedY > 0){
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
        }
    }

    isInAir(){
        return this.y < this.standing_ground_y;
    }

    jump(){
        this.speedY = this.jump_height;
    }

    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
    
    drawCollisionFrames(ctx){
        if(this instanceof Character || this instanceof Chicken || this instanceof Endboss){
            ctx.beginPath();
            ctx.linewidth = "10";
            ctx.strokeStyle = "blue";
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.right, this.height - this.offset.bottom);
            ctx.stroke();
    }}

    isColliding(mo){               
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
               this.y + this.height - this.offset.bottom + this.offset.top > mo.y + mo.offset.top &&
               this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
               this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    applyDamage(damage){
        this.health -= damage;
        if(this.health < 0) {
            this.health = 0;
        } else {
            this.lastHit = new Date().getTime();
        }       
    }

    checkIsDead(){
        return this.health == 0;
    }

    isHurt(){
        let timePassed = new Date().getTime() - this.lastHit;
        return timePassed < 200; 
    }
}