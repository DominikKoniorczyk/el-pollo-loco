export class SoundHub {
    static volume = 0.2; 
    static muted = false;   
    static character = {
        damage: new Audio ('../assets/audio/character/characterDamage.mp3'),
        dead: new Audio ('../assets/audio/character/characterDead.wav'),
        jump: new Audio ('../assets/audio/character/characterjump.wav'),
        run: new Audio ('../assets/audio/character/characterRun.mp3'),
        sleep: new Audio ('../assets/audio/character/characterSnoring.mp3')
    }
    static collectibles = {
        bottle: new Audio ('../assets/audio/collectibles/bottleCollectSound.wav'),
        coin: new Audio ('../assets/audio/collectibles/collectSound.wav'),
    }
    static throwable = {
        break: new Audio ('../assets/audio/throwable/bottleBreak.mp3')
    }
    static playing = {
        "run": SoundHub.character.run,
        "snorring": SoundHub.character.sleep,
        "jump": SoundHub.character.jump,
        "hurt": SoundHub.character.damage,
    };
    static allSounds = []

    static playOne(sound) {
        const int = setInterval(() => {  
            if (sound.readyState == 4) {
                sound.volume = SoundHub.volume; 
                sound.play(); 
                SoundHub.allSounds.push(sound);
                clearInterval(int);
            } 
        }, 200);
    }

    static playCharacterSounds(sound, loop){
        if(SoundHub.playing[sound].currentTime == 0){
            SoundHub.playOne(SoundHub.playing[sound]);
            SoundHub.playing[sound].loop = loop;
        }
    }

    static stopAllCharacterSounds(stopNot){
        if(stopNot != "snorring") SoundHub.stopOne(SoundHub.playing.snorring);
        if(stopNot != "jump") SoundHub.stopOne(SoundHub.playing.jump);
        if(stopNot != "run") SoundHub.stopOne(SoundHub.playing.run);
        if(stopNot != "hurt") SoundHub.stopOne(SoundHub.playing.hurt);
    }

    static stopAll() {
        SoundHub.allSounds.forEach(sound => {
            if(sound)
            sound.pause();
        });
    }

    static stopOne(sound) {
        sound.pause();
        sound.currentTime = 0;
    }

    static muteAll(){
        if(SoundHub.muted){
            SoundHub.allSounds.forEach(sound => {
                sound.volume = SoundHub.volume;
            });
            SoundHub.muted = false;
            document.getElementById('mute').innerHTML = "MuteAll";
        } else {
            SoundHub.allSounds.forEach(sound => {
                sound.volume = 0;
            });
            SoundHub.muted = true;
            document.getElementById('mute').innerHTML = "UnmuteAll";
        }
    }

    static objSetVolume(volumeSlider) {
        let volumeValue = document.getElementById('volume').value; 
        volumeSlider.forEach(sound => {
            sound.volume = volumeValue; 
        });
    }
}