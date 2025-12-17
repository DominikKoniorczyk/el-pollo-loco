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
}