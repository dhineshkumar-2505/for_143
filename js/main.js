// Main.js - Entry point and initialization
// DIRECTOR'S CUT - Emotional pacing and psychological timing

console.log('For My Sindhu - Initializing...');

// Module imports
import { SceneManager } from './sceneManager.js';
import { AudioController } from './audioController.js';
import { ParticleSystem } from './particles.js';

// Global instances
let sceneManager;
let audioController;
let particleSystem;
let openingTimeline;

// DOM Elements
const splashScreen = document.getElementById('splash-screen');
const splashText = document.getElementById('splash-text');
const startBtn = document.getElementById('start-btn');

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Ready - Starting Opening Sequence');

    // Initialize core systems
    audioController = new AudioController();
    sceneManager = new SceneManager(audioController);
    particleSystem = new ParticleSystem('particle-canvas');

    // Link particle system to scene manager
    sceneManager.setParticleSystem(particleSystem);

    // Show a subtle "tap to begin" prompt - this unlocks audio in the browser
    const tapPrompt = document.createElement('div');
    tapPrompt.id = 'tap-prompt';
    tapPrompt.textContent = 'Tap anywhere in screen Sindhu';
    tapPrompt.style.cssText = `
        position: fixed; bottom: 15%; left: 50%; transform: translateX(-50%);
        color: rgba(255, 105, 180, 0.8); font-size: 0.95rem; font-family: 'Cormorant Garamond', serif;
        letter-spacing: 0.15em; z-index: 9999; cursor: pointer;
        animation: tapPulse 2s ease-in-out infinite;
        text-shadow: 0 0 10px rgba(255, 105, 180, 0.5);
    `;
    // Add pulse animation
    const style = document.createElement('style');
    style.textContent = `@keyframes tapPulse { 0%,100% { opacity: 0.5; } 50% { opacity: 1; } }`;
    document.head.appendChild(style);
    document.body.appendChild(tapPrompt);

    // Wait for ANY interaction to unlock audio and start
    const startExperience = () => {
        // Remove prompt
        gsap.to(tapPrompt, {
            opacity: 0, duration: 0.5,
            onComplete: () => tapPrompt.remove()
        });
        style.remove();

        // NOW start the opening sequence (audio will work!)
        startOpeningSequence();

        // Remove all listeners
        document.removeEventListener('click', startExperience);
        document.removeEventListener('touchstart', startExperience);
        document.removeEventListener('keydown', startExperience);
    };
    document.addEventListener('click', startExperience);
    document.addEventListener('touchstart', startExperience);
    document.addEventListener('keydown', startExperience);

    // Production ready - no debug shortcuts
});

/**
 * BOOT SCENE - THE TRUST MOMENT
 * Purpose: Prevent "page didn't load" → close tab
 * React immediately, build trust, create curiosity
 */
