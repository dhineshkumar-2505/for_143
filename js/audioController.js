// AudioController.js - Web Audio API controller
// Handles music, ambience, SFX layers and crossfading

export class AudioController {
    constructor() {
        this.context = null;
        this.musicGain = null;
        this.ambienceGain = null;
        this.sfxGain = null;

        // Audio sources
        this.currentMusic = null;
        this.currentAmbience = {};

        // Audio file paths (matching user's actual files)
        this.audioFiles = {
            music: {
                piano: 'assets/music/piano.mp3',
                beach_piano: 'assets/music/beach_peano.mp3',
                wave: 'assets/music/wave.mp3',
                rain: 'assets/music/rain.mp3',
                strings: 'assets/music/string.mp3',  // User has 'string.mp3' not 'strings.mp3'
                wind: 'assets/music/wind.mp3',
                taj_piano: 'assets/music/taj_piano.mp3',
                love_piano: 'assets/music/love_piano.mp3',
                hill_piano: 'assets/music/string.mp3' // Magical ending
            },
            sfx: {
                breathing: 'assets/sfx/breathing.mp3',
                typewriter: 'assets/sfx/typing.mp3',  // User has 'typing.mp3' not 'typewriter.mp3'
                footstep: 'assets/sfx/foot_steps.mp3',  // User has 'foot_steps.mp3' not 'footstep.mp3'
                match: 'assets/sfx/match.mp3',
                // Aliases used by hilltop birthday scene
                match_strike: 'assets/sfx/match.mp3',
                candle_chime: 'assets/sfx/match.mp3',
                bottle: 'assets/sfx/bottle.mp3'  // Optional - missing
            },
            voice: {
                message: 'assets/music/personal_meg.mp3'
            }
        };

        // Preloaded audio buffers
        this.buffers = {};

        // Pending audio queue (for autoplay blocked sounds)
        this._pendingAmbience = [];
        this._userInteracted = false;
        this._setupInteractionListener();

        console.log('AudioController initialized');
    }

    /**
     * Listen for first user interaction to replay blocked audio
     */
    _setupInteractionListener() {
        const handler = () => {
            this._userInteracted = true;
            // Replay any pending ambience
            if (this._pendingAmbience.length > 0) {
                console.log(`Replaying ${this._pendingAmbience.length} blocked audio(s)...`);
                this._pendingAmbience.forEach(({ name, volume, fade }) => {
                    this.playAmbience(name, volume, fade);
                });
                this._pendingAmbience = [];
            }
            // Remove listeners
            ['click', 'keydown', 'touchstart'].forEach(evt => {
                document.removeEventListener(evt, handler);
            });
        };
        ['click', 'keydown', 'touchstart'].forEach(evt => {
            document.addEventListener(evt, handler, { once: false });
        });
    }

    /**
     * Initialize AudioContext and GainNodes
     * Must be called after user interaction (browser policy)
     */
    init() {
        if (this.context) return; // Already initialized

        try {
            this.context = new (window.AudioContext || window.webkitAudioContext)();

            // Create gain nodes for each layer
            this.musicGain = this.context.createGain();
            this.ambienceGain = this.context.createGain();
            this.sfxGain = this.context.createGain();

            // Connect to destination
            this.musicGain.connect(this.context.destination);
            this.ambienceGain.connect(this.context.destination);
            this.sfxGain.connect(this.context.destination);

            // Set initial volumes
            this.musicGain.gain.value = 0.4;
            this.ambienceGain.gain.value = 0.15;
            this.sfxGain.gain.value = 0.6;

            console.log('AudioContext initialized');
        } catch (error) {
            console.error('Failed to initialize AudioContext:', error);
        }
    }

