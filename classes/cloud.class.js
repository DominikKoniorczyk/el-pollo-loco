class Cloud extends MovableObject {
    y = 0;
    width = 720;
    height = 480;
    
    constructor(imagePath, xPos){
        super();
        super.loadImage(imagePath);
        this.x = xPos;
        this.animate();
    }

    animate(){
        this.moveLeft();
    }
}