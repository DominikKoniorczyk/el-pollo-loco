export class SoundHub {
    static volume = 0.2; 
    static muted = false; 
    static allSounds = [];

    /**
     * Plays a single sound if not muted, waiting until the sound is ready.
     * @param {HTMLAudioElement} sound - The audio element to play.
     */
    static playOne(sound) {
        if(!SoundHub.muted){
            const int = setInterval(() => {  
                if (sound.readyState == 4) {
                    sound.volume = SoundHub.volume; 
                    sound.play(); 
                    SoundHub.allSounds.push(sound);
                    clearInterval(int);
                } 
            }, 10);
        }
    }

    /**
     * Stops all currently playing sounds and clears the sound list.
     */
    static stopAll() {
        SoundHub.allSounds.forEach(sound => {
            if(sound.readyState == 4) {
                sound.pause();             
            }            
        });
        SoundHub.allSounds = [];
    }

    /**
     * Pauses a single sound.
     * @param {HTMLAudioElement} sound - The audio element to stop.
     */
    static stopOne(sound) {
        sound.pause();
    }

    /**
     * Pauses and reset a single sound.
     * @param {HTMLAudioElement} sound - The audio element to stop.
     */
    static stopAndResetOne(sound) {
        sound.pause();
        sound.currentTime = 0;
    }

    /**
     * Toggles mute for all sounds. Restores previous volume if unmuting.
     */
    static muteAll(){
        if(SoundHub.muted){
            SoundHub.allSounds.forEach(sound => {
                sound.volume = SoundHub.volume;
            });
            SoundHub.muted = false;
        } else {
            SoundHub.allSounds.forEach(sound => {
                sound.volume = 0;
            });
            SoundHub.muted = true;
        }
    }

    /**
     * Sets the volume of all sounds based on a volume slider input.
     * @param {HTMLAudioElement[]} volumeSlider - Array of audio elements to adjust.
     */
    static objSetVolume(volumeSlider) {
        let volumeValue = document.getElementById('volume').value; 
        volumeSlider.forEach(sound => {
            sound.volume = volumeValue; 
        });
    }
}