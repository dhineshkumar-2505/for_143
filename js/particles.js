// Particles.js - Canvas particle system
// Handles petals, rain, stars, smoke, sparkles

export class ParticleSystem {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mode = 'none';
        this.maxPoolSize = 100;
        // On small/low-end devices we keep the active count modest for 60fps.
        // Very aggressive reduction on tiny phones
        this.maxActive = window.innerWidth < 500 ? 8 : (window.innerWidth < 600 ? 12 : (window.innerWidth < 900 ? 20 : 60));

        // Pre-create a reusable pool so we avoid frequent allocations.
        for (let i = 0; i < this.maxPoolSize; i++) {
            this.particles.push(this._createEmptyParticle());
        }

        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());

        console.log('ParticleSystem initialized');

        this._lastSpawnTime = 0;
        this._animationFrame = null;
        this.update = this.update.bind(this);
        this.update();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    // Set particle mode based on scene (Phase 6)
    setMode(mode) {
        this.mode = mode;
        // 'petals', 'rain', 'stars', 'smoke', 'sparkles', 'none'
    }

    // Internal helper: base particle structure
    _createEmptyParticle() {
        return {
            active: false,
            x: 0,
            y: 0,
            vx: 0,
            vy: 0,
            rotation: 0,
            vr: 0,
            size: 0,
            life: 0,
            maxLife: 0
        };
    }

    // Animation loop (petals + other modes)
    update(timestamp = 0) {
        this._animationFrame = requestAnimationFrame(this.update);

        const ctx = this.ctx;
        const w = this.canvas.width;
        const h = this.canvas.height;

        ctx.clearRect(0, 0, w, h);

        // Spawn logic (only for petals for now)
        if (this.mode === 'petals') {
            const spawnInterval = 140; // ms between spawns
            if (timestamp - this._lastSpawnTime > spawnInterval) {
                this._spawnPetal();
                this._lastSpawnTime = timestamp;
            }
        }

        // Update & draw active particles
        let activeCount = 0;
        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];
            if (!p.active) continue;

            // Cap active draw calls for low-end devices
            if (activeCount >= this.maxActive) {
                p.active = false;
                continue;
            }

            p.life += 16;
            if (p.life >= p.maxLife) {
                p.active = false;
                continue;
            }

            p.x += p.vx;
            p.y += p.vy;
            p.rotation += p.vr;

            // Gentle sway
            p.vx += Math.sin(p.life / 500) * 0.02;

            // Draw as a simple soft pink petal
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation);
            const alpha = 1 - p.life / p.maxLife;

            // Performance optimization: Simple fill for mobile, Gradient for desktop
            if (activeCount < 15 || window.innerWidth > 900) {
                const grd = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);
                grd.addColorStop(0, `rgba(255, 182, 193, ${0.9 * alpha})`);
                grd.addColorStop(1, `rgba(255, 182, 193, 0)`);
                ctx.fillStyle = grd;
            } else {
                // Simple solid fill for performance on mobile
                ctx.fillStyle = `rgba(255, 182, 193, ${0.6 * alpha})`;
            }

            ctx.beginPath();
            ctx.ellipse(0, 0, p.size, p.size * 0.6, 0.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();

            activeCount++;
        }
    }

    _spawnPetal() {
        if (this.mode !== 'petals') return;

        // Find an inactive slot
        const p = this.particles.find(pt => !pt.active);
        if (!p) return;

        const w = this.canvas.width;
        const h = this.canvas.height;

        p.active = true;
        p.x = Math.random() * w;
        p.y = -20;
        p.vx = (Math.random() - 0.5) * 0.4;
        p.vy = Math.random() * 0.6 + 0.4;
        p.rotation = Math.random() * Math.PI * 2;
        p.vr = (Math.random() - 0.5) * 0.01;
        p.size = Math.random() * 14 + 10;
        p.life = 0;
        p.maxLife = h * 12; // proportional to screen height
    }

    // Optional: external burst hook used in garden scene
    burst(count = 10) {
        for (let i = 0; i < count; i++) {
            this._spawnPetal();
        }
    }
}
