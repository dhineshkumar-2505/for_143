// SceneManager.js - Central brain for scene choreography
// Handles scene transitions, timing, and state management

export class SceneManager {
    constructor(audioController) {
        this.audioController = audioController;
        this.particleSystem = null;
        this.currentScene = null;
        this.currentSceneId = null;
        this.gardenTapCount = 0;
        this.voiceHasCompletedOnce = false;
        this.voiceEventsBound = false;

        // Scene elements
        this.scenes = {
            garden: document.getElementById('scene-garden'),
            beach: document.getElementById('scene-beach'),
            cafe: document.getElementById('scene-cafe'),
            taj: document.getElementById('scene-taj'),
            hill: document.getElementById('scene-hill')
        };

        this.textOverlay = document.getElementById('text-overlay');

        // Simple footstep helper bound to this instance
        this.playFootstep = (durationSeconds = 1.2) => {
            if (!this.audioController) return;
            this.audioController.playSFX('footstep', 0.4);
        };

        console.log('SceneManager initialized');
    }

    /**
     * Set particle system reference
     */
    setParticleSystem(particleSystem) {
        this.particleSystem = particleSystem;
    }

    /**
     * Start the main experience (called after splash screen)
     * Begins with Scene 1: Garden - Comfort & Nostalgia
     */
    startExperience() {
        console.log('Starting main experience - Scene 1: Garden');

        // Transition to garden (2 second fade-in)
        this.transitionTo('garden', 2);

        // Start soft piano music (35% volume)
        this.audioController.playMusic('piano', 0.35, 2.5);

        // Activate petal particles
        if (this.particleSystem) {
            this.particleSystem.setMode('petals');
        }

        // Initialize Garden scene with emotional script
        setTimeout(() => {
            this.initGardenScene();
        }, 2000);
    }

    /**
     * GARDEN SCENE - Director's Cut
     * Emotional pacing, psychological timing, warmth building
     */
    initGardenScene() {
        const gardenScene = this.scenes.garden;
        const layers = gardenScene.querySelectorAll('.layer');

        // Set initial background image (Garden Image 1)
        layers.forEach(layer => {
            layer.style.backgroundImage = 'url(assets/garden/gar_01.png)';
        });

        // Enable continuous parallax and ambient animations
        this.enableCinematicParallax(gardenScene);
        this.enableAmbientDepthAnimation(layers);

        // Start Garden Image 1 sequence
        this.gardenImage1(layers);
    }

    /**
     * Garden Image 1 - Opening & Emotional Hook
     */
    gardenImage1(layers) {
        const timeline = gsap.timeline();

        // No buttons yet. She only watches.
        // Text appears lower center, one line at a time.

        timeline.call(() => {
            this.showText('"How are you… Sindhu?"', 5000);
        }, null, 1);

        timeline.to({}, { duration: 7 }); // Line + 2s pause

        timeline.call(() => {
            this.showText('"It\'s been four years already…"', 5000);
        });

        timeline.to({}, { duration: 8 }); // Line + 3s pause

        timeline.call(() => {
            this.showText('"We didn\'t have many moments…\nbut the small ones meant a lot to me."', 7000);
        });

        timeline.to({}, { duration: 10 }); // Line + pause (important: do NOT rush)

        // Camera slowly moves forward (subtle zoom, 8 seconds)
        timeline.to(layers, {
            scale: 1.08,
            duration: 8,
            ease: 'power1.inOut',
            stagger: 0.1
        });

        // Transition to Garden Image 2
        timeline.call(() => {
            this.gardenImage2(layers);
        });
    }

    /**
     * Garden Image 2 - Wondering & Care
     */
    gardenImage2(layers) {
        const timeline = gsap.timeline();

        // Gentle transition (no hard cut)
        timeline.call(() => {
            this.transitionGardenImage(layers, 'gar_02');
        });

        timeline.to({}, { duration: 4 }); // Wait for transition

        timeline.call(() => {
            this.showText('"I always wondered how you are now."', 5000);
        });

        timeline.to({}, { duration: 7 }); // Line + 2s pause

        timeline.call(() => {
            this.showText('"I really hope you\'re happy."', 5000);
        });

        timeline.to({}, { duration: 7 }); // Line + 2s pause

        timeline.call(() => {
            this.showText('"I always imagined walking somewhere quiet with you…"', 6000);
        });

        timeline.to({}, { duration: 9 }); // Line + 3s pause

        timeline.call(() => {
            this.showText('"I couldn\'t…"', 4000);
        });

        timeline.to({}, { duration: 5.5 }); // Line + 1.5s pause

        timeline.call(() => {
            this.showText('"So I made this instead."', 6000);
        });

        // This line is very powerful — keep silence 4 seconds after it
        timeline.to({}, { duration: 10 });

        // Transition to Garden Image 3
        timeline.call(() => {
            this.gardenImage3(layers);
        });
    }

    /**
     * Garden Image 3 - Emotional Warmth
     */
    gardenImage3(layers) {
        const timeline = gsap.timeline();

        // Gentle transition
        timeline.call(() => {
            this.transitionGardenImage(layers, 'gar_03');
        });

        // Brightness slightly warms (color grading)
        timeline.to(this.scenes.garden, {
            duration: 3,
            filter: 'brightness(1.1) saturate(1.15)',
            ease: 'power2.inOut'
        }, "+=1");

        timeline.to({}, { duration: 4 });

        timeline.call(() => {
            this.showText('"I just wanted you to feel something…"', 5000);
        });

        timeline.to({}, { duration: 7 }); // Line + 2s pause

        timeline.call(() => {
            this.showText('"Even if it\'s only through a screen."', 6000);
        });

        timeline.to({}, { duration: 9 }); // Line + 3s pause

        timeline.call(() => {
            this.showText('"If it feels silly…"', 4000);
        });

        timeline.to({}, { duration: 5.5 }); // Line + 1.5s pause

        timeline.call(() => {
            this.showText('"please adjust for me."', 5000);
        });

        // Do not add anything after this line. Let it breathe.
        timeline.to({}, { duration: 8 });

        // Petals slightly increase
        timeline.call(() => {
            if (this.particleSystem) {
                this.particleSystem.burst(10); // Add more petals
            }
        });

        timeline.to({}, { duration: 5 });

        // Transition to Garden Image 4
        timeline.call(() => {
            this.gardenImage4(layers);
        });
    }

    /**
     * Garden Image 4 - Movement & Invitation
     */
    gardenImage4(layers) {
        const timeline = gsap.timeline();

        // Gentle transition with footstep sound
        timeline.call(() => {
            this.transitionGardenImage(layers, 'gar_04');
            this.audioController.playSFX('footstep', 0.4);
        });

        // Wind ambience slightly increases
        timeline.call(() => {
            this.audioController.playAmbience('wind', 0.22, 2);
        }, null, 1);

        timeline.to({}, { duration: 5 });

        timeline.call(() => {
            this.showText('"We\'re going somewhere special…"', 5000);
        });

        timeline.to({}, { duration: 7 }); // Line + 2s pause

        timeline.call(() => {
            this.showText('"You always liked it."', 5000);
        });

        timeline.to({}, { duration: 7 }); // Line + 2s pause

        timeline.call(() => {
            this.showText('"Come with me?"', 5000);
        });

        timeline.to({}, { duration: 5 });

        // Show Continue button
        timeline.call(() => {
            this.showContinueButton(() => {
                this.gardenImage5(layers);
            });
        });
    }

    /**
     * Garden Image 5 - Transition to Beach
     */
    gardenImage5(layers) {
        const timeline = gsap.timeline();

        // Walking animation (Ken Burns zoom + parallax)
        timeline.call(() => {
            this.transitionGardenImage(layers, 'gar_05');
            this.audioController.playSFX('footstep', 0.4);
        });

        // Zoom forward
        timeline.to(layers, {
            scale: 1.15,
            duration: 6,
            ease: 'power1.inOut',
            stagger: 0.15
        });

        timeline.to({}, { duration: 4 });

        // Orange light appears in distance (color shift)
        timeline.to(this.scenes.garden, {
            duration: 3,
            filter: 'sepia(0.2) saturate(1.3) brightness(1.05)',
            ease: 'power2.inOut'
        });

        // Waves slowly fade in
        timeline.call(() => {
            this.audioController.playAmbience('wave', 0.15, 4);
        }, null, 1);

        // Piano lowers
        timeline.call(() => {
            if (this.audioController.currentMusic) {
                gsap.to(this.audioController.currentMusic, {
                    volume: 0.2,
                    duration: 3
                });
            }
        });

        timeline.to({}, { duration: 5 });

        // Final garden lines
        timeline.call(() => {
            this.showText('"You always liked the sea…"', 5000);
        });

        timeline.to({}, { duration: 7 }); // Line + 2s pause

        timeline.call(() => {
            this.showText('"It feels peaceful, right?"', 6000);
        });

        timeline.to({}, { duration: 9 }); // Line + 3s pause

        timeline.call(() => {
            this.showText('"I wanted to sit there with you…"', 5000);
        });

        timeline.to({}, { duration: 7 }); // Line + 2s pause

        timeline.call(() => {
            this.showText('"At least once."', 5000);
        });

        timeline.to({}, { duration: 8 });

        // Screen slowly fades while wave sound replaces wind
        timeline.call(() => {
            this.audioController.fadeOutAmbience('wind', 3);
        });

        timeline.to({}, { duration: 5 });

        // Transition to Beach scene
        timeline.call(() => {
            this.transitionToBeach();
        });
    }

    /**
     * Shared helper: smooth crossfade between layered images
     * Avoids full black frames by overlapping old/new imagery.
     */
    smoothLayerImageTransition(layers, folder, imageName) {
        layers.forEach((layer, index) => {
            const parent = layer.parentNode;
            if (!parent) return;

            // Clone the layer as an overlay with the NEXT image
            const overlay = layer.cloneNode(false);
            overlay.style.backgroundImage = `url(assets/${folder}/${imageName}.png)`;
            overlay.style.opacity = 0;
            overlay.style.pointerEvents = 'none';

            parent.insertBefore(overlay, layer.nextSibling);

            // Crossfade: old layer out while new overlay comes in
            gsap.to(overlay, {
                opacity: 1,
                duration: 1.4,
                ease: 'power2.out',
                delay: index * 0.05
            });

            gsap.to(layer, {
                opacity: 0,
                duration: 1.2,
                ease: 'power2.inOut',
                delay: index * 0.05,
                onComplete: () => {
                    // Commit new image to original layer and remove overlay
                    layer.style.backgroundImage = overlay.style.backgroundImage;
                    layer.style.opacity = 1;
                    overlay.remove();
                }
            });
        });
    }

