/**
 * Creats a new timer text.
 * @class
 */
export class TimerText{
    world;
    ctx;

    constructor(world, ctx){
        this.world = world;
        this.ctx = ctx;
        this.draw();
    }

    /**
     * Draws the current game time on the canvas, 
     * changing color if time is below a threshold, and draws a corresponding circle.
     */
    draw(){
        this.ctx.font = "24px 'HennyPenny', 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif";
        let textWidth = this.ctx.measureText(this.world.level.gameTime).width;
        let time = this.world.level.gameTime;
        this.ctx.fillStyle = time > 10 ? "#ffffff" : "#ff0000ff";
        this.ctx.fillText(time, (720/2) - (textWidth / 2), 40);
        this.drawCircle(time);
    }

    /**
     * Draws a circular timer around the time, 
     * with color changing when the time is low.
     * @param {number} currentTime - The current elapsed game time.
     */
    drawCircle(currentTime){
        const endAngle = -0.5 * Math.PI + 2 * Math.PI * (currentTime / this.world.level.startGameTime);
        this.ctx.beginPath();
        this.ctx.arc(360, 33, 25, -0.5 * Math.PI, endAngle, false);
        this.ctx.strokeStyle = currentTime > 10 ? "#ffffff" : "#ff0000";
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
    }

    /**
     * Called every frame (60 FPS) to update the canvas display.
     */
    interval60FPS(){
        this.draw();
    }
}