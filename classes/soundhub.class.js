export class SoundHub {
    static volume = 0.2; 
    static muted = false; 
    static allSounds = [];

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

    static stopAll() {
        SoundHub.allSounds.forEach(sound => {
            if(sound.readyState == 4) {
                sound.pause();
            }
        });
        SoundHub.allSounds = [];
    }

    static stopOne(sound) {
        sound.pause();
    }

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

    static objSetVolume(volumeSlider) {
        let volumeValue = document.getElementById('volume').value; 
        volumeSlider.forEach(sound => {
            sound.volume = volumeValue; 
        });
    }
}