    /**
     * Smooth image transition for Garden scene
     */
    transitionGardenImage(layers, imageName) {
        this.smoothLayerImageTransition(layers, 'garden', imageName);
    }

    /**
     * Show Continue button with callback
     */
    showContinueButton(callback) {
        // Create button if it doesn't exist
        let continueBtn = document.getElementById('continue-btn');
        if (!continueBtn) {
            continueBtn = document.createElement('button');
            continueBtn.id = 'continue-btn';
            continueBtn.textContent = 'Continue →';
            continueBtn.className = 'continue-btn';
            document.getElementById('experience').appendChild(continueBtn);
        }

        // Show button
        gsap.to(continueBtn, {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power2.out'
        });

        // Click handler
        continueBtn.onclick = () => {
            gsap.to(continueBtn, {
                opacity: 0,
                scale: 0.9,
                duration: 0.5,
                onComplete: callback
            });
        };
    }


    /**
     * Enable continuous cinematic parallax (fake 3D depth)
     * Optimized: Updates only on mouse/touch move to save battery/CPU
     * Now enabled on ALL screen sizes for lively mobile experience
     */
    enableCinematicParallax(scene) {
        const layers = scene.querySelectorAll('.layer');
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        // Smooth interaction wrapper
        const handleMove = (e) => {
            const clientX = e.clientX || (e.touches && e.touches[0].clientX);
            const clientY = e.clientY || (e.touches && e.touches[0].clientY);

            if (clientX === undefined) return; // invalid event

            const deltaX = (clientX - centerX) / centerX;
            const deltaY = (clientY - centerY) / centerY;

            layers.forEach(layer => {
                const depth = parseFloat(layer.getAttribute('data-depth')) || 0.5;
                // Reduced movement on mobile for better performance
                const movementScale = window.innerWidth < 768 ? 15 : 30;
                const moveX = deltaX * depth * movementScale;
                const moveY = deltaY * depth * movementScale;

                // GSAP handles smoothing elegantly
                gsap.to(layer, {
                    x: moveX,
                    y: moveY,
                    duration: 1.5,
                    ease: 'power2.out',
                    overwrite: 'auto' // Important: Kill previous tweens
                });
            });
        };

        // Add listeners
        window.addEventListener('mousemove', handleMove);
        window.addEventListener('touchmove', handleMove, { passive: true });
    }

    /**
     * Enable ambient depth animations (breathing, swaying)
     * Enhanced for mobile to create lively, cinematic feel
     */
    enableAmbientDepthAnimation(layers) {
        const isMobile = window.innerWidth < 768;

        layers.forEach((layer, index) => {
            const depth = parseFloat(layer.getAttribute('data-depth')) || 0.5;

            // Subtle breathing scale animation (more pronounced on mobile)
            const scaleAmount = isMobile ? 1 + (depth * 0.04) : 1 + (depth * 0.02);
            gsap.to(layer, {
                scale: scaleAmount,
                duration: 3 + (index * 0.5),
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });

            // Subtle swaying rotation (more pronounced on mobile)
            const rotationAmount = isMobile ? (depth - 0.5) * 1.2 : (depth - 0.5) * 0.5;
            gsap.to(layer, {
                rotation: rotationAmount,
                duration: 4 + (index * 0.3),
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });

            // Add gentle floating motion on mobile
            if (isMobile) {
                gsap.to(layer, {
                    y: `+=${depth * 8}`,
                    duration: 5 + (index * 0.4),
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut'
                });
            }
        });
    }

