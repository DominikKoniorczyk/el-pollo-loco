export class EndScoreText {
    score = 0;
    highscore = 0;
    ctx;

    constructor(score, ctx, highscore){
        this.score = score;
        this.highscore = highscore;
        this.ctx = ctx;
        this.draw();
    }

    draw(){
        this.ctx.font = "24px 'HennyPenny', 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif";
        this.ctx.fillText("Highscore:", (720/2) - (this.returnTextLenght("Highscore") / 2), 40);
        this.ctx.fillText(this.highscore, (720/2) - (this.returnTextLenght(this.highscore) / 2), 80)
        this.ctx.fillText("Your score is:", (720/2) - (this.returnTextLenght("Your score is:") / 2), 120);
        this.ctx.fillText(this.score, (720/2) - (this.returnTextLenght(this.score) / 2), 160);
    }

    returnTextLenght(text){
        return this.ctx.measureText(text).width;
    }
}