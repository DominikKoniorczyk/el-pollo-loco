import { CollectableObject } from "./collectable-object.class.js";
import { ImageHub } from "./imagehub.class.js";

export class Bottle extends CollectableObject {
  offset = { top: 10, bottom: 5, left: 20, right: 5 };
  y = 365;
  width = 50;
  height = 60;
  collectingSound = new Audio('./assets/audio/collectibles/bottleCollectSound.wav');

  constructor(world_tiles) {
    super();
    let randomInt = this.getRandomNumber();
    this.loadImage(ImageHub.bottle.onGround[randomInt]);
    this.setOffset(randomInt);
    this.setWorldPosition(world_tiles);
  }

  /**
   * Sets the object's x position randomly based on the provided world tiles.
   * @param {Array} world_tiles - Array of tiles representing the world.
   */
    setWorldPosition(world_tiles) {
      this.x = this.getRandomX(world_tiles);
    }

  /**
   * Generates and returns a random integer, either 0 or 1.
   * @returns {number} A randomly rounded number (0 or 1).
   */
    getRandomNumber(){
      let ran = Math.random();
      return Math.round(ran);
    }

  /**
   * Sets predefined offset values if the input is not zero.
   * @param {number} i - Determines whether the offset should be applied.
   */
    setOffset(i){
      if(i !== 0){
        this.offset = { top: 10, bottom: 5, left: 15, right: 15 };
      }
    }
}