    /**
     * Transition to Beach scene
     */
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
            this.initBeachScene();
        }, 2000);
    }

    /**
     * Enable parallax effect on scene
     */
    enableParallax(scene) {
        const layers = scene.querySelectorAll('.layer');

        // Mouse/touch move handler
        const handleMove = (e) => {
            const x = e.clientX || (e.touches && e.touches[0].clientX) || window.innerWidth / 2;
            const y = e.clientY || (e.touches && e.touches[0].clientY) || window.innerHeight / 2;

            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;

            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;

            layers.forEach(layer => {
                const depth = parseFloat(layer.getAttribute('data-depth')) || 0.5;
                const moveX = deltaX * depth * 20;
                const moveY = deltaY * depth * 20;

                gsap.to(layer, {
                    x: moveX,
                    y: moveY,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            });
        };

        window.addEventListener('mousemove', handleMove);
        window.addEventListener('touchmove', handleMove);
    }




    /**
     * Scene transition logic
     * @param {string} sceneId - Scene to transition to
     * @param {number} duration - Transition duration in seconds
     */
    transitionTo(sceneId, duration = 2.5) {
        const newScene = this.scenes[sceneId];
        if (!newScene) {
            console.error(`Scene ${sceneId} not found`);
            return;
        }

        // Fade out current scene
        if (this.currentScene) {
            gsap.to(this.currentScene, {
                duration: duration,
                opacity: 0,
                ease: 'power2.inOut',
                onComplete: () => {
                    this.currentScene.classList.remove('active');
                }
            });
        }

        // Fade in new scene
        newScene.classList.add('active');
        gsap.to(newScene, {
            duration: duration,
            opacity: 1,
            ease: 'power2.inOut'
        });

        this.currentScene = newScene;
        this.currentSceneId = sceneId;
        console.log(`Transitioned to scene: ${sceneId}`);
    }

    /**
     * High-level scene navigation helper
     * Ensures all scene jumps go through a single, well-timed entry point.
     */
    goToScene(sceneId) {
        switch (sceneId) {
            case 'garden':
                this.transitionTo('garden', 2);
                setTimeout(() => this.initGardenScene(), 2000);
                break;
            case 'beach':
                this.transitionToBeach();
                break;
            case 'cafe':
                this.transitionToCafe();
                break;
            case 'taj':
                this.transitionToTaj();
                break;
            case 'hill':
                // Taj ➜ Hilltop final act
                this.transitionToHilltop();
                break;
            default:
                console.warn(`goToScene: unknown sceneId "${sceneId}"`);
        }
    }

    /**
     * Text display with auto-fade (Garden style)
     * @param {string} message - Text to display
     * @param {number} duration - Optional manual duration
     */
    showText(message, duration = null) {
        if (!this.textOverlay) return;

        // Kill any running GSAP animations on the overlay
        gsap.killTweensOf(this.textOverlay);

        // Calculate natural reading time
        const plain = (message || '').replace(/<[^>]+>/g, '');
        const baseMs = 5000;
        const perChar = 80;
        const autoDuration = baseMs + plain.length * perChar;
        const showDuration = duration !== null ? duration : autoDuration;

        // Clear any previous "tap to continue" handler
        if (this._textTapHandler) {
            this.textOverlay.removeEventListener('click', this._textTapHandler);
            this._textTapHandler = null;
        }

        // Fade out old text (fast), then show new
        const tl = gsap.timeline();

        tl.to(this.textOverlay, {
            duration: 0.3,
            opacity: 0,
            ease: 'power2.in',
            onComplete: () => {
                this.textOverlay.textContent = message;
            }
        });

        tl.to(this.textOverlay, {
            duration: 0.8,
            opacity: 1,
            ease: 'power2.out'
        });

        // Auto fade-out after duration
        tl.to(this.textOverlay, {
            duration: 1,
            opacity: 0,
            ease: 'power2.in',
            delay: showDuration / 1000
        });

        // Manual skip (tap to hide)
        const tapHandler = () => {
            gsap.killTweensOf(this.textOverlay);
            gsap.to(this.textOverlay, {
                duration: 0.5,
                opacity: 0,
                ease: 'power2.in'
            });
            this.textOverlay.removeEventListener('click', tapHandler);
            this._textTapHandler = null;
        };
        this._textTapHandler = tapHandler;

        // Activate tap handler after a short delay
        setTimeout(() => {
            if (this._textTapHandler === tapHandler) {
                this.textOverlay.addEventListener('click', tapHandler);
            }
        }, 1500);
    }

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
            this.showText('"You remember this place…?"');
        });
        timeline.to({}, { duration: 9 });

        timeline.call(() => {
            this.showText('"I came here again recently."');
        });
        timeline.to({}, { duration: 9 });

        timeline.call(() => {
            this.showText('"Besant Nagar still looks the same."');
        });
        timeline.to({}, { duration: 10 });

        timeline.call(() => {
            this.showText('"Only one thing felt different."');
        });
        timeline.to({}, { duration: 10 });

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

        timeline.to({}, { duration: 4 });

        timeline.call(() => {
            this.showText('"I used to imagine… you walking beside me."');
        });
        timeline.to({}, { duration: 10 });

        timeline.call(() => {
            this.showText('"I even sat in our usual kind of spot."');
        });
        timeline.to({}, { duration: 10 });

        timeline.call(() => {
            this.showText('"But this time… you weren\'t there."');
        });
        timeline.to({}, { duration: 10 });

        timeline.call(() => {
            this.showText('"Maybe… it was just me."');
        });
        timeline.to({}, { duration: 9 });

        timeline.call(() => {
            this.beachImage3(layers);
        });
    }

    beachImage3(layers) {
        const timeline = gsap.timeline();

        timeline.call(() => {
            this.transitionBeachImage(layers, 'beach_03');
        });
        timeline.to({}, { duration: 5 });

        timeline.call(() => {
            this.showText('"Time passed…"');
        });
        timeline.to({}, { duration: 8 });

        timeline.call(() => {
            this.showText('"We stopped talking."');
        });
        timeline.to({}, { duration: 9 });

        timeline.call(() => {
            this.showText('"And I thought maybe… that was the end of our story."');
        });
        timeline.to({}, { duration: 11 });

        timeline.call(() => {
            this.showText('"But somehow… it never felt finished."');
        });
        timeline.to({}, { duration: 10 });

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

        timeline.to({}, { duration: 5 });

        timeline.call(() => {
            this.showText('"You might wonder why I came back like this."');
        });
        timeline.to({}, { duration: 10 });

        timeline.call(() => {
            this.showText('"I didn\'t come to disturb your life."');
        });
        timeline.to({}, { duration: 9 });

        timeline.call(() => {
            this.showText('"I came because some feelings didn\'t fade."');
        });
        timeline.to({}, { duration: 10 });

        timeline.call(() => {
            this.showText('"We used to walk along this beach."');
        });
        timeline.to({}, { duration: 9 });

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
            this.showText('"I don\'t know what the future holds."');
        });
        timeline.to({}, { duration: 9 });

        timeline.call(() => {
            this.showText('"I don\'t even know if I\'ll get another chance like this."');
        });
        timeline.to({}, { duration: 11 });

        timeline.call(() => {
            this.showText('"But I didn\'t want to stay silent forever."');
        });
        timeline.to({}, { duration: 10 });

        timeline.call(() => {
            this.showText('"So I made this… just to tell you honestly."');
        });
        timeline.to({}, { duration: 10 });

        timeline.call(() => {
            this.showText('"You still matter to me."');
        });
        timeline.to({}, { duration: 9 });

        timeline.call(() => {
            this.showText('"Shall we go somewhere else?"');
        });
        timeline.to({}, { duration: 9 });

        timeline.call(() => {
            this.showContinueButton(() => {
                this.transitionToCafe();
            }, "Let's go →");
        });
    }

    transitionBeachImage(layers, imageName) {
        this.smoothLayerImageTransition(layers, 'beach', imageName);
    }

    transitionToCafe() {
        console.log('Transitioning to Café scene');

        // Rain ambience fades in
        this.audioController.playAmbience('rain', 0.25, 3);

        // Fade out music
        if (this.audioController.currentMusic) {
            gsap.to(this.audioController.currentMusic, {
                volume: 0,
                duration: 3
            });
        }

        // Fade out all previous ambiences
        this.audioController.fadeOutAmbience('wave', 3);
        this.audioController.fadeOutAmbience('wind', 3);

        // Transition scene
        this.transitionTo('cafe', 3);

        // Initialize Café Scene (Phase 9)
        setTimeout(() => {
            this.initCafeScene();
        }, 3000);
    }
    /**
     * CAFÉ SCENE (Phase 9) - Emotional Core
     * "I love you" confession + Voice Note
     */
    initCafeScene() {
        console.log('Initializing Café Scene...');
        const cafeScene = this.scenes.cafe;
        const layers = cafeScene.querySelectorAll('.layer');

        // Set initial background image (Exterior)
        layers.forEach(layer => {
            layer.style.backgroundImage = 'url(assets/cafe/cafe_01.png)';
        });

        // Enable cinematic parallax
        this.enableCinematicParallax(cafeScene);

        // Start rain ambience (works whether skipping or coming from Beach)
        this.audioController.playAmbience('rain', 0.25, 2);

        // Start Café Exterior Sequence
        setTimeout(() => {
            this.cafeExterior(layers);
        }, 2000);
    }

    /**
     * Scene 1 - Outside Café (cafe_01)
     * "DKS Cafe" meaning
     */
    cafeExterior(layers) {
        const timeline = gsap.timeline();

        timeline.call(() => {
            this.showText('"The waves… the lights… the evenings."');
        });
        timeline.to({}, { duration: 10 });

        timeline.call(() => {
            this.showText('"I didn\'t feel like going home."');
        });
        timeline.to({}, { duration: 9 });

        timeline.call(() => {
            this.showText('"So I stopped somewhere."');
        });
        timeline.to({}, { duration: 9 });

        timeline.call(() => {
            this.showText('"This place…"');
        });
        timeline.to({}, { duration: 8 });

        timeline.call(() => {
            this.showText('"I always liked quiet places like this."');
        });
        timeline.to({}, { duration: 7 });

        timeline.call(() => {
            this.showText('"Somewhere you can sit… and just think."', 16000);
        });
        timeline.to({}, { duration: 10 });

        timeline.call(() => {
            this.showText('"Did you notice the name?"', 14000);
        });
        timeline.to({}, { duration: 9 });

        timeline.call(() => {
            this.showText('"DKS."', 12000);
        });
        timeline.to({}, { duration: 7 });

        timeline.call(() => {
            this.showText('"Dhinesh… and Sindhu."', 16000);
        });
        timeline.to({}, { duration: 9 });

        timeline.call(() => {
            this.showText('"I guess… I wanted a world where we existed together."', 20000);
        });
        timeline.to({}, { duration: 11 });

        // Transition to Inside
        timeline.call(() => {
            this.cafeInterior(layers);
        });
    }

    /**
     * Scene 2 - Inside Table (cafe_02)
     * The Napkin Reveal
     */
    cafeInterior(layers) {
        const timeline = gsap.timeline();

        // Transition to interior image
        timeline.call(() => {
            this.transitionCafeImage(layers, 'cafe_02');
            // Start soft love piano inside the café, crossfading with rain
            this.audioController.playMusic('love_piano', 0.25, 3);
        });

        // Initial silence
        timeline.to({}, { duration: 7 });

        timeline.call(() => {
            this.showText('"There were many things I wanted to say to you."', 16000);
        });
        timeline.to({}, { duration: 8 });

        timeline.call(() => {
            this.showText('"But messages never felt right."', 16000);
        });
        timeline.to({}, { duration: 7 });

        timeline.call(() => {
            this.showText('"So I left you a small clue."', 16000);
        });
        timeline.to({}, { duration: 8 });

        timeline.call(() => {
            this.showText('"Look at the table."', 14000);
        });

        timeline.to({}, { duration: 8 });

        timeline.call(() => {
            this.showText('"I think you already saw it."', 16000);
        });
        timeline.to({}, { duration: 8 });

        timeline.call(() => {
            this.showText('"I love you, Sindhu."', 20000);
        });

        // Screen darkens slightly
        timeline.to(this.scenes.cafe, {
            filter: 'brightness(0.6)',
            duration: 3
        }, "+=1");

        timeline.to({}, { duration: 10 });

        // Voice Message Setup
        timeline.call(() => {
            this.showText('"But these words… shouldn\'t just be read."', 16000);
        });
        timeline.to({}, { duration: 10 });

        timeline.call(() => {
            this.showText('"They should be heard."', 14000);
        });
        timeline.to({}, { duration: 8 });

        timeline.call(() => {
            this.showText('"So… I recorded something for you."', 16000);
        });

        timeline.to({}, { duration: 9 });

        // Show Radio Player
        timeline.call(() => {
            this.showRadioPlayer();
        });
    }

    /**
     * Show Radio Player UI
     */
    showRadioPlayer() {
        // Create player if not exists
        let player = document.getElementById('radio-player');
        if (!player) {
            player = document.createElement('div');
            player.id = 'radio-player';
            player.innerHTML = `
                <div class="player-title">A message for you</div>
                <div class="player-controls">
                    <button id="voice-btn" class="voice-toggle"><span>▶</span></button>
                    <div class="player-timeline">
                        <span id="voice-current">0:00</span>
                        <input id="voice-seek" type="range" min="0" max="100" step="0.1" />
                        <span id="voice-duration">0:00</span>
                    </div>
                </div>
                <div class="player-hint">Tap whenever you're ready</div>
                <button id="replay-btn" class="hidden">↺ Listen again</button>
                <button id="next-place-btn" class="hidden">Next place →</button>
            `;
            document.getElementById('experience').appendChild(player);

            // Play button logic
            const playBtn = player.querySelector('#voice-btn');
            playBtn.onclick = () => {
                this.playVoiceMessage(playBtn);
            };

            // Replay button logic: hard-reset audio to start but keep Continue visible
            const replayBtn = player.querySelector('#replay-btn');
            replayBtn.onclick = () => {
                if (this.currentVoice) {
                    this.currentVoice.currentTime = 0;
                    this.currentVoice.play().catch(() => { });
                } else {
                    this.playVoiceMessage(playBtn, true);
                }
            };

            // Next button logic (Continue to Taj) – will be revealed after first full listen
            const nextBtn = player.querySelector('#next-place-btn');
            nextBtn.onclick = () => {
                this.transitionToTaj();
            };
        }

        // Fade in player
        gsap.to(player, {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: 'power2.out'
        });
    }

    /**
     * Play Voice Message Logic
     */
    playVoiceMessage(btn, isReplay = false) {
        const player = document.getElementById('radio-player');
        const hint = player.querySelector('.player-hint');
        const replayBtn = player.querySelector('#replay-btn');
        const nextBtn = player.querySelector('#next-place-btn');
        const seek = player.querySelector('#voice-seek');
        const curLabel = player.querySelector('#voice-current');
        const durLabel = player.querySelector('#voice-duration');

        // Check if voice is already playing and toggle pause/resume
        if (this.currentVoice && !this.currentVoice.paused) {
            // Pause
            this.currentVoice.pause();
            btn.innerHTML = '<span>▶</span>';
            return;
        } else if (this.currentVoice && this.currentVoice.paused && this.currentVoice.currentTime > 0) {
            // Resume
            this.currentVoice.play();
            btn.innerHTML = '<span>❚❚</span>';
            return;
        }

        // UI updates for new playback
        btn.style.pointerEvents = 'auto'; // Keep enabled for pause
        hint.style.opacity = 0;

        if (isReplay) {
            replayBtn.style.opacity = 0.5;
            replayBtn.style.pointerEvents = 'none';
        } else {
            btn.innerHTML = '<span>❚❚</span>'; // Pause icon
        }

        // Lower rain volume
        this.audioController.playAmbience('rain', 0.05, 2);

        // Fade out café love piano (or any current music) so the recorded
        // voice becomes the only focus while it is playing.
        if (this.audioController.currentMusic) {
            gsap.to(this.audioController.currentMusic, {
                volume: 0,
                duration: 1.5,
                onComplete: () => {
                    // Do not auto-stop; just keep it muted for this scene.
                }
            });
        }

        // Zoom in to table (intimacy)
        const layers = this.scenes.cafe.querySelectorAll('.layer');
        gsap.to(layers, {
            scale: 1.2,
            duration: 10,
            ease: 'power1.inOut'
        });

        // Ensure we have a single persistent Audio instance
        if (!this.currentVoice) {
            console.log('Playing personal voice message...');
            let voicePath = this.audioController.audioFiles.voice.message;

            // Load audio as Blob URL so seeking works without Range request support
            this.currentVoice = new Audio();
            this.currentVoice.preload = 'auto';
            this.voiceLoading = true;

            fetch(voicePath)
                .then(response => response.blob())
                .then(blob => {
                    const blobUrl = URL.createObjectURL(blob);
                    this.currentVoice.src = blobUrl;
                    this.voiceLoading = false;
                    console.log('✓ Audio loaded as Blob URL - seeking will work!');
                })
                .catch(err => {
                    console.error('Failed to load audio as blob, falling back:', err);
                    this.currentVoice.src = voicePath;
                    this.voiceLoading = false;
                });
        }

        // Bind audio events ONLY ONCE (avoid stacking)
        if (!this.voiceEventsBound) {
            this.voiceEventsBound = true;
            this.isSeekingVoice = false; // Instance property for seek state

            if (seek) {
                // Metadata → set slider range and total duration
                this.currentVoice.addEventListener('loadedmetadata', () => {
                    const total = this.currentVoice.duration || 0;
                    durLabel.textContent = this._formatTime(total);
                    seek.min = 0;
                    seek.max = total;
                    seek.step = 0.01;
                });

                // Simple approach: Update label during drag, seek on release
                seek.addEventListener('input', (e) => {
                    if (!this.currentVoice.duration) return;
                    this.isSeekingVoice = true;
                    const newTime = parseFloat(e.target.value);
                    curLabel.textContent = this._formatTime(newTime);
                });

                // Seek when user releases (change event)
                seek.addEventListener('change', (e) => {
                    if (!this.currentVoice.duration) return;

                    const newTime = parseFloat(e.target.value);
                    const wasPlaying = !this.currentVoice.paused;

                    console.log(`Seeking to ${this._formatTime(newTime)}`);

                    // Pause, seek, resume
                    if (wasPlaying) this.currentVoice.pause();
                    this.currentVoice.currentTime = newTime;
                    console.log(`currentTime set to: ${this.currentVoice.currentTime}`);

                    if (wasPlaying) {
                        this.currentVoice.play()
                            .then(() => console.log(`✓ Playing from ${this._formatTime(this.currentVoice.currentTime)}`))
                            .catch(err => console.error('Play failed:', err));
                    }

                    this.isSeekingVoice = false;
                });

                // Update slider while audio plays (only if user is not seeking)
                this.currentVoice.addEventListener('timeupdate', () => {
                    if (!this.currentVoice.duration || this.isSeekingVoice) return;
                    const cur = this.currentVoice.currentTime || 0;
                    seek.value = cur;
                    curLabel.textContent = this._formatTime(cur);
                });
            } else {
                // Still update duration label even without seek bar
                this.currentVoice.addEventListener('loadedmetadata', () => {
                    const total = this.currentVoice.duration || 0;
                    durLabel.textContent = this._formatTime(total);
                });
            }
        }

        // Start playback only if currently paused
        if (this.currentVoice.paused) {
            this.currentVoice.volume = 0;
            this.currentVoice.play().catch(e => console.error("Voice play failed", e));

            gsap.to(this.currentVoice, {
                volume: 1,
                duration: 1
            });
        }

        // When finished
        this.currentVoice.onended = () => {
            btn.innerHTML = '<span>▶</span>';
            btn.style.pointerEvents = 'auto';

            // Replay is always allowed
            replayBtn.classList.remove('hidden');
            gsap.to(replayBtn, {
                opacity: 1,
                pointerEvents: 'auto',
                duration: 0.8
            });

            // After the FIRST full listen, reveal "Continue" and keep it visible
            if (!this.voiceHasCompletedOnce) {
                this.voiceHasCompletedOnce = true;
                nextBtn.classList.remove('hidden');
                gsap.to(nextBtn, {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    ease: 'power2.out'
                });
                this.showText('"There\'s somewhere else I want to take you."', 7000);
            }
        };
    }

    _formatTime(seconds) {
        const s = Math.floor(seconds || 0);
        const m = Math.floor(s / 60);
        const rem = s % 60;
        return `${m}:${rem.toString().padStart(2, '0')}`;
    }

    /**
     * Sequence after voice note ends
     */
    postVoiceSequence(nextBtn) {
        const timeline = gsap.timeline();

        timeline.call(() => {
            this.showText('"That\'s all."');
        });
        timeline.to({}, { duration: 8 });

        timeline.call(() => {
            this.showText('"Not perfect words…"');
        });
        timeline.to({}, { duration: 8 });

        timeline.call(() => {
            this.showText('"Just me… and old memories."');
        });
        timeline.to({}, { duration: 9 });

        // Show Next Button
        timeline.call(() => {
            nextBtn.classList.remove('hidden');
            gsap.to(nextBtn, {
                opacity: 1,
                y: 0,
                duration: 1.5,
                ease: 'power2.out'
            });

            this.showText('"There\'s somewhere else I want to take you."');
        });
    }

    /**
     * DEBUG: Skip directly to voice message player
     * Used by keyboard shortcut 'V'
     */
    skipToVoicePlayer() {
        console.log('Skipping directly to voice message player...');
        const cafeScene = this.scenes.cafe;
        const layers = cafeScene.querySelectorAll('.layer');

        // Set café interior image immediately
        layers.forEach(layer => {
            layer.style.backgroundImage = 'url(assets/cafe/cafe_02.png)';
        });

        // Enable parallax
        this.enableCinematicParallax(cafeScene);

        // Start rain and love piano
        this.audioController.playAmbience('rain', 0.25, 1);
        this.audioController.playMusic('love_piano', 0.25, 2);

        // Darken scene slightly
        gsap.to(cafeScene, {
            filter: 'brightness(0.6)',
            duration: 2
        });

        // Show voice player after 2 seconds
        setTimeout(() => {
            this.showRadioPlayer();
        }, 2000);
    }


    /**
     * Transition to Taj Mahal (Phase 10)
     */
    transitionToTaj() {
        console.log('Transitioning to Taj Mahal scene');

        // FORCE STOP voice audio
        if (this.currentVoice) {
            this.currentVoice.pause();
            this.currentVoice.currentTime = 0;
        }

        // Fade out UI - Handle multiple elements safely
        const player = document.getElementById('radio-player');
        const napkin = document.getElementById('napkin');

        // Robust removal
        const elementsToRemove = [];
        if (player) elementsToRemove.push(player);
        if (napkin) elementsToRemove.push(napkin);

        if (elementsToRemove.length > 0) {
            gsap.to(elementsToRemove, {
                opacity: 0,
                duration: 1,
                onComplete: () => {
                    if (player) player.remove();
                    if (napkin) napkin.style.display = 'none';
                }
            });
        }

        // Fade out rain
        if (this.audioController.currentAmbience['rain']) {
            this.audioController.fadeOutAmbience('rain', 3);
        }

        // Start romantic taj piano music - DELAYED to "Today is February 14" moment
        // this.audioController.playMusic('taj_piano', 0.35, 3);

        // Scene transition
        this.transitionTo('taj', 3);

        setTimeout(() => {
            this.initTajScene();
        }, 3000);
    }

    /**
     * TAJ MAHAL SCENE (Phase 10) - Promise Moment
     * Gentle romantic scene with Valentine's wish
     */
    initTajScene() {
        console.log('Initializing Taj Mahal Scene...');
        const tajScene = this.scenes.taj;
        const layers = tajScene.querySelectorAll('.layer');

        // Set initial background image (Arrival)
        layers.forEach(layer => {
            layer.style.backgroundImage = 'url(assets/taj/taj_01.png)';
        });

        // Enable cinematic parallax
        this.enableCinematicParallax(tajScene);

        // Music will start during ring moment (not now)

        // Start with 7s silence (awe moment)
        setTimeout(() => {
            this.tajArrival(layers);
        }, 7000);
    }

    /**
     * Image 1 - Arrival (taj_01)
     * "I once told you..."
     */
    tajArrival(layers) {
        const timeline = gsap.timeline();

        timeline.call(() => {
            this.showText('"I once told you…"');
        });
        timeline.to({}, { duration: 9 });

        timeline.call(() => {
            this.showText('"naa unna oru naal Tajmahal kuptu poren sindhu nu...."');
        });
        timeline.to({}, { duration: 10 });

        timeline.call(() => {
            this.showText('"In real life… mudiyala😔😔😔😔."');
        });
        timeline.to({}, { duration: 9 });

        timeline.call(() => {
            this.showText('"So… at least here… I wanted to💖💖💖💖."');
        });

        // Soft piano note (music is already playing, just a moment of recognition)
        timeline.to({}, { duration: 9 });

        // Transition to reflection view
        timeline.call(() => {
            this.tajReflection(layers);
        });
    }

    /**
     * Image 2 - Reflection (taj_02)
     * Playful moment
     */
    tajReflection(layers) {
        const timeline = gsap.timeline();

        // Transition image
        timeline.call(() => {
            this.transitionTajImage(layers, 'taj_02');
        });
        timeline.to({}, { duration: 4 });

        timeline.call(() => {
            this.showText('"Romba azhaga irukula sindhu..."', 14000);
        });
        timeline.to({}, { duration: 8 });

        timeline.call(() => {
            this.showText('"The Taj… and the moonlight…"', 16000);
        });
        timeline.to({}, { duration: 9 });

        // Playful line with emojis
        timeline.call(() => {
            this.showText('"But… un alavuku azhaga illai🙂😉😘..."', 16000);
        });
        timeline.to({}, { duration: 9 });

        // Transition to garden
        timeline.call(() => {
            this.tajGarden(layers);
        });
    }

    /**
     * Image 3 - Side Garden (taj_03)
     * Valentine's Day wish
     */
    tajGarden(layers) {
        const timeline = gsap.timeline();

        // Transition image
        timeline.call(() => {
            this.transitionTajImage(layers, 'taj_03');
        });
        timeline.to({}, { duration: 4 });

        // Music warmth increase (slightly increase volume)
        timeline.call(() => {
            if (this.audioController.currentMusic) {
                gsap.to(this.audioController.currentMusic, {
                    volume: 0.4,
                    duration: 2
                });
            }
        });

        timeline.call(() => {
            this.showText('"Sindhu…"');
        });
        timeline.to({}, { duration: 8 });

        timeline.call(() => {
            this.showText('"Today is February 14."');

            // Magical Glowing White Butterfly Effect
            this.createGlowingWhiteButterflies();

            // START TAJ PIANO MUSIC - Valentine's Day moment
            this.audioController.playMusic('taj_piano', 0.35, 3);
        });
        timeline.to({}, { duration: 9 });

        timeline.call(() => {
            this.showText('"Can I wish you…?"');
        });
        timeline.to({}, { duration: 4 });

        // Valentine's wish (smaller text, premium styling)
        timeline.call(() => {
            // Clear previous text immediately
            if (this.textOverlay) {
                gsap.to(this.textOverlay, { opacity: 0, duration: 0.5 });
            }

            const wish = document.createElement('div');
            wish.id = 'valentine-wish';
            wish.textContent = 'Happy Valentine\'s Day.';
            document.body.appendChild(wish);

            gsap.to(wish, {
                opacity: 1,
                duration: 1.5,
                ease: 'power2.out'
            });

            setTimeout(() => {
                gsap.to(wish, {
                    opacity: 0,
                    duration: 1,
                    delay: 2.5,
                    onComplete: () => wish.remove()
                });
            }, 100);
        });
        timeline.to({}, { duration: 9 });

        // Transition to ring moment
        timeline.call(() => {
            this.tajRing(layers);
        });
    }

    /**
     * Image 4 - Night Sky & Ring (taj_04)
     * Ring animation and final confession
     */
    tajRing(layers) {
        const timeline = gsap.timeline();

        // Transition to night sky image
        timeline.call(() => {
            this.transitionTajImage(layers, 'taj_04');
        });
        timeline.to({}, { duration: 4 });

        // Screen darkens slightly
        timeline.to(this.scenes.taj, {
            filter: 'brightness(0.7)',
            duration: 2
        });
        timeline.to({}, { duration: 2.5 });

        // Show ring emoji (simple and clean)
        timeline.call(() => {
            const ringDisplay = document.createElement('div');
            ringDisplay.id = 'ring-display';
            ringDisplay.innerHTML = '💍';
            ringDisplay.style.cssText = `
                position: fixed;
                top: 45%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: 6rem;
                opacity: 0;
                z-index: 1000;
                filter: drop-shadow(0 0 20px rgba(255, 215, 0, 0.6));
            `;
            document.body.appendChild(ringDisplay);

            // Fade in ring emoji
            gsap.fromTo(ringDisplay,
                { opacity: 0, scale: 0.5 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 1.5,
                    ease: 'back.out(1.7)'
                }
            );
            // Ring stays stationary (no pulse)
        });

        timeline.to({}, { duration: 2.5 });

        // Dialogue during ring animation
        timeline.call(() => {
            this.showText('"I don\'t know what the future will be…"', 16000);
        });
        timeline.to({}, { duration: 10 });

        timeline.call(() => {
            this.showText('"But I know one thing."', 14000);
        });
        timeline.to({}, { duration: 8 });

        timeline.call(() => {
            this.showText('"My feelings were always real and adhu epodhum irukum untill i die."', 20000);
        });
        timeline.to({}, { duration: 9 });

        // Final confession
        timeline.call(() => {
            this.showText('"With love… I love you, Sindhu."', 18000);
        });

        // Ring glows for 2s
        timeline.to({}, { duration: 10 });

        // Final Valentine's message
        timeline.call(() => {
            this.showText('Happy Valentine\'s Day ❤️❤️❤️❤️.');
        });
        timeline.to({}, { duration: 9 });

        // Show Valentine Proposal Popup
        timeline.call(() => {
            this.showValentineProposal();
        });

        // Music swell (already handled by existing music)

        // Fade ring and transition out
        timeline.call(() => {
            gsap.to('#ring-display', {
                opacity: 0,
                duration: 2,
                onComplete: () => {
                    const ring = document.getElementById('ring-display');
                    if (ring) ring.remove();
                }
            });
        });
        timeline.to({}, { duration: 5 });
    }

    /**
     * Helper: Smooth image transition for Taj
     */
    transitionTajImage(layers, imageName) {
        this.smoothLayerImageTransition(layers, 'taj', imageName);
    }

    /**
     * Helper: Spawn magical butterflies and insects
     * Creates 50 flying elements with natural wavy motion
     */
    createButterflies() {
        const amount = 50;
        const container = document.body;
        const types = ['🦋', '🦋', '🦋', '🐞', '✨', '🌸']; // Mostly butterflies

        for (let i = 0; i < amount; i++) {
            const fly = document.createElement('div');
            fly.textContent = types[Math.floor(Math.random() * types.length)];
            fly.style.cssText = `
                position: fixed;
                bottom: -50px;
                left: ${Math.random() * 100}vw;
                font-size: ${1.5 + Math.random() * 2}rem;
                opacity: 0;
                pointer-events: none;
                z-index: 2000;
                filter: hue-rotate(${Math.random() * 360}deg) drop-shadow(0 0 5px rgba(255,255,255,0.5));
                transform-origin: center;
            `;
            container.appendChild(fly);

            // Random flight path
            const duration = 5 + Math.random() * 4; // 5-9 seconds
            const xDistance = (Math.random() - 0.5) * 200; // Sway left/right
            const rotation = (Math.random() - 0.5) * 60; // Tilt

            // Main flight
            gsap.to(fly, {
                y: -window.innerHeight - 100, // Fly off top
                x: xDistance,
                rotation: rotation,
                duration: duration,
                ease: 'power1.out',
                delay: Math.random() * 2 // Stagger start
            });

            // Wavy motion (sine wave)
            gsap.to(fly, {
                x: `+=${50}`,
                duration: 2 + Math.random(),
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });

            // Fade in/out
            const tl = gsap.timeline();
            tl.to(fly, { opacity: 1, duration: 0.5 });
            tl.to(fly, {
                opacity: 0,
                duration: 1,
                delay: duration - 1.5,
                onComplete: () => fly.remove()
            });
        }
    }

    /**
     * Helper: Spawn glowing white butterflies (for Taj scene)
     * Creates 50 elegant white butterflies with glow effect
     */
    createGlowingWhiteButterflies() {
        const amount = 50;
        const container = document.body;

        for (let i = 0; i < amount; i++) {
            const fly = document.createElement('div');
            fly.textContent = '🦋';
            fly.style.cssText = `
                position: fixed;
                bottom: -50px;
                left: ${Math.random() * 100}vw;
                font-size: ${1.5 + Math.random() * 2}rem;
                opacity: 0;
                pointer-events: none;
                z-index: 2000;
                filter: brightness(3) contrast(0) drop-shadow(0 0 8px rgba(255,255,255,0.9)) drop-shadow(0 0 15px rgba(255,255,255,0.6));
                transform-origin: center;
            `;
            container.appendChild(fly);

            // Random flight path
            const duration = 5 + Math.random() * 4; // 5-9 seconds
            const xDistance = (Math.random() - 0.5) * 200; // Sway left/right
            const rotation = (Math.random() - 0.5) * 60; // Tilt

            // Main flight
            gsap.to(fly, {
                y: -window.innerHeight - 100, // Fly off top
                x: xDistance,
                rotation: rotation,
                duration: duration,
                ease: 'power1.out',
                delay: Math.random() * 2 // Stagger start
            });

            // Wavy motion (sine wave)
            gsap.to(fly, {
                x: `+=${50}`,
                duration: 2 + Math.random(),
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });

            // Fade in/out
            const tl = gsap.timeline();
            tl.to(fly, { opacity: 1, duration: 0.5 });
            tl.to(fly, {
                opacity: 0,
                duration: 1,
                delay: duration - 1.5,
                onComplete: () => fly.remove()
            });
        }
    }

    /* =================================================================
       HILLTOP BIRTHDAY SCENE - THE FINAL ACT
       ================================================================= */

    /**
     * Transition from Taj to Hilltop - Sky Pan Effect
     */
    transitionToHilltop() {
        console.log('Transitioning to Hilltop Birthday Scene...');

        // For the birthday scene, lift the dialogue higher so it never collides with the cake area.
        if (this.textOverlay) {
            this.textOverlay.style.bottom = '55%';
            this.textOverlay.style.maxWidth = '80%';
        }

        // Fade out Taj piano music slowly
        if (this.audioController.currentMusic) {
            gsap.to(this.audioController.currentMusic, {
                volume: 0,
                duration: 4,
                onComplete: () => this.audioController.stopMusic()
            });
        }

        // Fade in night wind ambience
        setTimeout(() => {
            this.audioController.playAmbience('wind', 0.2, 3);
        }, 2000);

        // Sky pan upward effect - stars move up
        const tajScene = this.scenes.taj;
        gsap.to(tajScene, {
            y: -window.innerHeight * 0.3,
            duration: 4,
            ease: 'power2.inOut'
        });

        // Fade out Taj, fade in Hilltop
        this.transitionTo('hill', 4);

        // Initialize hilltop after transition
        setTimeout(() => {
            const hillScene = this.scenes.hill;
            const layers = hillScene.querySelectorAll('.layer');

            // Set initial hill image
            layers.forEach(layer => {
                layer.style.backgroundImage = 'url(assets/hill/hill_01.png)';
            });

            this.enableCinematicParallax(hillScene);

            // 4 second breathing space - let her breathe
            setTimeout(() => {
                this.hillArrival(layers);
            }, 4000);
        }, 4000);
    }

    /**
     * Hill Image 1 - Arrival
     * "Before tonight ends..."
     */
    hillArrival(layers) {
        const timeline = gsap.timeline();

        timeline.call(() => {
            this.showText('"Before tonight ends…"');
        });
        timeline.to({}, { duration: 9 });

        timeline.call(() => {
            this.showText('"There was something I wanted to do."');
        });
        timeline.to({}, { duration: 10 });

        timeline.call(() => {
            this.showText('"Just once."');
        });
        timeline.to({}, { duration: 8 });

        // Slow camera forward movement (parallax shift)
        timeline.call(() => {
            layers.forEach((layer, index) => {
                const depth = parseFloat(layer.getAttribute('data-depth')) || 0.5;
                gsap.to(layer, {
                    scale: 1.05 + (depth * 0.1),
                    duration: 8,
                    ease: 'power1.inOut'
                });
            });
        });

        timeline.to({}, { duration: 3 });

        // Transition to clearing
        timeline.call(() => {
            this.hillClearing(layers);
        });
    }

    /**
     * Hill Image 2 - Open Clearing
     * Birthday preparation
     */
    hillClearing(layers) {
        const timeline = gsap.timeline();

        // Transition to hill_02
        timeline.call(() => {
            this.transitionHillImage(layers, 'hill_02');
        });

        // Keep silence for 5 seconds
        timeline.to({}, { duration: 7 });

        timeline.call(() => {
            this.showText('"Today isn\'t just our day."');
        });
        timeline.to({}, { duration: 9 });

        timeline.call(() => {
            this.showText('"It\'s yours."');
        });
        timeline.to({}, { duration: 8 });

        timeline.call(() => {
            this.showText('"And I didn\'t want to miss it."');
        });
        timeline.to({}, { duration: 9 });

        // Transition to magical sky
        timeline.call(() => {
            this.hillMagic(layers);
        });
    }

    /**
     * Helper: Smooth image transition for Hill
     */
    transitionHillImage(layers, imageName) {
        this.smoothLayerImageTransition(layers, 'hill', imageName);
    }

    /**
     * Hill Image 3 - Magical Sky (Anticipation)
     * Fireflies, butterflies, countdown
     */
    hillMagic(layers) {
        const timeline = gsap.timeline();

        // Transition to hill_03
        timeline.call(() => {
            this.transitionHillImage(layers, 'hill_03');
        });
        timeline.to({}, { duration: 3 });

        // Stars become slightly brighter
        timeline.call(() => {
            const hillScene = this.scenes.hill;
            gsap.to(hillScene, {
                filter: 'brightness(1.1)',
                duration: 2
            });
        });

        // Start soft ambient music
        timeline.call(() => {
            // Use existing wind as ambient, or add soft piano if available
            if (this.audioController.audioFiles.music.hill_piano) {
                this.audioController.playMusic('hill_piano', 0.2, 3);
            }
        });

        // Create fireflies (6-8 particles, very light)
        timeline.call(() => {
            this.createFireflies(8);
        });
        timeline.to({}, { duration: 2 });

        // 10 butterflies with physics
        timeline.call(() => {
            this.create10RealButterflies();
        });
        timeline.to({}, { duration: 3 });

        // Anticipation text
        timeline.call(() => {
            this.showText('"Can we try something?"');
        });
        timeline.to({}, { duration: 8 });

        timeline.call(() => {
            this.showText('"Just for a moment…"');
        });
        timeline.to({}, { duration: 8 });

        timeline.call(() => {
            this.showText('"Ready?"');

            // Magical butterfly effect for the special moment
            this.createButterflies();
        });
        timeline.to({}, { duration: 8 });

        // Show countdown 3-2-1
        timeline.call(() => {
            this.showCountdown(layers);
        });
    }

    /**
     * Create lightweight firefly particles (max 8)
     */
    createFireflies(count) {
        const container = document.getElementById('experience');

        for (let i = 0; i < count; i++) {
            const firefly = document.createElement('div');
            firefly.className = 'firefly';
            firefly.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: radial-gradient(circle, #ffeb3b, transparent);
                border-radius: 50%;
                box-shadow: 0 0 8px #ffeb3b;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                opacity: 0;
                z-index: 100;
                pointer-events: none;
            `;
            container.appendChild(firefly);

            // Gentle floating animation
            gsap.to(firefly, {
                opacity: Math.random() * 0.5 + 0.3,
                duration: 1,
                delay: Math.random() * 2
            });

            gsap.to(firefly, {
                x: (Math.random() - 0.5) * 200,
                y: (Math.random() - 0.5) * 200,
                duration: Math.random() * 4 + 3,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });
        }
    }

    /**
     * Create 10 real butterflies with physics
     */
    create10RealButterflies() {
        // Slightly more than 10 for a fuller but still gentle sky
        const total = 18;
        for (let i = 0; i < total; i++) {
            setTimeout(() => {
                this.createRealisticButterfly();
            }, i * 700); // Slower, more spaced-out spawning
        }
    }

    /**
     * Create single realistic butterfly with physics
     */
    createRealisticButterfly() {
        const butterfly = document.createElement('canvas');
        butterfly.width = 40;
        butterfly.height = 40;
        butterfly.className = 'butterfly-particle';

        // Draw butterfly on canvas
        const ctx = butterfly.getContext('2d');

        // Left wing
        ctx.fillStyle = `hsl(${Math.random() * 60 + 280}, 70%, 60%)`;
        ctx.beginPath();
        ctx.ellipse(10, 20, 8, 12, -0.3, 0, Math.PI * 2);
        ctx.fill();

        // Right wing
        ctx.fillStyle = `hsl(${Math.random() * 60 + 280}, 70%, 65%)`;
        ctx.beginPath();
        ctx.ellipse(30, 20, 8, 12, 0.3, 0, Math.PI * 2);
        ctx.fill();

        // Body
        ctx.fillStyle = '#2C1810';
        ctx.fillRect(18, 12, 4, 16);

        // Antennae
        ctx.strokeStyle = '#2C1810';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(19, 12);
        ctx.lineTo(15, 8);
        ctx.moveTo(21, 12);
        ctx.lineTo(25, 8);
        ctx.stroke();

        butterfly.style.cssText = `
            position: fixed;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: 0.9;
            z-index: 150;
            pointer-events: none;
            filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
        `;
        document.body.appendChild(butterfly);

        // Physics variables
        let x = parseFloat(butterfly.style.left);
        let y = parseFloat(butterfly.style.top);
        let vx = (Math.random() - 0.5) * 1.1; // Horizontal velocity (slower)
        let vy = (Math.random() - 0.5) * 1.1; // Vertical velocity (slower)
        let rotation = 0;
        let wingFlap = 0;

        // Animate with physics
        const animate = () => {
            // Apply soft wind (very gentle drift)
            vx += (Math.random() - 0.5) * 0.05;
            vy += (Math.random() - 0.5) * 0.05;

            // Slight upward bias (butterflies tend to float up)
            vy -= 0.01;

            // Stronger damping for slow-motion feel
            vx *= 0.985;
            vy *= 0.985;

            // Update position
            x += vx;
            y += vy;

            // Wing flap effect
            wingFlap += 0.3;
            const flapScale = 1 + Math.sin(wingFlap) * 0.1;

            // Rotation based on direction
            rotation = Math.atan2(vy, vx);

            butterfly.style.left = x + '%';
            butterfly.style.top = y + '%';
            butterfly.style.transform = `rotate(${rotation}rad) scaleX(${flapScale})`;

            // Remove if out of bounds
            if (x < -10 || x > 110 || y < -10 || y > 110) {
                butterfly.remove();
                return;
            }

            requestAnimationFrame(animate);
        };

        animate();
    }

    /**
     * Show countdown 3-2-1
     */
    showCountdown(layers) {
        const countdown = document.createElement('div');
        countdown.id = 'countdown';
        countdown.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 6rem;
            font-family: 'Cinzel', serif;
            color: rgba(255, 255, 255, 0.9);
            text-shadow: 0 0 30px rgba(255, 255, 255, 0.8);
            z-index: 2000;
            opacity: 0;
        `;
        document.body.appendChild(countdown);

        const numbers = [3, 2, 1];
        let currentIndex = 0;

        const showNumber = () => {
            if (currentIndex >= numbers.length) {
                // Countdown complete - everything becomes silent
                gsap.to(countdown, {
                    opacity: 0,
                    duration: 0.5,
                    onComplete: () => {
                        countdown.remove();
                        // Start birthday moment
                        this.hillBirthday(layers);
                    }
                });
                return;
            }

            countdown.textContent = numbers[currentIndex];
            gsap.fromTo(countdown,
                { opacity: 0, scale: 0.5 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 0.5,
                    ease: 'back.out(1.7)',
                    onComplete: () => {
                        setTimeout(() => {
                            gsap.to(countdown, {
                                opacity: 0,
                                scale: 0.8,
                                duration: 0.3,
                                onComplete: () => {
                                    currentIndex++;
                                    showNumber();
                                }
                            });
                        }, 800);
                    }
                }
            );
        };

        showNumber();
    }

    /**
     * Hill Image 4 - Birthday Moment
     * Cake appears, candles light, blow detection
     */
    hillBirthday(layers) {
        // Transition to hill_04
        this.transitionHillImage(layers, 'hill_04');

        // Let the sky settle for a moment, then bring in the cake
        setTimeout(() => {
            const cake = this.createCake();
            document.body.appendChild(cake);

            // Fade in cake
            gsap.to(cake, {
                opacity: 1,
                duration: 1.5,
                ease: 'power2.out',
                onComplete: () => {
                    // Match strike sound precisely when candles begin to light
                    if (this.audioController.audioFiles.sfx && this.audioController.audioFiles.sfx.match_strike) {
                        this.audioController.playSfx('match_strike', 0.7);
                    }
                    // Light candles sequentially
                    this.lightCandles(cake);
                }
            });
        }, 2000);
    }

    /**
     * Create beautiful birthday cake with canvas
     */
    createCake() {
        const container = document.createElement('div');
        container.id = 'birthday-cake';
        container.style.cssText = `
            position: fixed;
            bottom: 20%;
            left: 50%;
            transform: translateX(-50%);
            opacity: 0;
            z-index: 500;
        `;

        // Create canvas for cake
        const canvas = document.createElement('canvas');
        canvas.width = 300;
        canvas.height = 200;
        canvas.style.cssText = `
            filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.5));
        `;

        const ctx = canvas.getContext('2d');

        // Draw beautiful layered cake
        // Bottom layer
        const gradient1 = ctx.createLinearGradient(0, 140, 0, 180);
        gradient1.addColorStop(0, '#8B4513');
        gradient1.addColorStop(1, '#654321');
        ctx.fillStyle = gradient1;
        ctx.fillRect(50, 140, 200, 40);

        // Frosting on bottom
        ctx.fillStyle = '#FFE4E1';
        ctx.fillRect(50, 135, 200, 10);

        // Middle layer
        const gradient2 = ctx.createLinearGradient(0, 100, 0, 140);
        gradient2.addColorStop(0, '#A0522D');
        gradient2.addColorStop(1, '#8B4513');
        ctx.fillStyle = gradient2;
        ctx.fillRect(70, 100, 160, 40);

        // Frosting on middle
        ctx.fillStyle = '#FFF0F5';
        ctx.fillRect(70, 95, 160, 10);

        // Top layer
        const gradient3 = ctx.createLinearGradient(0, 70, 0, 100);
        gradient3.addColorStop(0, '#CD853F');
        gradient3.addColorStop(1, '#A0522D');
        ctx.fillStyle = gradient3;
        ctx.fillRect(90, 70, 120, 30);

        // Top frosting
        ctx.fillStyle = '#FFFAFA';
        ctx.fillRect(90, 65, 120, 8);

        // Decorative swirls
        ctx.strokeStyle = '#FFB6C1';
        ctx.lineWidth = 2;
        for (let i = 0; i < 5; i++) {
            ctx.beginPath();
            ctx.arc(60 + i * 45, 175, 5, 0, Math.PI * 2);
            ctx.stroke();
        }

        container.appendChild(canvas);

        // Add 5 candles with realistic flames
        const candlesContainer = document.createElement('div');
        candlesContainer.className = 'candles-container';
        candlesContainer.style.cssText = `
            position: absolute;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            width: 100%;
            display: flex;
            justify-content: center;
            gap: 15px;
        `;

        for (let i = 1; i <= 5; i++) {
            const candleWrapper = document.createElement('div');
            candleWrapper.style.cssText = `
                position: relative;
                display: flex;
                flex-direction: column;
                align-items: center;
            `;

            // Candle stick
            const candle = document.createElement('div');
            candle.className = 'candle';
            candle.setAttribute('data-id', i);
            candle.style.cssText = `
                width: 12px;
                height: 50px;
                background: linear-gradient(to right, #FFF8DC, #FAEBD7, #FFE4B5);
                border-radius: 3px 3px 0 0;
                position: relative;
                box-shadow: 
                    inset -2px 0 4px rgba(0, 0, 0, 0.2),
                    2px 2px 8px rgba(0, 0, 0, 0.3);
            `;

            // Wick
            const wick = document.createElement('div');
            wick.style.cssText = `
                position: absolute;
                top: -8px;
                left: 50%;
                transform: translateX(-50%);
                width: 2px;
                height: 8px;
                background: #2C1810;
            `;

            // Realistic flame
            const flame = document.createElement('div');
            flame.className = 'flame';
            flame.style.cssText = `
                position: absolute;
                top: -30px;
                left: 50%;
                transform: translateX(-50%);
                width: 20px;
                height: 30px;
                background: radial-gradient(ellipse at center bottom, 
                    #FFD700 0%, 
                    #FFA500 30%, 
                    #FF6347 60%, 
                    transparent 100%);
                border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
                opacity: 0;
                filter: blur(1px);
                animation: realistic-flicker 0.15s infinite;
            `;

            // Flame glow
            const glow = document.createElement('div');
            glow.className = 'flame-glow';
            glow.style.cssText = `
                position: absolute;
                top: -25px;
                left: 50%;
                transform: translateX(-50%);
                width: 40px;
                height: 40px;
                background: radial-gradient(circle, rgba(255, 215, 0, 0.4), transparent);
                border-radius: 50%;
                opacity: 0;
                animation: glow-pulse 0.3s infinite;
            `;

            candle.appendChild(wick);
            candle.appendChild(glow);
            candle.appendChild(flame);
            candleWrapper.appendChild(candle);
            candlesContainer.appendChild(candleWrapper);
        }

        container.appendChild(candlesContainer);
        return container;
    }

    /**
     * Light candles sequentially
     */
    lightCandles(cake) {
        const candles = cake.querySelectorAll('.candle');
        let currentCandle = 0;

        const lightNext = () => {
            if (currentCandle >= candles.length) {
                // All candles lit - start warm piano music
                setTimeout(() => {
                    if (this.audioController.audioFiles.music.hill_piano) {
                        this.audioController.playMusic('hill_piano', 0.4, 2);
                    }

                    // Show text
                    setTimeout(() => {
                        this.showText('"Make a wish, Sindhu…"');

                        setTimeout(() => {
                            this.showText('"And blow the candles."');

                            // Setup microphone blow detection
                            setTimeout(() => {
                                this.setupBlowDetection(cake);
                            }, 2000);
                        }, 9000);
                    }, 1000);
                }, 500);
                return;
            }

            const candle = candles[currentCandle];
            const flame = candle.querySelector('.flame');
            const glow = candle.querySelector('.flame-glow');

            // Play candle chime (if available)
            if (this.audioController.audioFiles.sfx && this.audioController.audioFiles.sfx.candle_chime) {
                this.audioController.playSfx('candle_chime', 0.3);
            }

            // Light the candle body
            gsap.fromTo(
                candle,
                { opacity: 0.6, y: 4 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                }
            );

            // Light the flame with a small flare
            gsap.fromTo(
                flame,
                { opacity: 0, scale: 0.7 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 0.35,
                    ease: 'power2.out'
                }
            );

            if (glow) {
                gsap.to(glow, {
                    opacity: 0.7,
                    duration: 0.35,
                    ease: 'power2.out'
                });
            }

            currentCandle++;
            setTimeout(lightNext, 600); // 0.6s interval
        };

        lightNext();
    }

    /**
     * Setup microphone blow detection
     */
    setupBlowDetection(cake) {
        // Check if getUserMedia is available
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            console.log('Microphone API not available, showing fallback button');
            this.showBlowButton(cake);
            return;
        }

        // Request microphone permission
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                console.log('Microphone permission granted');

                // Setup Web Audio API
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                const analyser = audioContext.createAnalyser();
                const microphone = audioContext.createMediaStreamSource(stream);
                const dataArray = new Uint8Array(analyser.frequencyBinCount);

                microphone.connect(analyser);
                analyser.fftSize = 256;

                let blowDetected = false;

                // Monitor audio input
                const checkBlow = () => {
                    if (blowDetected) return;

                    analyser.getByteFrequencyData(dataArray);

                    // Calculate average amplitude
                    let sum = 0;
                    for (let i = 0; i < dataArray.length; i++) {
                        sum += dataArray[i];
                    }
                    const average = sum / dataArray.length;

                    // Blow threshold ~60 amplitude
                    if (average > 60) {
                        console.log('Blow detected! Amplitude:', average);
                        blowDetected = true;

                        // Stop microphone
                        stream.getTracks().forEach(track => track.stop());
                        audioContext.close();

                        // Trigger candle blow
                        this.blowCandles(cake);
                    } else {
                        requestAnimationFrame(checkBlow);
                    }
                };

                checkBlow();

                // Also show fallback button (user can choose)
                this.showBlowButton(cake);
            })
            .catch(error => {
                console.log('Microphone permission denied:', error);
                // Show fallback button
                this.showBlowButton(cake);
            });
    }

    /**
     * Show fallback "Tap to Blow" button
     */
    showBlowButton(cake) {
        const button = document.createElement('button');
        button.id = 'blow-button';
        button.textContent = 'Tap to Blow 💨';
        button.style.cssText = `
            position: fixed;
            bottom: 15%;
            left: 50%;
            transform: translateX(-50%);
            padding: 12px 30px;
            font-size: 1.2rem;
            font-family: 'Cinzel', serif;
            background: linear-gradient(145deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-radius: 25px;
            color: white;
            cursor: pointer;
            z-index: 1000;
            backdrop-filter: blur(10px);
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
            transition: all 0.3s ease;
        `;

        button.onmouseover = () => {
            button.style.transform = 'translateX(-50%) scale(1.05)';
            button.style.boxShadow = '0 6px 20px rgba(255, 255, 255, 0.3)';
        };

        button.onmouseout = () => {
            button.style.transform = 'translateX(-50%) scale(1)';
            button.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
        };

        button.onclick = () => {
            button.remove();
            this.blowCandles(cake);
        };

        document.body.appendChild(button);
    }

    /**
     * Blow out candles - particle effects
     */
    blowCandles(cake) {
        console.log('Blowing out candles...');

        // Remove blow button if exists
        const blowButton = document.getElementById('blow-button');
        if (blowButton) blowButton.remove();

        // Extinguish all candles instantly
        const flames = cake.querySelectorAll('.flame');
        const glows = cake.querySelectorAll('.flame-glow');

        // Soft whoosh using existing breathing SFX, if available
        if (this.audioController.audioFiles.sfx && this.audioController.audioFiles.sfx.breathing) {
            this.audioController.playSfx('breathing', 0.5);
        }

        flames.forEach(flame => {
            gsap.to(flame, {
                opacity: 0,
                duration: 0.35,
                ease: 'power2.out'
            });
        });

        glows.forEach(glow => {
            gsap.to(glow, {
                opacity: 0,
                duration: 0.35,
                ease: 'power2.out'
            });
        });

        // Create smoke particles rising from candles
        setTimeout(() => {
            flames.forEach((flame, index) => {
                setTimeout(() => {
                    this.createSmokeParticle(flame);
                }, index * 100);
            });
        }, 300);

        // Sparkle particles burst (lightweight)
        setTimeout(() => {
            this.createSparkleBurst(cake);
        }, 500);

        // Butterflies fly upward
        setTimeout(() => {
            for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                    this.createButterflyUpward();
                }, i * 400);
            }
        }, 800);

        // Fireflies increase briefly (add 4 more, total ~12)
        setTimeout(() => {
            this.createFireflies(4);
        }, 1000);

        // After 5 seconds, proceed to birthday reveal
        setTimeout(() => {
            this.birthdayReveal(cake);
        }, 5000);
    }

    /**
     * Create single smoke particle rising from candle
     */
    createSmokeParticle(flame) {
        const rect = flame.getBoundingClientRect();
        const smoke = document.createElement('div');
        smoke.className = 'smoke-particle';
        smoke.innerHTML = '💨';
        smoke.style.cssText = `
            position: fixed;
            left: ${rect.left}px;
            top: ${rect.top}px;
            font-size: 1rem;
            opacity: 0.6;
            z-index: 600;
            pointer-events: none;
        `;
        document.body.appendChild(smoke);

        // Rise slowly
        gsap.to(smoke, {
            y: -100,
            opacity: 0,
            duration: 2,
            ease: 'power1.out',
            onComplete: () => smoke.remove()
        });
    }

    /**
     * Create sparkle burst particles
     */
    createSparkleBurst(cake) {
        const rect = cake.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + 20;

        // Create 8 sparkles
        for (let i = 0; i < 8; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle-particle';
            sparkle.innerHTML = '✨';
            sparkle.style.cssText = `
                position: fixed;
                left: ${centerX}px;
                top: ${centerY}px;
                font-size: 1.2rem;
                opacity: 1;
                z-index: 650;
                pointer-events: none;
            `;
            document.body.appendChild(sparkle);

            const angle = (i / 8) * Math.PI * 2;
            const distance = 60 + Math.random() * 40;

            gsap.to(sparkle, {
                x: Math.cos(angle) * distance,
                y: Math.sin(angle) * distance,
                opacity: 0,
                rotation: Math.random() * 360,
                duration: 1.5,
                ease: 'power2.out',
                onComplete: () => sparkle.remove()
            });
        }
    }

    /**
     * Create butterfly flying upward
     */
    createButterflyUpward() {
        const butterfly = document.createElement('div');
        butterfly.innerHTML = '🦋';
        butterfly.style.cssText = `
            position: fixed;
            left: ${Math.random() * 80 + 10}%;
            bottom: 30%;
            font-size: 1.5rem;
            opacity: 0.8;
            z-index: 200;
            pointer-events: none;
            filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.6));
        `;
        document.body.appendChild(butterfly);

        gsap.to(butterfly, {
            y: -window.innerHeight - 100,
            x: (Math.random() - 0.5) * 200,
            rotation: Math.random() * 360,
            opacity: 0,
            duration: 4,
            ease: 'power1.out',
            onComplete: () => butterfly.remove()
        });
    }

    /**
     * Birthday Reveal - Large message and emotional dialogue
     */
    birthdayReveal(cake) {
        // Fade out cake
        gsap.to(cake, {
            opacity: 0,
            duration: 2,
            onComplete: () => cake.remove()
        });

        // Large birthday message
        setTimeout(() => {
            const birthdayMsg = document.createElement('div');
            birthdayMsg.id = 'birthday-message';
            birthdayMsg.innerHTML = 'Advance Happy Birthday Sindhu ❤️';
            birthdayMsg.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: 2.5rem;
                font-family: 'Cinzel', serif;
                color: rgba(255, 255, 255, 0.95);
                text-align: center;
                text-shadow: 0 2px 20px rgba(255, 255, 255, 0.8);
                z-index: 1500;
                opacity: 0;
                max-width: 90%;
                line-height: 1.4;
            `;
            document.body.appendChild(birthdayMsg);

            gsap.to(birthdayMsg, {
                opacity: 1,
                scale: 1.05,
                duration: 2,
                ease: 'power2.out'
            });

            // Music becomes warmer
            if (this.audioController.currentMusic) {
                gsap.to(this.audioController.currentMusic, {
                    volume: 0.5,
                    duration: 2
                });
            }

            // Emotional dialogue
            setTimeout(() => {
                gsap.to(birthdayMsg, {
                    opacity: 0,
                    duration: 1.5,
                    onComplete: () => birthdayMsg.remove()
                });

                setTimeout(() => {
                    this.showText('"I may not be beside you tonight…"');

                    setTimeout(() => {
                        this.showText('"But I wanted to be part of your day."');

                        setTimeout(() => {
                            this.showText('"Even if only like this."');

                            setTimeout(() => {
                                this.finalLines();
                            }, 9000);
                        }, 9000);
                    }, 9000);
                }, 2000);
            }, 5000);
        }, 2000);
    }

    /**
     * Final emotional lines
     */
    finalLines() {
        // Soft petals continue (light, 12 petals only)
        for (let i = 0; i < 12; i++) {
            setTimeout(() => {
                this.createFallingPetal();
            }, i * 300);
        }

        this.showText('"Thank you for staying."');

        setTimeout(() => {
            this.showText('"Thank you for listening."');

            setTimeout(() => {
                this.showText('"And… thank you for being in my life."');

                // Fade to black
                setTimeout(() => {
                    const overlay = document.createElement('div');
                    overlay.style.cssText = `
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: black;
                        z-index: 2500;
                        opacity: 0;
                    `;
                    document.body.appendChild(overlay);

                    gsap.to(overlay, {
                        opacity: 1,
                        duration: 3,
                        onComplete: () => {
                            setTimeout(() => {
                                this.showSecretLetter();
                            }, 2000);
                        }
                    });
                }, 10000);
            }, 9000);
        }, 9000);
    }

    /**
     * Create single falling petal
     */
    createFallingPetal() {
        const petal = document.createElement('div');
        petal.innerHTML = '🌸';
        petal.style.cssText = `
            position: fixed;
            top: -50px;
            left: ${Math.random() * 100}%;
            font-size: ${Math.random() * 10 + 15}px;
            opacity: ${Math.random() * 0.4 + 0.4};
            z-index: 100;
            pointer-events: none;
        `;
        document.body.appendChild(petal);

        gsap.to(petal, {
            y: window.innerHeight + 100,
            rotation: Math.random() * 360,
            duration: Math.random() * 4 + 6,
            ease: 'linear',
            onComplete: () => petal.remove()
        });
    }

    /**
     * Show secret letter - Final scene
     */
    showSecretLetter() {
        // Create premium love-themed envelope
        const envelope = document.createElement('div');
        envelope.id = 'secret-envelope';
        envelope.innerHTML = '💌';
        envelope.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 6rem;
            cursor: pointer;
            z-index: 3000;
            opacity: 0;
            transition: transform 0.3s ease;
            filter: drop-shadow(0 0 20px rgba(255, 105, 180, 0.8)) drop-shadow(0 0 40px rgba(255, 20, 147, 0.5));
            animation: heartPulse 2s ease-in-out infinite;
        `;

        // Add pulsing animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes heartPulse {
                0%, 100% { transform: translate(-50%, -50%) scale(1); }
                50% { transform: translate(-50%, -50%) scale(1.1); }
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(envelope);

        gsap.to(envelope, {
            opacity: 1,
            duration: 2
        });

        envelope.onmouseover = () => {
            envelope.style.transform = 'translate(-50%, -50%) scale(1.1)';
        };

        envelope.onmouseout = () => {
            envelope.style.transform = 'translate(-50%, -50%) scale(1)';
        };

        // Tap to open
        envelope.onclick = () => {
            gsap.to(envelope, {
                opacity: 0,
                scale: 0.5,
                duration: 0.5,
                onComplete: () => {
                    envelope.remove();

                    // Show letter
                    const letter = document.createElement('div');
                    letter.id = 'secret-letter';
                    letter.style.cssText = `
                        position: fixed;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        max-width: 600px;
                        padding: 40px;
                        background: rgba(255, 255, 255, 0.05);
                        border: 1px solid rgba(255, 255, 255, 0.2);
                        border-radius: 10px;
                        color: rgba(255, 255, 255, 0.9);
                        font-family: 'Cinzel', serif;
                        font-size: 1.1rem;
                        line-height: 1.8;
                        text-align: center;
                        z-index: 3000;
                        opacity: 0;
                        backdrop-filter: blur(20px);
                    `;

                    letter.innerHTML = `
                        <p>Hii Sindhu, the last message dii mudiyapodhu<br>miss pandriya????</p>
                        <p style="margin-top: 1.5rem;">Sorry Sindhu, unna niraiya hurt panniruken.<br>I am really sorry.</p>
                        <p style="margin-top: 1.5rem;">Aprm solla marandhuten, nee niraiya try panna na unna verukka but edhum velaiku aagadhu 😂😂😂<br>Naa poi unna veruthuruven... comedy pannadha Sindhu.</p>
                        <p style="margin-top: 1.5rem;">Nee enna pannalaum un mela verupula enakum ennaikum varadhu.<br>I always love you... even after the time.</p>
                        <p style="margin-top: 1.5rem; font-style: italic;">Oru request: please marandhura mattum senjuradha.<br>Just summa oru oorathula aachum niyabagam vachuka...</p>
                        <p style="margin-top: 2rem; font-size: 1.2rem; color: rgba(255, 182, 193, 0.9);">Have a happy life Sindhu...<br>All the best... take care ma 💕</p>
                        <p style="margin-top: 2rem; font-size: 1.3rem;">— Dhinesh</p>
                    `;

                    document.body.appendChild(letter);

                    gsap.to(letter, {
                        opacity: 1,
                        duration: 2
                    });

                    // Soft music continues, no restart button
                    // Only silence and stars
                }
            });
        };
    }

    /**

     * Valentine Proposal Popup with Rose Petal Shower
     */
    showValentineProposal() {
        // Create premium popup
        const popup = document.createElement('div');
        popup.id = 'valentine-popup';
        popup.innerHTML = `
            <div class="valentine-card">
                <h2>Will you be my Valentine? 💝</h2>
                <div class="button-container">
                    <button id="yes-btn" class="valentine-btn">Yes ❤️</button>
                    <button id="double-yes-btn" class="valentine-btn">Double Yes 💕</button>
                </div>
            </div>
        `;
        popup.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(10px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            opacity: 0;
        `;
        document.body.appendChild(popup);

        // Fade in popup
        gsap.to(popup, {
            opacity: 1,
            duration: 1
        });

        // Button click handlers
        const handleYes = () => {
            // Fade out popup
            gsap.to(popup, {
                opacity: 0,
                duration: 0.5,
                onComplete: () => popup.remove()
            });

            // Start rose petal shower
            this.showRosePetalShower();
        };

        setTimeout(() => {
            document.getElementById('yes-btn').onclick = handleYes;
            document.getElementById('double-yes-btn').onclick = handleYes;
        }, 100);
    }

    /**
     * Rose Petal Shower Animation - Realistic CSS Petals
     */
    showRosePetalShower() {
        const container = document.createElement('div');
        container.id = 'rose-petals';
        container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1500;
            overflow: hidden;
        `;
        document.body.appendChild(container);

        // Create realistic rose petals continuously
        const petalCount = 60;
        let petalsCreated = 0;

        const createPetal = () => {
            if (petalsCreated >= petalCount) return;

            const petal = document.createElement('div');
            petal.className = 'rose-petal';

            // Random size and position
            const size = Math.random() * 15 + 20; // 20-35px
            const startX = Math.random() * 100;
            const rotation = Math.random() * 360;
            const sway = (Math.random() - 0.5) * 100; // Side-to-side movement

            petal.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size * 1.2}px;
                background: linear-gradient(135deg, 
                    #ff6b9d 0%, 
                    #c93a6b 50%, 
                    #8b1538 100%);
                border-radius: 0 50% 50% 50%;
                top: -50px;
                left: ${startX}%;
                opacity: 0.8;
                box-shadow: 0 2px 5px rgba(139, 21, 56, 0.3);
                transform: rotate(${rotation}deg);
            `;
            container.appendChild(petal);

            // Animate petal falling with swaying motion
            gsap.to(petal, {
                y: window.innerHeight + 100,
                x: sway,
                rotation: rotation + (Math.random() * 720 - 360),
                duration: Math.random() * 4 + 6, // 6-10 seconds fall time
                ease: 'none',
                onComplete: () => petal.remove()
            });

            petalsCreated++;
        };

        // Release petals continuously over first 3 seconds
        const interval = setInterval(() => {
            createPetal();
            if (petalsCreated >= petalCount) {
                clearInterval(interval);
            }
        }, 150); // New petal every 150ms

        // Remove container after 10 seconds
        setTimeout(() => {
            gsap.to(container, {
                opacity: 0,
                duration: 1,
                onComplete: () => container.remove()
            });

            // Continue to next scene
            setTimeout(() => {
                // Fade ring
                const ring = document.getElementById('ring-display');
                if (ring) {
                    gsap.to(ring, {
                        opacity: 0,
                        duration: 2,
                        onComplete: () => ring.remove()
                    });
                }

                // Show final message
                setTimeout(() => {
                    this.showText(`"There's one last place…"`);

                    setTimeout(() => {
                        this.showContinueButton(() => {
                            this.goToScene('hill');
                        });
                    }, 9000);
                }, 2000);
            }, 2000);
        }, 10000);
    }

    /**
     * Helper: Smooth image transition for Café
     */
    transitionCafeImage(layers, imageName) {
        this.smoothLayerImageTransition(layers, 'cafe', imageName);
    }
}