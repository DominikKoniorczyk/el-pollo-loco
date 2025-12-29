export class Keyboard {
    RIGHT = false;
    LEFT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    THROW = false;

    constructor() {
    }

    static addKeyboardListener(){
        window.addEventListener("keydown", Keyboard.onKeyDown);
        window.addEventListener("keyup", Keyboard.onKeyUp);
        let mobileButtons = Keyboard.getMobileButtons(window.document);
        mobileButtons.left.addEventListener("touchstart", Keyboard.onTouchStartLeft);
        mobileButtons.left.addEventListener("touchend", Keyboard.onTouchEndLeft);
        mobileButtons.right.addEventListener("touchstart", Keyboard.onTouchStartRight);
        mobileButtons.right.addEventListener("touchend", Keyboard.onTouchEndRight);
        mobileButtons.jump.addEventListener("touchstart", Keyboard.onTouchStartJump);
        mobileButtons.jump.addEventListener("touchend", Keyboard.onTouchEndJump);
        mobileButtons.throw.addEventListener("touchstart", Keyboard.onTouchStartThrow);
        mobileButtons.throw.addEventListener("touchend", Keyboard.onTouchEndThrow);
    }

    static getMobileButtons(document){  
        let leftTouch = document.getElementById("buttonLeft");
        let rightTouch = document.getElementById("buttonRight");
        let jumpTouch = document.getElementById("buttonJump");
        let throwTouch = document.getElementById("buttonThrow");
        return {left: leftTouch, right: rightTouch, throw: throwTouch, jump: jumpTouch};
    }

    static removeKeyboardListener(){
        window.removeEventListener("keydown", Keyboard.onKeyDown);
        window.removeEventListener("keyup", Keyboard.onKeyUp);
    }

    static onKeyDown = (e) => {
        if(e.code === "KeyD" || e.code === "ArrowRight") Keyboard.RIGHT = true;
        else if(e.code === "KeyA" || e.code === "ArrowLeft") Keyboard.LEFT = true;
        else if(e.code === "Space") Keyboard.SPACE = true;
        else if(e.code === "KeyT") Keyboard.THROW = true;           
    }

    static onKeyUp(e){
        if(e.code === "KeyD" || e.code === "ArrowRight") Keyboard.RIGHT = false;
        else if(e.code === "KeyA" || e.code === "ArrowLeft") Keyboard.LEFT = false;
        else if(e.code === "Space") Keyboard.SPACE = false;
        else if(e.code === "KeyT") Keyboard.THROW = false;
    }
    
    static onTouchStartLeft(){
        Keyboard.LEFT = true;
    }
    
    static onTouchEndLeft(){
        Keyboard.LEFT = false;
    }
    
    static onTouchStartRight(){
        Keyboard.RIGHT = true;
    }
    
    static onTouchEndRight(){
        Keyboard.RIGHT = false;
    }
    
    static onTouchStartJump(){
        Keyboard.SPACE = true;
    }
    
    static onTouchEndJump(){
        Keyboard.SPACE = false;
    }
    
    static onTouchStartThrow(){
        Keyboard.THROW = true;
    }
    
    static onTouchEndThrow(){
        Keyboard.THROW = false;
    }
}
