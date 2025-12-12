class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;
    x = 0;
    y = 0;

    constructor(imagePath){
        super();
        super.loadImage(imagePath);
    }
}