import { ImageHub } from "./imagehub.class.js";
import { IntervalHub } from "./interavalhub.class.js";

export class MainMenu {
    canvas;
    ctx;
    keyboard;
    buttons = [];

    constructor(_canvas, _keyboard, _level){
        this.ctx = _canvas.getContext('2d');
        this.canvas = _canvas;
        this.keyboard = _keyboard;
        this.draw();        
        IntervalHub.startInterval(this.interval60FPS, 1000 / 60);
    }

    interval60FPS = () =>{
        this.draw();
    }
    
    draw(){ 
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.addToViewport({src: ImageHub.startScreen, x: 0, y: 0, width: 720, height: 480})
    }

    addToViewport(object){
        const img = new Image();
        img.src = object.src;
        this.ctx.drawImage(img, object.x, object.y, object.width, object.height);
    }
}