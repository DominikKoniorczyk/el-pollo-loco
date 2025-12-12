class Cloud extends MovableObject {
    y = 0;
    width = 720;
    height = 480;
    
    constructor(){
        super();
        super.loadImage(ImageHub.backgrounds.clouds[0]);
        this.x = Math.random() * 720;
        this.animate();
    }

    animate(){
        setInterval(() => {
            this.x -= 0.15;     
        }, 1000 / 60);
    }
}