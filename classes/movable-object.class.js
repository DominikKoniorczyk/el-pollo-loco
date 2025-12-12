class MovableObject {
    x = 120;
    y = 275;
    img;
    height = 150;
    width = 100;
    imageCache = {};
    currentImageIndex = 0;
    speed = 0.15;
    animation_interval = 1000 / 5;
    otherDirection = false;

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
        if(this.x + this.width < -20){
            this.x = (720 * 3);                      
        }        
    }
}