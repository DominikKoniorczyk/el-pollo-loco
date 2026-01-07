import { SoundHub } from "../classes/soundhub.class.js";
import { closeFullscreen, isInFullscreen, openFullscreen, toggleSoundSymbol } from "./dom.js";

export let muted = false;

/**
 * Registers global window functions for audio and fullscreen controls.
 * `toggleAudio` and `toggleFullScreen` are attached to the window object.
 */
export function addFunctionListnerControlls(){
    window.toggleAudio = () => toggleAudio();
    window.toggleFullScreen = () => fullScreenToggle();
}

/**
 * Loads the saved audio setting from localStorage.
 * Updates mute state and UI icon if audio was previously muted.
 */
export function loadAudioSetting(){
    if(JSON.parse(localStorage.getItem("Audio"))) {
        toggleSoundSymbol();
        muted = !muted;
        SoundHub.muteAll();
    }
}

export function preventSpaceClick(){
    window.document.addEventListener("keydown", e => {
    if ((e.code === "Space" || e.key === " ") && document.activeElement.tagName === "BUTTON") {
        e.preventDefault();
    }});
}

/**
 * Toggles audio mute state.
 * Updates the UI icon, mutes/unmutes all sounds, and saves the setting.
 */
function toggleAudio(){
    toggleSoundSymbol();
    muted = !muted;
    SoundHub.muteAll();
    localStorage.setItem("Audio", JSON.stringify(muted));
}

/**
 * Toggles fullscreen mode.
 * Enters fullscreen if not active, or exits if currently in fullscreen.
 */
function fullScreenToggle(){
    isInFullscreen() ? closeFullscreen() : openFullscreen();    
}