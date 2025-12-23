export class TimerText{
    world;
    ctx;

    constructor(world, ctx){
        this.world = world;
        this.ctx = ctx;
        this.draw();
    }

    draw(){
        this.ctx.font = "24px Arial";
        let textWidth = this.ctx.measureText(this.world.level.gameTime).width;
        let time = this.world.level.gameTime;
        this.ctx.fillStyle = time > 10 ? "#ffffffff" : "#ff0000ff";
        this.ctx.fillText(time > 10 ? time : "0" + time, (720/2) - (textWidth / 2), 40);
    }

    interval60FPS(){
        this.draw();
    }
}