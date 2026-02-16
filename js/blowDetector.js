// BlowDetector.js - Microphone blow detection
// Uses Web Audio API to detect blow spike for candle extinguish

export class BlowDetector {
    constructor() {
        this.audioContext = null;
        this.analyser = null;
        this.microphone = null;
        this.isActive = false;
        this.threshold = 60;

        console.log('BlowDetector initialized');
    }

    // Request microphone permission (Phase 12)
    async requestPermission() {
        // navigator.mediaDevices.getUserMedia
    }

    // Start monitoring (Phase 12)
    start(onBlowDetected) {
        // Start audio analysis loop
        // Fire callback when amplitude > threshold
    }

    // Stop monitoring (Phase 12)
    stop() {
        // Clean up audio stream
    }

    // Analyze audio data (Phase 12)
    analyze() {
        // getByteFrequencyData
        // Check for spike
    }
}
