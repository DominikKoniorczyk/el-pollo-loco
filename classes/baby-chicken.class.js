import { Chicken } from "./chicken.class.js";
import { ImageHub } from "./imagehub.class.js";

export class BabyChicken extends Chicken{
    width = 40;
    height = 40;
    y = 385;
    standingGroundY = 385;
    offset = { top: -10, bottom: 8, left: 5, right: 5 };

    constructor(world_tiles, level, img){
        super(world_tiles, level, img);    
        this.damagePerAttack = 5 * level.difficultyLevel;  
    }

    interval10ms(globalIntervalCounter){
        super.interval10ms(globalIntervalCounter);
    }
    
    interval60FPS(){
        super.interval60FPS();
    }    

    animate(){
        if(!this.isDead) this.playAnimation(ImageHub.chickenSmall.walk);   
        else if(this.isDead && this.deathTime == 0){
            this.playAnimation(ImageHub.chickenSmall.death)
            this.deathTime = new Date().getTime();
        } else if(new Date().getTime() - this.deathTime < 2000){
            this.playAnimation(ImageHub.chickenSmall.death)
        } else {
            this.removeFromWorld(this.world.level.enemies, this.world.level.enemies);
        }
    }

    applyDamage(){
        this.isDead = true;
        this.speed = 0;
    }
}