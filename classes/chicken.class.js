class Chicken extends MovableObject {
    width = 60;
    height = 60;
    y = 365;

    constructor(){
        super();
        super.loadImage(ImageHub.chicken.walk[0]);
        this.x = 200 + Math.random() * 500;
    }

}