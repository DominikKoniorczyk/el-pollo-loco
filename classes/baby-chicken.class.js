import { Chicken } from "./chicken.class.js";
import { ImageHub } from "./imagehub.class.js";
import { SoundHub } from "./soundhub.class.js";

export class BabyChicken extends Chicken{
    width = 40;
    height = 40;
    y = 385;
    standingGroundY = 385
    killScorePoints = 125;
    offset = { top: -10, bottom: 8, left: 5, right: 5 };

    constructor(world_tiles, level, img, pos){   
        super(world_tiles, level, img); 
        this.damagePerAttack = 5 * (level.difficultyLevel == 1 ? 1 : level.difficultyLevel == 2 ? 4 : 6);
        this.level = level;
        if(pos.absolute){
            this.x = pos.x;
            this.speed = pos.speed + Math.random();
        }  
        this.addAudio();
    }

    /**
     * Called every 10ms to update the object state.
     * @param {number} globalIntervalCounter - The global counter incremented every 10ms.
     */
    interval10ms(globalIntervalCounter){
        super.interval10ms(globalIntervalCounter);
    }
    
    /**
     * Called every frame (60 FPS) to update animations or logic.
     */
    interval60FPS(){
        super.interval60FPS();
    }    

    /**
     * Handles the animation state of the object based on life and death.
     * Plays walking animation if alive, death animation if dead, and removes from world after 2 seconds.
     */
    animate(){
        if(!this.isDead) this.playAnimation(ImageHub.chickenSmall.walk);   
        else if(this.isDead && this.deathTime == 0){
            this.playAnimation(ImageHub.chickenSmall.death)
            this.deathTime = new Date().getTime();
        } else if(new Date().getTime() - this.deathTime < 2000){
            this.playAnimation(ImageHub.chickenSmall.death)
        } else {
            this.removeFromWorld(this.level.enemies, this.level.enemies);
        }
    }

    /**
     * Applies damage to the object, marking it as dead and awarding points to the character.
     * @param {number} dmg - The amount of damage dealt.
     * @param {Object} character - The character dealing the damage.
     */
    applyDamage(dmg, character){
        this.isDead = true;
        this.speed = 0;
        SoundHub.playOne(this.hurtSound);
        character.score += this.killScorePoints;
    }
}