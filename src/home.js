
const defaultOptions = {
    lightColor: '#ffffff',
    brightnessLevels: [0, 0.5, 0.75, 1],
    musicPlaying: 'Rock',
    musicSelection: ['Rock', 'Jazz', 'Punk']
}

class OffState {
    constructor(lamp) {
        this.lamp = lamp;
    }

    toggle() {
        this.lamp.setState(this.lamp.lowBrightnessState);
        console.log('Lamp turned on to low');
    }

    increaseBrightness() {
        throw new Error('Lamp off');
    }
}

class LowBrightnessState {
    constructor(lamp) {
        this.lamp = lamp;
    }

    toggle() {
        this.lamp.setState(this.lamp.offState);
        console.log('Lamp off');
    }

    increaseBrightness() {
        this.lamp.setState(this.lamp.mediumBrightnessState);
        console.log('Lamp brightness turned to medium');
    }
}

class MediumBrightnessState {
    constructor(lamp) {
        this.lamp = lamp;
    }

    toggle() {
        this.lamp.setState(this.lamp.offState);
        console.log('Lamp off');
    }

    increaseBrightness() {
        this.lamp.setState(this.lamp.highBrightnessState);
        console.log('Lamp brightness max');
    }
}

class HighBrightnessState {
    constructor(lamp) {
        this.lamp = lamp;
    }

    toggle() {
        this.lamp.setState(this.lamp.offState);
        console.log('Lamp off');
    }

    increaseBrightness() {
        console.log('Lamp is already on full brightness');
    }
}

class offState2 {
    constructor(player) {
        this.player = player;
    }

    toggle() {
        this.player.setState(this.player.idleState);
    }

    nextTrack() {
        throw new Error('Turned off');
    }

    playPause() {
        throw new Error('Cannot pause - off.');
    }
}

class idleState {
    constructor(player) {
        this.player = player;
    }

    toggle() {
        this.player.setState(this.player.offState2);
    }

    nextTrack() {
        console.log('Starting to play first track...');
        this.player.setState(this.player.playingState);
    }

    playPause() {
        console.log('Starting to play...')
        this.player.setState(this.player.playingState);
    }
}

class playingState {
    constructor(player) {
        this.player = player;
    }

    toggle() {
        this.player.setState(this.player.offState2);
    }

    nextTrack() {
        console.log('Next track playing...');
    }

    playPause() {
        console.log('Pausing...');
        this.state = this.player.pausedState;
    }
}

class pausedState {
    constructor(player) {
        this.player = player;
    }

    toggle() {
        this.player.setState(this.player.offState2);
    }

    nextTrack() {
        console.log('Next track playing, but paused.');
    }

    playPause() {
        console.log('Resuming.');
        this.state = this.player.playingState;
    }
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
        this.currentDevice = new Lights(this.options);
        this.currentDevice.toggleLamp();
    }

    togglePlayer() {
        this.currentDevice = new Player(this.options);
        this.currentDevice.toggle();
    }

    nextTrack() {
        this.currentDevice.nextTrack();
    }
    
    increaseLampBrightness() {
        this.currentDevice.increaseLampBrightness();
    }

    playPause() {
        this.currentDevice.playPause();
    }
}

class Lights extends SmartHome {
    constructor(options) {
        super(options);
        this.offState = new OffState(this);
        this.lowBrightnessState = new LowBrightnessState(this);
        this.mediumBrightnessState = new MediumBrightnessState(this);
        this.highBrightnessState = new HighBrightnessState(this);
        this.currentState = this.offState;
    }
    
    setState(state) {
        this.currentState = state;
    }
    
    toggleLamp() {
        this.currentState.toggle();
    }
    
    increaseLampBrightness() {
        this.currentState.increaseBrightness();
    }
}

class Player extends SmartHome {
    constructor(options) {
        super(options);
        this.offState2 = new offState2(this);
        this.idleState = new idleState(this);
        this.playingState = new playingState(this);
        this.pausedState = new pausedState(this);
        this.currentState = this.offState2
    }

    setState(state) {
        this.currentState = state;
    }
    
    toggle() {
        this.currentState.toggle();
    }


    playPause() {
        this.currentState.playPause();
    }

    nextTrack() {
        this.currentState.nextTrack();
    }
}

const home = new SmartHome();
home.debug();
home.toggleLamp();
home.increaseLampBrightness();

home.togglePlayer();
home.playPause();
home.nextTrack();