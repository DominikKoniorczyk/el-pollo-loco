import { DrawableObject } from "./drawable-object.class.js";
import { SoundHub } from "./soundhub.class.js";

/**
 * Creats a new collectable object.
 * @extends DrawableObject
 * @class
 */
export class CollectableObject extends DrawableObject{
    width = 100;
    height = 100;
    x = 200;
    imageSource;
    shouldDrawCollisionFrame = true;
    collectingSound = "";
    
    constructor(){
        super();
        this.y = 60;        
    }

    /**
     * Removes the current object from the given arrays and plays a collection sound.
     * @param {Array} arr - The first array to remove the object from.
     * @param {Array} mainArr - The main array to remove the object from.
     */
    removeFromWorld(arr, mainArr){
        const index = arr.indexOf(this);
        const mainIndex = mainArr.indexOf(this);
        if(index !== -1) arr.splice(index, 1);
        if(mainIndex !== -1) mainArr.splice(mainIndex, 1);
        this.playSoundOnCollecting();
    }

    /**
     * Plays the sound associated with collecting this object.
     */
    playSoundOnCollecting(){
        SoundHub.playOne(this.collectingSound);
    }
}