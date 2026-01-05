import { SoundHub } from "../classes/soundhub.class.js";
import { closeFullscreen, isInFullscreen, openFullscreen, toggleSoundSymbol } from "./dom.js";

export let muted = false;

export function addFunctionListnerControlls(){
    window.toggleAudio = () => toggleAudio();
    window.toggleFullScreen = () => fullScreenToggle();
}

export function loadAudioSetting(){
    if(JSON.parse(localStorage.getItem("Audio"))) {
        toggleSoundSymbol();
        muted = !muted;
        SoundHub.muteAll();
    }
}

function toggleAudio(){
    toggleSoundSymbol();
    muted = !muted;
    SoundHub.muteAll();
    localStorage.setItem("Audio", JSON.stringify(muted));
}

function fullScreenToggle(){
    isInFullscreen() ? closeFullscreen() : openFullscreen();    
}