# How to Test "For My Sindhu"

## Method 1: Python HTTP Server (Recommended - Simplest)

### If you have Python installed:

**Python 3:**
```bash
cd D:\dksin\one-night-with-you
python -m http.server 8000
```

**Python 2:**
```bash
cd D:\dksin\one-night-with-you
python -m SimpleHTTPServer 8000
```

Then open your browser to: **http://localhost:8000**

---

## Method 2: Node.js HTTP Server

### If you have Node.js installed:

**Install http-server globally (one time):**
```bash
npm install -g http-server
```

**Run server:**
```bash
cd D:\dksin\one-night-with-you
http-server -p 8000
```

Then open: **http://localhost:8000**

---

## Method 3: VS Code Live Server Extension

1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"
4. Browser will open automatically

---

## Method 4: PHP Server (If you have PHP)

```bash
cd D:\dksin\one-night-with-you
php -S localhost:8000
```

Then open: **http://localhost:8000**

---

## What to Expect:

### Opening Sequence (8 seconds):
1. **0-3s**: Total black screen
2. **3-5s**: Breathing sound fades in
3. **5s**: Typewriter sound + text appears: "Shall we spend a night together?"
4. **8s**: Glowing "Start" button appears

### After Clicking Start:
1. Fade to Garden scene
2. Piano music starts
3. Pink petals falling
4. Text: "Just stay with me tonight."
5. **Tap anywhere 5 times** to progress through garden images
6. Each tap = footstep sound + zoom animation
7. After 5th tap: "Come… I want to show you something."
8. Color shifts to orange/sepia
9. Wave sounds fade in
10. Transitions to Beach scene (not implemented yet)

---

## Troubleshooting:

### If you see errors in browser console:
- **"Failed to load module"** → You need a local server (use Method 1-4 above)
- **"404 Not Found"** for images → Check that image files are in `assets/garden/` folder
- **Audio doesn't play** → Click the Start button (browser autoplay policy)
- **No particles** → Check browser console for errors

### Check Browser Console:
Press **F12** → Go to **Console** tab to see logs like:
- "For My Sindhu - Initializing..."
- "AudioController initialized"
- "ParticleSystem initialized"
- "Garden scene initialized - Tap to progress"

---

## Quick Test Checklist:

- [ ] Black screen for 3 seconds
- [ ] Typewriter text appears
- [ ] Start button appears and glows
- [ ] Click Start → Garden scene fades in
- [ ] Piano music plays
- [ ] Pink petals are falling
- [ ] Text overlay shows
- [ ] Mouse movement creates parallax effect
- [ ] Tap 5 times → images change (gar_01 → gar_05)
- [ ] Footstep sound on each tap
- [ ] Zoom animation on each tap
- [ ] Final text appears after 5th tap
- [ ] Color shifts to orange
- [ ] Wave sound fades in

---

**Recommended: Use Python HTTP Server (Method 1) - it's the simplest!**
