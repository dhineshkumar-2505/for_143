# Beach Scene Integration Guide

## Step 1: Update `transitionToBeach()` in sceneManager.js

**Find this method (around line 488):**
```javascript
transitionToBeach() {
    console.log('Transitioning to Beach scene');
    
    // Fade out piano, fade in wave music
    this.audioController.playMusic('wave', 0.3, 2);
    
    // Stop petals, no particles for beach
    if (this.particleSystem) {
        this.particleSystem.setMode('none');
    }
    
    // Scene transition
    this.transitionTo('beach', 2);
    
    // Initialize Beach scene (Phase 8)
    setTimeout(() => {
        console.log('Beach scene ready (Phase 8 implementation pending)');
    }, 2000);
}
```

**Replace with:**
```javascript
transitionToBeach() {
    console.log('Transitioning to Beach scene');
    
    // Fade out piano completely
    if (this.audioController.currentMusic) {
        gsap.to(this.audioController.currentMusic, {
            volume: 0,
            duration: 2,
            onComplete: () => {
                this.audioController.currentMusic.pause();
            }
        });
    }
    
    // Stop petals, no particles for beach
    if (this.particleSystem) {
        this.particleSystem.setMode('none');
    }
    
    // Scene transition
    this.transitionTo('beach', 3);
    
    // Initialize Beach scene after transition
    setTimeout(() => {
        this.initBeachScene();
    }, 3000);
}
```

## Step 2: Add Beach Scene Methods

**Add these methods right after `transitionToBeach()` (before `enableParallax`):**

