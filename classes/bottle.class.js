import { CollectableObject } from "./collectable-object.class.js";
import { ImageHub } from "./imagehub.class.js";

export class Bottle extends CollectableObject {
  offset = { top: 10, bottom: 20, left: 40, right: 70 };
  y = 365;
  width = 50;
  height = 60;

  constructor(world_tiles) {
    super();
    this.loadImage(ImageHub.bottle.onGround[0]);
    this.setWorldPosition(world_tiles);
  }

  setWorldPosition(world_tiles) {
    this.x = this.getRandomX(world_tiles);
  }
}
