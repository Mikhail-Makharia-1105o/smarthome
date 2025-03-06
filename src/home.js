
const defaultOptions = {
    lightColor: '#ffffff',
    brightnessLevels: [0, 0.5, 0.75, 1],
    musicPlaying: 'Rock',
    musicSelection: ['Rock', 'Jazz', 'Punk']
}

export default class SmartHome {
    constructor(options) {
        options = options || defaultOptions
        this.options = options;
        this.currentDevice = null;
    }

    debug() {
        console.log(this.options)
    }

    toggleLamp() {
        if (this.currentDevice instanceof Lights) {
            this.currentDevice.lampOffOn();
            this.currentDevice = null;
            console.log('lamp is now on')
        } else {
            this.currentDevice = new Lights(this.options);
            this.currentDevice.lampOffOn();
            console.log('lamp is now off')
        }
    }

    togglePlayer() {
        if (this.currentDevice instanceof Player) {
            this.currentDevice.playerOffOn();
            this.currentDevice = null;
            console.log('player is now off')
        } else {
            this.currentDevice = new Player(this.options);
            this.currentDevice.playerOffOn();
            console.log('player is now on')
        }
    }

    increaseLampBrightness() {
        if (this.currentDevice instanceof Lights) {
            this.currentDevice.increaseLampBrightness();
        } else {
            throw new Error('Not working with lights')
        }
    }

    lampOffOn() {
        if (this.currentDevice instanceof Lights) {
            this.currentDevice.lampOffOn();
        } else {
            throw new Error('Not working with lights')
        }
    }

    playPause() {
        if (this.currentDevice instanceof Player) {
            this.currentDevice.playPause();
        } else {
            throw new Error('Not working with player')
        }
    }

    nextTrack() {
        if (this.currentDevice instanceof Player) {
            this.currentDevice.nextTrack();
        } else {
            throw new Error('Not working with player')
        }
    }

}

class Lights extends SmartHome {
    constructor(options) {
        super(options);
        this.state = 0;
        this.states = ['offState', 'lowBrightnessState', 'mediumBrightnessState', 'highBrightnessState']
    }
    increaseLampBrightness() {
        if (this.state === 0) {
            throw new Error('Lights off, cannot brighten')
        }
        this.state + 1 > this.states.length ? this.states.length - 1 : this.state + 1;
        console.log('Brightness increased to:', this.options.brightnessLevels[this.state])
    }
    lampOffOn() {
        this.state = this.state === 0 ? 1 : 0;
    }
}

class Player extends SmartHome {
    constructor(options) {
        super(options);
        this.state = 0;
        this.states = ['offState', 'idleState', 'playingState', 'pausedState']
        this.currentSong = this.options.musicPlaying
        this.working = false;
    }

    playPause() {
    if (this.state === 0) {
            throw new Error('Player off, cannot play/pause')
        }
        this.state = this.state === 2? 3 : 2;
        console.log('player is now in its ', this.states[this.state])
    }

    playerOffOn() {
        this.state === 0 ? this.state = 1 : this.state = 0;
    }

    nextTrack() {
        if (this.options.musicSelection.length <= 1) {
            throw new Error('Only one(or less) song in selection, cannot cycle!')
        }
        const currentIndex = this.options.musicSelection.indexOf(this.currentSong);
        this.currentSong = this.options.musicSelection[(currentIndex + 1) % this.options.musicSelection.length];
        console.log('Playing ', this.currentSong)
    }
}

const home = new SmartHome();
home.debug();
home.toggleLamp();
home.increaseLampBrightness();

home.togglePlayer();
home.playPause();