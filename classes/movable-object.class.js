class MovableObject {
    x = 120;
    y = 275;
    img;
    height = 150;
    width = 100;
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

    constructor(){
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

    }

    moveLeft(){
        setInterval(() => {
            this.x -= this.speed;    
            if(this instanceof Cloud) this.checkIfOffScreen();
        }, 1000 / 60);
    }

    checkIfOffScreen(){
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
        setInterval(() => {
            if(this.isInAir() || this.speedY > 0){
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000/60);
    }

    isInAir(){
        return this.y < this.standing_ground_y;
    }
}