/**
 * Creats a new keyboard.
 * @class
 */
export class Keyboard {
    RIGHT = false;
    LEFT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    THROW = false;

    constructor() {
    }

    /**
     * Registers keyboard and touch listeners for movement and action controls.
     */
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

    /**
     * Retrieves the DOM elements for mobile control buttons.
     * @param {Document} document - The HTML document to query buttons from.
     * @returns {{left: HTMLElement, right: HTMLElement, jump: HTMLElement, throw: HTMLElement}} Mobile buttons elements.
     */
    static getMobileButtons(document){  
        let leftTouch = document.getElementById("buttonLeft");
        let rightTouch = document.getElementById("buttonRight");
        let jumpTouch = document.getElementById("buttonJump");
        let throwTouch = document.getElementById("buttonThrow");
        return {left: leftTouch, right: rightTouch, throw: throwTouch, jump: jumpTouch};
    }

    /**
     * Removes the global keyboard event listeners. And resets all control flags to false.
     */
    static removeKeyboardListener(){
        window.removeEventListener("keydown", Keyboard.onKeyDown);
        window.removeEventListener("keyup", Keyboard.onKeyUp);
        Keyboard.RIGHT = false;
        Keyboard.LEFT = false;
        Keyboard.SPACE = false;
        Keyboard.THROW = false;        
    }

    /**
     * Handles keydown events and sets corresponding control flags to true.
     * @param {KeyboardEvent} e - The keyboard event object.
     */
    static onKeyDown = (e) => {
        if(e.code === "KeyD" || e.code === "ArrowRight") Keyboard.RIGHT = true;
        else if(e.code === "KeyA" || e.code === "ArrowLeft") Keyboard.LEFT = true;
        else if(e.code === "Space") Keyboard.SPACE = true;
        else if(e.code === "KeyT") Keyboard.THROW = true;           
    }

    /**
     * Handles keyup events and sets corresponding control flags to false.
     * @param {KeyboardEvent} e - The keyboard event object.
     */
    static onKeyUp(e){
        if(e.code === "KeyD" || e.code === "ArrowRight") Keyboard.RIGHT = false;
        else if(e.code === "KeyA" || e.code === "ArrowLeft") Keyboard.LEFT = false;
        else if(e.code === "Space") Keyboard.SPACE = false;
        else if(e.code === "KeyT") Keyboard.THROW = false;
    }
    
    /**
     * Sets the LEFT control flag to true on touch start.
     */
    static onTouchStartLeft(){
        Keyboard.LEFT = true;
    }
    
    /**
     * Sets the LEFT control flag to false on touch end.
     */
    static onTouchEndLeft(){
        Keyboard.LEFT = false;
    }
    
    /**
     * Sets the RIGHT control flag to true on touch start.
     */
    static onTouchStartRight(){
        Keyboard.RIGHT = true;
    }
    
    /**
     * Sets the RIGHT control flag to false on touch end.
     */
    static onTouchEndRight(){
        Keyboard.RIGHT = false;
    }
    
    /**
     * Sets the SPACE (jump) control flag to true on touch start.
     */
    static onTouchStartJump(){
        Keyboard.SPACE = true;
    }
    
    /**
     * Sets the SPACE (jump) control flag to false on touch end.
     */
    static onTouchEndJump(){
        Keyboard.SPACE = false;
    }
    
    /**
     * Sets the THROW control flag to true on touch start.
     */
    static onTouchStartThrow(){
        Keyboard.THROW = true;
    }
    
    /**
     * Sets the THROW control flag to false on touch end.
     */
    static onTouchEndThrow(){
        Keyboard.THROW = false;
    }
}
