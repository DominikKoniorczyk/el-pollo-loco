import { DrawableObject } from "./drawable-object.class.js";

export class CollectableObject extends DrawableObject{
    width = 100;
    height = 100;
    x = 200;
    imageSource;
    shouldDrawCollisionFrame = true;
    
    constructor(){
        super();
        this.y = 60;        
    }

    removeFromWorld(arr, mainArr){
        const index = arr.indexOf(this);
        const mainIndex = mainArr.indexOf(this);
        if(index !== -1) arr.splice(index, 1);
        if(mainIndex !== -1) mainArr.splice(mainIndex, 1);
    }
}