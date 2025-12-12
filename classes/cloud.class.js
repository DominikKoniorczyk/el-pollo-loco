class Cloud extends MovableObject {
    y = 0;
    width = 720;
    height = 480;
    
    constructor(imagePath, xPos, tiles){
        super();
        super.loadImage(imagePath);
        this.x = xPos;
        this.animate();
        this.world_tiles = tiles;
    }

    animate(){
        this.moveLeft();
    }
}