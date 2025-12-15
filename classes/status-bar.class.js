class StatusBar extends DrawableObject{
    percentage = 100;
    width = 200;
    height = 60;
    x = 20;
    y = 0;
    imageSource;
    
    constructor(x, y, src, full){
        super();
        this.x = x;
        this.y = y;
        this.imageSource = src;
        let i = full ? 5 : 0;     
        this.loadImages(src);
        this.setPercentage(full ? 100 : 0);       
    }

    setPercentage(percentage){
        this.percentage = percentage;
        let path = this.imageSource[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex(){
        if(this.percentage === 100){
            return 5;
        } else if(this.percentage >= 80){
            return 4;
        } else if(this.percentage >= 60){
            return 3;
        } else if(this.percentage >= 40){
            return 2;
        } else if(this.percentage >= 20){
            return 1;
        } else {
            return 0;
        }
    }
}