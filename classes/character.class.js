class Character extends MovableObject {
    width = 122;
    height = 240;
    y = 190;

    constructor(){
        super();
        super.loadImage(ImageHub.character.idle[0]);
    }

    jump(){

    }
}