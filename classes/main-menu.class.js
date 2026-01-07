import { ImageHub } from "./imagehub.class.js";
import { IntervalHub } from "./interavalhub.class.js";

export class MainMenu {
    canvas;
    ctx;
    keyboard;
    buttons = [];
    img;

    constructor(_canvas, _keyboard, _level){
        this.ctx = _canvas.getContext('2d');
        this.canvas = _canvas;
        this.keyboard = _keyboard;
        this.draw();        
        IntervalHub.startInterval(this.interval60FPS, 1000 / 60);
    }

    /**
     * Calls the draw method at a 60 FPS interval.
     */
    interval60FPS = () =>{
        this.draw();
    }
    
    /**
     * Clears the canvas and draws the start screen image.
     */
    draw(){ 
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.addToViewport({src: ImageHub.startScreen, x: 0, y: 0, width: 720, height: 480});
    }

    /**
     * Draws an image object onto the canvas at the specified position and size.
     * @param {Object} object - The image data and its canvas placement.
     * @param {string} object.src - Source URL of the image.
     * @param {number} object.x - X-coordinate on the canvas.
     * @param {number} object.y - Y-coordinate on the canvas.
     * @param {number} object.width - Width of the image.
     * @param {number} object.height - Height of the image.
     */
    addToViewport(object){
        const img = new Image();
        img.src = object.src;
        this.ctx.drawImage(img, object.x, object.y, object.width, object.height);
    }
}