export class EndScoreText {
    score = 0;
    ctx;

    constructor(score, ctx){
        this.score = score;
        this.ctx = ctx;
        this.draw();
    }

    draw(){
        this.ctx.font = "24px 'HennyPenny', 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif";
        let textWidth = this.ctx.measureText("Your score is:").width;
        let textWidth2 = this.ctx.measureText(this.score).width;
        this.ctx.fillText("Your score is:", (720/2) - (textWidth / 2), 80);
        this.ctx.fillText(this.score, (720/2) - (textWidth2 / 2), 120);
    }
}