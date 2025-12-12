class Chicken extends MovableObject {

    constructor(){
        super();
        super.loadImage(ImageHub.chicken.walk[0]);
        this.x = 200 + Math.random() * 500;
    }

}