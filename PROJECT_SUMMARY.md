# Project Overview: "For My Sindhu"

An interactive, emotional storytelling experience designed as a "participatory memory." The project follows a journey through various atmospheric locations, culminating in a special birthday surprise.

---

## 🚀 Technical Architecture

- **Core Engine**: Vanilla JavaScript with ES6 modules.
- **Animations**: GSAP (GreenSock Animation Platform) for high-performance cinematic sequences.
- **Graphics**: 
  - CSS3 for UI and basic styling.
  - HTML5 Canvas for complex particles and the premium birthday cake.
- **Audio System**: Web Audio API with an `AudioController` for ambient crossfading and SFX.
- **Interactions**: Microphone API for blow detection (Birthday Candles).

---

## 🎭 Scene-by-Scene Breakdown

### 1. Opening Sequence
- **The Choice**: A minimal, high-contrast entry point that builds curiosity.
- **Typewriter Effect**: Dynamic text rendering to set a personal tone.

### 2. The Beach Scene
- **Atmosphere**: Moving waves, rain particles, and soft wave ambience.
- **Dialogue**: Introduction to the emotional context of the journey.

### 3. The Café Scene
- **Ambience**: Rainfall on windows, indoor lighting, and intimate conversation.
- **Pacing**: Slower dialogue transitions to create "thinking space."

### 4. The Taj Scene (Moonlight Reflection)
- **Visuals**: Moonlight shimmering on water and the iconic silhouette.
- **Music**: Soft, evocative piano scores.
- **Parallax**: Vertical sky pan transition leading into the final act.

### 5. The Hilltop (Birthday Finale)
- **Arrival**: Cinematic sky pan from the Taj scene.
- **Magical Elements**: 
  - 8-10 fireflies (Canvas particles).
  - 10 physics-based butterflies (Randomized flight paths & wing flapping).
  - 3-2-1 Cinematic countdown.
- **Interactive Birthday Moment**:
  - **Premium Cake**: 3-layered chocolate cake with pink drip frosting and strawberry decorations.
  - **Realistic Candles**: 10px x 45px candles with black wicks and glowing, flickering flames.
  - **Blow Detection**: Microphone API integration to detect the user blowing out candles.
  - **Fallback**: "Tap to Blow" button for devices without mic access.
- **Conclusion**:
  - "Advance Happy Birthday Sindhu ❤️" reveal.
  - Smoke, sparkle, and rising butterfly particles upon blowing candles.
  - Emotional "Thank you" monologue.

### 6. The Secret Letter
- **Envelope Interaction**: A physical-feeling envelope that appears in the darkness.
- **The Letter**: A final, intimate message from Dhinesh, revealing the true purpose of the journey.

---

## 🛠️ Developer Features

- **Debug Skip System**:
  - `S` - Skip to Beach
  - `C` - Skip to Café
  - `T` - Skip to Taj
  - `H` - Skip to Hilltop (Birthday)
- **Particle Engine**: Optimized for mobile performance, limited to ~20 concurrent particles.
- **Asset Preloader**: Ensures smooth transitions between scene-specific layers (`hill_01.png` to `hill_04.png`).

---

## 👩‍💻 Project Files
- `index.html`: Main structure.
- `style.css`: Rich aesthetics, glassmorphism, and animations.
- `js/main.js`: Entry point and debug controls.
- `js/sceneManager.js`: The "brain" of the project, handling all scene logic.
- `js/audioController.js`: Manages the emotional soundscape.
- `js/particleSystem.js`: Handles rain, fireflies, and butterflies.

---
*Created with love for a special occasion.*