```javascript
/**
 * BEACH SCENE - Complete Implementation
 */
initBeachScene() {
    console.log('Initializing Beach Scene...');
    const beachScene = this.scenes.beach;
    const layers = beachScene.querySelectorAll('.layer');
    
    // Set initial background image
    layers.forEach(layer => {
        layer.style.backgroundImage = 'url(assets/beach/beach_01.png)';
    });
    
    // Enable cinematic parallax and ambient animation
    this.enableCinematicParallax(beachScene);
    this.enableAmbientDepthAnimation(layers);
    
    // Start wave ambience
    this.audioController.playAmbience('wave', 0.2, 2);
    
    // Important: 10 seconds of silence first (memory building)
    setTimeout(() => {
        this.beachImage1(layers);
    }, 10000);
}

beachImage1(layers) {
    const timeline = gsap.timeline();
    
    timeline.call(() => {
        this.showText('"You remember this place…?"', 5000);
    });
    timeline.to({}, { duration: 7 });
    
    timeline.call(() => {
        this.showText('"I came here again recently."', 5000);
    });
    timeline.to({}, { duration: 7 });
    
    timeline.call(() => {
        this.showText('"Besant Nagar still looks the same."', 5000);
    });
    timeline.to({}, { duration: 8 });
    
    timeline.call(() => {
        this.showText('"Only one thing felt different."', 5000);
    });
    timeline.to({}, { duration: 9 });
    
    timeline.call(() => {
        this.beachImage2(layers);
    });
}

beachImage2(layers) {
    const timeline = gsap.timeline();
    
    timeline.call(() => {
        this.transitionBeachImage(layers, 'beach_02');
    });
    
    timeline.to(layers, {
        scale: 1.05,
        duration: 8,
        ease: 'power1.inOut',
        stagger: 0.1
    }, "+=1");
    
    timeline.to({}, { duration: 2 });
    
    timeline.call(() => {
        this.showText('"I used to imagine… you walking beside me."', 6000);
    });
    timeline.to({}, { duration: 8 });
    
    timeline.call(() => {
        this.showText('"I even sat in our usual kind of spot."', 5000);
    });
    timeline.to({}, { duration: 8 });
    
    timeline.call(() => {
        this.showText('"But the sea felt quieter."', 5000);
    });
    timeline.to({}, { duration: 7 });
    
    timeline.call(() => {
        this.showText('"Maybe… it was just me."', 5000);
    });
    timeline.to({}, { duration: 8 });
    
    timeline.call(() => {
        this.beachImage3(layers);
    });
}

beachImage3(layers) {
    const timeline = gsap.timeline();
    
    timeline.call(() => {
        this.transitionBeachImage(layers, 'beach_03');
    });
    timeline.to({}, { duration: 3 });
    
    timeline.call(() => {
        this.showText('"Time passed…"', 4000);
    });
    timeline.to({}, { duration: 6 });
    
    timeline.call(() => {
        this.showText('"We stopped talking."', 5000);
    });
    timeline.to({}, { duration: 8 });
    
    timeline.call(() => {
        this.showText('"And I thought maybe… that was the end of our story."', 6000);
    });
    timeline.to({}, { duration: 10 });
    
    timeline.call(() => {
        this.showText('"But somehow… it never felt finished."', 6000);
    });
    timeline.to({}, { duration: 9 });
    
    timeline.call(() => {
        this.beachImage4(layers);
    });
}

beachImage4(layers) {
    const timeline = gsap.timeline();
    
    timeline.call(() => {
        this.transitionBeachImage(layers, 'beach_04');
    });
    
    // Start Beach Piano music here
    timeline.call(() => {
        console.log('Starting beach piano music...');
        this.audioController.playMusic('beach_piano', 0.15, 4);
    }, null, 2);
    
    timeline.to({}, { duration: 3 });
    
    timeline.call(() => {
        this.showText('"You might wonder why I came back like this."', 6000);
    });
    timeline.to({}, { duration: 9 });
    
    timeline.call(() => {
        this.showText('"I didn\'t come to disturb your life."', 5000);
    });
    timeline.to({}, { duration: 7 });
    
    timeline.call(() => {
        this.showText('"I came because some feelings didn\'t fade."', 6000);
    });
    timeline.to({}, { duration: 9 });
    
    timeline.call(() => {
        this.showText('"Even after all this time."', 5000);
    });
    timeline.to({}, { duration: 8 });
    
    timeline.call(() => {
        this.beachImage5(layers);
    });
}

beachImage5(layers) {
    const timeline = gsap.timeline();
    
    timeline.call(() => {
        this.transitionBeachImage(layers, 'beach_05');
    });
    
    timeline.to(this.scenes.beach, {
        duration: 4,
        filter: 'brightness(0.7) saturate(1.1)',
        ease: 'power2.inOut'
    }, "+=1");
    
    timeline.call(() => {
        this.audioController.playAmbience('wave', 0.25, 3);
    }, null, 2);
    
    timeline.to({}, { duration: 4 });
    
    timeline.call(() => {
        this.showText('"I don\'t know what the future holds."', 5000);
    });
    timeline.to({}, { duration: 7 });
    
    timeline.call(() => {
        this.showText('"I don\'t even know if I\'ll get another chance like this."', 6000);
    });
    timeline.to({}, { duration: 8 });
    
    timeline.call(() => {
        this.showText('"But I didn\'t want to stay silent forever."', 6000);
    });
    timeline.to({}, { duration: 9 });
    
    timeline.call(() => {
        this.showText('"So I made this… just to tell you honestly."', 6000);
    });
    timeline.to({}, { duration: 8 });
    
    timeline.call(() => {
        this.showText('"You still matter to me."', 6000);
    });
    timeline.to({}, { duration: 10 });
    
    timeline.call(() => {
        this.showText('"Shall we go somewhere else?"', 5000);
    });
    timeline.to({}, { duration: 7 });
    
    timeline.call(() => {
        this.showContinueButton(() => {
            this.transitionToCafe();
        }, "Let's go →");
    });
}

transitionBeachImage(layers, imageName) {
    layers.forEach((layer, index) => {
        gsap.to(layer, {
            opacity: 0,
            duration: 1.2,
            ease: 'power2.inOut',
            delay: index * 0.05,
            onComplete: () => {
                layer.style.backgroundImage = `url(assets/beach/${imageName}.png)`;
                gsap.to(layer, {
                    opacity: 1,
                    duration: 1.8,
                    ease: 'power2.out'
                });
            }
        });
    });
}

transitionToCafe() {
    console.log('Transitioning to Café scene');
    
    // Rain ambience fades in
    this.audioController.playAmbience('rain', 0.18, 4);
    
    // Fade out music
    if (this.audioController.currentMusic) {
        gsap.to(this.audioController.currentMusic, {
            volume: 0,
            duration: 3
        });
    }
    
    // Fade out waves
    this.audioController.fadeOutAmbience('wave', 3);
    
    // Transition scene
    this.transitionTo('cafe', 3);
    
    setTimeout(() => {
        console.log('Café Scene ready for implementation (Phase 9)');
    }, 3000);
}
```

## Step 3: Delete Test Files

Delete these files:
- `beach-test.html`
- `js/beach-test.js`

## Done!

The Beach scene will now flow smoothly from Garden → Beach with all the tested features.
