class Cloud extends MovableObject {
    y = 20;
    width = 500;
    height = 300;
    
    constructor(){
        super();
        super.loadImage(ImageHub.clouds[0]);
        this.x = Math.random() * 720;
    }}