    /**
     * Play ambience track (can layer multiple)
     * @param {string} name - Ambience name (breathing, rain, wind)
     * @param {number} targetVolume - Target volume (0-1)
     * @param {number} fadeTime - Fade in duration in seconds
     */
    playAmbience(name, targetVolume = 0.15, fadeTime = 2) {
        this.init(); // Ensure context is initialized

        // Check if it's in music folder first, then sfx
        let audioPath = this.audioFiles.music[name] || this.audioFiles.sfx[name] || `assets/sfx/${name}.mp3`;

        // For now, use HTML5 Audio as placeholder
        const audio = new Audio(audioPath);
        audio.loop = true;
        audio.volume = 0;

        audio.play().then(() => {
            // Fade in using GSAP
            gsap.to(audio, {
                duration: fadeTime,
                volume: targetVolume,
                ease: 'power2.inOut'
            });

            this.currentAmbience[name] = audio;
            console.log(`Playing ambience: ${name} from ${audioPath}`);
        }).catch(err => {
            console.warn(`Could not play ambience ${name}: ${err}`);
            // Queue for replay on first user interaction
            if (!this._userInteracted) {
                this._pendingAmbience.push({ name, volume: targetVolume, fade: fadeTime });
                console.log(`Queued ${name} for replay on user interaction`);
            }
        });
    }

    /**
     * Fade out ambience track
     * @param {string} name - Ambience name
     * @param {number} fadeTime - Fade out duration in seconds
     */
    fadeOutAmbience(name, fadeTime = 1) {
        const audio = this.currentAmbience[name];
        if (!audio) return;

        gsap.to(audio, {
            duration: fadeTime,
            volume: 0,
            ease: 'power2.inOut',
            onComplete: () => {
                audio.pause();
                delete this.currentAmbience[name];
            }
        });
    }

    /**
     * Stop all audio immediately (for skipping scenes)
     */
    /**
     * Stop all audio immediately (for skipping scenes)
     */
    stopAll() {
        this.stopMusic();

        // Stop all ambiences
        Object.keys(this.currentAmbience).forEach(key => {
            const audio = this.currentAmbience[key];
            if (audio) {
                audio.pause();
            }
        });
        this.currentAmbience = {};

        console.log('Stopped all audio');
    }

    /**
     * Stop current music immediately
     */
    stopMusic() {
        if (this.currentMusic) {
            this.currentMusic.pause();
            this.currentMusic = null;
        }
    }

    /**
     * Fade out ambience track
     * @param {string} name - Music track name
     * @param {number} volume - Target volume (0-1)
     * @param {number} fadeTime - Crossfade duration in seconds
     */
    playMusic(name, volume = 0.4, fadeTime = 2) {
        this.init();

        const musicPath = this.audioFiles.music[name] || `assets/music/${name}.mp3`;
        console.log(`Attempting to play music: ${name} from ${musicPath}`);

        const newMusic = new Audio(musicPath);
        newMusic.loop = true;
        newMusic.volume = 0;

        newMusic.play().then(() => {
            console.log(`✓ Music playing: ${name} at volume ${volume}`);

            // Fade in new music
            gsap.to(newMusic, {
                duration: fadeTime,
                volume: volume,
                ease: 'power2.inOut'
            });

            // Fade out old music if exists
            if (this.currentMusic) {
                const oldMusic = this.currentMusic;
                gsap.to(oldMusic, {
                    duration: fadeTime,
                    volume: 0,
                    ease: 'power2.inOut',
                    onComplete: () => {
                        oldMusic.pause();
                    }
                });
            }

            this.currentMusic = newMusic;
        }).catch(err => {
            console.error(`✗ Failed to play music ${name} from ${musicPath}:`, err);
        });
    }

    /**
     * Play one-shot sound effect
     * @param {string} name - SFX name
     * @param {number} volume - Volume (0-1)
     */
    playSFX(name, volume = 0.6) {
        this.init();

        const sfx = new Audio(this.audioFiles.sfx[name] || `assets/sfx/${name}.mp3`);
        sfx.volume = volume;

        sfx.play().catch(err => {
            console.warn(`Could not play SFX ${name}:`, err);
        });
    }

    /**
     * Alias for playSFX to match existing scene code (playSfx vs playSFX)
     * Keeps older calls working without breaking naming consistency.
     */
    playSfx(name, volume = 0.6) {
        this.playSFX(name, volume);
    }

    /**
     * Play voice note (special case for cafe scene)
     * @param {function} onEnd - Callback when voice note ends
     */
    playVoiceNote(onEnd) {
        this.init();

        const voice = new Audio(this.audioFiles.voice);
        voice.volume = 0.8;

        voice.addEventListener('ended', () => {
            if (onEnd) onEnd();
        });

        voice.play().catch(err => {
            console.warn('Could not play voice note:', err);
        });
    }
}
