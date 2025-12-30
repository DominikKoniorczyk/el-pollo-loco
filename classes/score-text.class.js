import { TimerText } from "./timer-text.class.js";

export class ScoreText extends TimerText {
    character;

    constructor(world, ctx){
        super(world, ctx)
    }

    draw(){
        this.ctx.font = "24px 'HennyPenny', 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif";
        let textWidth = this.ctx.measureText(this.world.level.gameTime).width;
        let time = this.world.level.gameTime;
        this.ctx.fillStyle = time > 10 ? "#ffffff" : "#ff0000ff";
        this.ctx.fillText(this.world.character.score, 500, 40);
    }
}