export class TimerText{
    world;
    ctx;

    constructor(world, ctx){
        this.world = world;
        this.ctx = ctx;
        this.draw();
    }

    draw(){
        this.ctx.font = "24px 'HennyPenny', 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif";
        let textWidth = this.ctx.measureText(this.world.level.gameTime).width;
        let time = this.world.level.gameTime;
        this.ctx.fillStyle = time > 10 ? "#ffffff" : "#ff0000ff";
        this.ctx.fillText(time, (720/2) - (textWidth / 2), 40);
        this.drawCircle(time);
    }

    drawCircle(currentTime){
        const endAngle = -0.5 * Math.PI + 2 * Math.PI * (currentTime / this.world.level.startGameTime);
        this.ctx.beginPath();
        this.ctx.arc(360, 33, 25, -0.5 * Math.PI, endAngle, false);
        this.ctx.strokeStyle = currentTime > 10 ? "#ffffff" : "#ff0000";
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
    }

    interval60FPS(){
        this.draw();
    }
}