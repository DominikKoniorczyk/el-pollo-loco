export class DrawableObject {
    x = 120;
    y = 275;
    height = 150;
    width = 100;
    img;
    imageCache = {};
    currentImageIndex = 0;
    currentJumpImageIndex = 0;
    otherDirection = false;
    offset = { top: 0, bottom: 0, left: 0, right: 0 };
    minPositionX = 400;
    deathTime = 0;
    isDead = false;
    timeSinceLastDamage = 0;
    realCollisionFram = {x: 0, y: 0, w: 0, h: 0};
    level;
    jumpOnePlayed = false;
    fallingOnePlayed = false;
    
    /**
     * Loads a single image from the given path and assigns it to the object.
     * @param {string} path - The source path of the image.
     */
    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Runs a function intended to be called every 1/60th of a second.
     * Updates the object's collision frame for accurate detection.
     */
    interval60FPS(){
        this.getRealCollisionFrame();
    }

    /**
     * Calculates the real collision rectangle based on the object's position and offsets.
     */
    getRealCollisionFrame(){
        this.realCollisionFram = { 
            x: this.x + this.offset.left, 
            y: this.y + this.offset.top, 
            w: this.width - this.offset.left - this.offset.right, 
            h: this.height - this.offset.top - this.offset.bottom };
    }

    /**
     * Draws the current image onto the provided canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Loads multiple images from an array of paths and caches them in memory.
     * @param {string[]} arr - Array of image source paths.
     */
    loadImages(arr){
        arr.forEach(path => {
            let img = new Image();  
            img.src = path;
            this.imageCache[path] = img;
        });
    }
    
    /**
     * Returns a random X-coordinate within the allowed range of the world tiles.
     * @param {number} world_tiles - The total number of horizontal tiles in the world.
     * @returns {number} - A random X position within bounds.
     */
    getRandomX(world_tiles){
        const maxX = (world_tiles - 1) * 720;
        const difference = maxX - this.minPositionX;
        let randomX = Math.floor(Math.random() * difference);
        randomX += this.minPositionX;
        return randomX; 
    }

    /**
     * Checks whether this object is colliding with another object.
     * @param {Object} mo - Another object with a realCollisionFram property.
     * @returns {boolean} - True if the objects overlap, false otherwise.
     */
    isColliding(mo){               
        return this.realCollisionFram.x + this.realCollisionFram.w > mo.realCollisionFram.x &&
        this.realCollisionFram.y + this.realCollisionFram.h > mo.realCollisionFram.y &&
        this.realCollisionFram.x < mo.realCollisionFram.x + mo.realCollisionFram.w &&
        this.realCollisionFram.y < mo.realCollisionFram.y + mo.realCollisionFram.h;
    }

    /**
     * Removes this object from the given array if it exists.
     * @param {Array} arr - The array from which to remove this object.
     */
    removeFromWorld(arr){
        const index = arr.indexOf(this);
        if(index !== -1) arr.splice(index, 1);
    }

    /**
     * Updates the object's current image to the next in the animation sequence.
     * @param {string[]} images - Array of image paths used for the animation.
     */
    playAnimation(images){
        const i = this.currentImageIndex % images.length;
        const path = images[i];
        this.img = this.imageCache[path];
        this.currentImageIndex++;
    }
}