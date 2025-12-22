import { CollectableObject } from "./collectable-object.class.js";
import { ImageHub } from "./imagehub.class.js";

export class Bottle extends CollectableObject {
  offset = { top: 10, bottom: 5, left: 20, right: 5 };
  y = 365;
  width = 50;
  height = 60;
  collectingSound = new Audio('../audio/collectibles/bottleCollectSound.wav');

  constructor(world_tiles) {
    super();
    let randomInt = this.getRandomNumber();
    this.loadImage(ImageHub.bottle.onGround[randomInt]);
    this.setOffset(randomInt);
    this.setWorldPosition(world_tiles);
  }

  setWorldPosition(world_tiles) {
    this.x = this.getRandomX(world_tiles);
  }

  getRandomNumber(){
    let ran = Math.random();
    return Math.round(ran);
  }

  setOffset(i){
    if(i !== 0){
      this.offset = { top: 10, bottom: 5, left: 15, right: 15 };
    }
  }
}
