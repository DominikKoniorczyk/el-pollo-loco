class ThrowableObject extends MovableObject {
    width = 50;
    height = 60;
    speedY = 20;
    standing_ground_y = 360;
    world;

    constructor(world, x, y){
        super();
        this.loadImage(ImageHub.bottle.rotation[0]);
        this.world = world; 
        this.x = x;
        this.y = y;       
    }

    interval10ms(globalIntervalCounter){
        super.interval10ms(globalIntervalCounter);
        if(globalIntervalCounter % 50 === 0){
            this.fly();
        }
    }
    
    interval60FPS(){
        super.interval60FPS();        
    }

    fly(){
        if(this.y < this.standing_ground_y){
            this.x += 30;
        } else {
            this.splash();
        }
    }

    splash(){

    }
}