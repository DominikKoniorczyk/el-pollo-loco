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
}
