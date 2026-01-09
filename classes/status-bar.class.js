import { DrawableObject } from "./drawable-object.class.js";

/**
 * Creats a new status bar.
 * @exports DrawableObject
 * @class
 */
export class StatusBar extends DrawableObject{
    percentage = 100;
    width = 150;
    height = 45;
    x = 20;
    y = 0;
    imageSource;
    
    constructor(x, y, src, full){
        super();
        this.x = x;
        this.y = y;
        this.imageSource = src;
        let i = full ? 5 : 0;     
        this.loadImages(src);
        this.setPercentage(full ? 100 : 0);       
    }

    /**
     * Sets the current percentage and updates the image based on the resolved index.
     * @param {number} percentage - The new percentage value.
     */
    setPercentage(percentage){
        this.percentage = percentage;
        let path = this.imageSource[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Updates the element's position in the viewport.
     * @param {number} x - The new x-coordinate.
     * @param {number} y - The new y-coordinate.
     */
    setNewPositionInViewport(x, y){
        this.x = x;
        this.y = y;
    }

    /**
     * Determines the image index based on the current percentage.
     * @returns {number} The index corresponding to the current percentage range.
     */
    resolveImageIndex(){
        if(this.percentage === 100){
            return 5;
        } else if(this.percentage >= 80){
            return 4;
        } else if(this.percentage >= 60){
            return 3;
        } else if(this.percentage >= 40){
            return 2;
        } else if(this.percentage >= 20){
            return 1;
        } else {
            return 0;
        }
    }
}