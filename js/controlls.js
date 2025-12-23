import { SoundHub } from "../classes/soundhub.class.js";
import { closeFullscreen, isInFullscreen, openFullscreen, toggleSoundSymbol } from "./dom.js";

export let muted = false;

export function addFunctionListnerControlls(){
    window.toggleAudio = () => toggleAudio();
    window.toggleFullScreen = () => fullScreenToggle();
}

function toggleAudio(){
    toggleSoundSymbol();
    muted = !muted;
    SoundHub.muteAll();
}

function fullScreenToggle(){
    isInFullscreen() ? closeFullscreen() : openFullscreen();    
}