function startOpeningSequence() {
    openingTimeline = gsap.timeline();
    const timeline = openingTimeline;

    // 0.2s: Start soft wind ambience immediately
    timeline.call(() => {
        audioController.playAmbience('wind', 0.12, 1);
        console.log('Wind ambience started');
    }, null, 0.2);

    // Line 1: "Hey Sindhu… wait… don't close this."
    timeline.call(() => {
        typewriterLine("Hey Sindhu… wait… don't close this.", splashText, 40);
    }, null, 0.5);

    timeline.to({}, { duration: 3.5 }); // Wait for typing + pause (1.2s)

    // Line 2: "I know it looks empty…"
    timeline.call(() => {
        typewriterLine("I know it looks empty…", splashText, 40);
    });

    timeline.to({}, { duration: 2.3 }); // Typing + 0.8s pause

    // Line 3: "It's not broken."
    timeline.call(() => {
        typewriterLine("It's not broken.", splashText, 40);
    });

    timeline.to({}, { duration: 1.8 }); // Typing + 1s pause

    // Line 4: "Just stay for a moment…"
    timeline.call(() => {
        typewriterLine("Just stay for a moment…", splashText, 40);
    });

    // Start heartbeat ambience quietly
    timeline.call(() => {
        audioController.playAmbience('breathing', 0.08, 2); // Using breathing as heartbeat
    }, null, "+=0.5");

    timeline.to({}, { duration: 3 }); // Typing + 2s pause

    // Line 5: "There's something I've wanted to ask you for a long time."
    timeline.call(() => {
        typewriterLine("There's something I've wanted to ask you for a long time.", splashText, 40);
    });

    timeline.to({}, { duration: 5.5 }); // Typing + 3s pause

    // Transition to dark blue gradient
    timeline.to(splashScreen, {
        duration: 2.5,
        background: 'linear-gradient(180deg, #000814 0%, #001d3d 100%)',
        ease: 'power2.inOut'
    });

    // Clear previous text, show main question
    timeline.call(() => {
        splashText.textContent = '';
        splashText.style.fontSize = '2rem';
        splashText.style.fontWeight = '300';
        splashText.style.letterSpacing = '0.05em';
    });

    timeline.to(splashText, {
        duration: 2,
        opacity: 1,
        onStart: () => {
            splashText.textContent = 'Will you walk with me tonight?';
        }
    });

    // Show Yes button with glow
    timeline.to(startBtn, {
        duration: 1.5,
        opacity: 1,
        scale: 1,
        ease: 'power2.out',
        onStart: () => {
            startBtn.classList.remove('hidden');
            startBtn.textContent = 'Yes';
            startBtn.style.padding = '15px 50px';
            startBtn.style.fontSize = '1.2rem';
        }
    }, "+=1");

    // Add glow pulse animation to button
    timeline.to(startBtn, {
        duration: 3,
        boxShadow: '0 0 40px rgba(255, 255, 255, 0.6)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    }, '-=1');
}

/**
 * Typewriter effect - displays text one character at a time
 * Clears previous text first
 */
function typewriterLine(text, element, speed = 40) {
    element.textContent = '';
    element.style.opacity = '1';
    element.style.fontSize = '1.3rem';
    element.style.fontWeight = '300';
    element.style.letterSpacing = '0.02em';

    let i = 0;

    // Low-volume typing sound for the duration of this line
    const typingAudio = new Audio('assets/sfx/typing.mp3');
    typingAudio.loop = true;
    typingAudio.volume = 0.25;

    const tryPlay = () => {
        typingAudio.play().catch(() => {
            // If blocked, retry on first user interaction
            const retryHandler = () => {
                if (i < text.length) {
                    typingAudio.play().catch(() => { });
                }
                document.removeEventListener('click', retryHandler);
                document.removeEventListener('keydown', retryHandler);
                document.removeEventListener('touchstart', retryHandler);
            };
            document.addEventListener('click', retryHandler, { once: true });
            document.addEventListener('keydown', retryHandler, { once: true });
            document.addEventListener('touchstart', retryHandler, { once: true });
        });
    };
    tryPlay();

    const interval = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(interval);
            typingAudio.pause();
            typingAudio.currentTime = 0;
        }
    }, speed);
}

/**
 * Yes button click handler
 * Creates "entering the memory" feeling
 */
startBtn.addEventListener('click', () => {
    console.log('Yes clicked - Entering the memory');

    const timeline = gsap.timeline();

    // Button fades
    timeline.to(startBtn, {
        duration: 0.5,
        opacity: 0,
        scale: 0.9
    });

    // Text fades
    timeline.to(splashText, {
        duration: 0.5,
        opacity: 0
    }, "-=0.3");

    // Heartbeat/breathing fades out
    timeline.call(() => {
        audioController.fadeOutAmbience('breathing', 1);
    });

    // Wind increases slightly
    timeline.call(() => {
        audioController.playAmbience('wind', 0.18, 1);
    });

    // Screen blurs for 1 second (entering memory)
    timeline.to(splashScreen, {
        duration: 1,
        filter: 'blur(20px)',
        ease: 'power2.inOut'
    });

    // Fade out splash screen
    timeline.to(splashScreen, {
        duration: 1.5,
        opacity: 0,
        ease: 'power2.inOut',
        onComplete: () => {
            splashScreen.classList.add('hidden');
            splashScreen.style.display = 'none';

            // Start Garden scene
            sceneManager.startExperience();
        }
    });
});
