/**
 * PORTAL GUN - C-137 SHARED ENGINE & INTERACTIVE TERMINAL
 * Created by Rick Sanchez | Proprietary Owner: Mubeen Amir
 */

document.addEventListener('DOMContentLoaded', () => {
    initPortalCanvas();
    initImageHotspots();
    initTerminalControls();
    initSimulation();
    initCheckout();
});

/* ==========================================
   1. BACKGROUND PARTICLE CANVAS
   ========================================== */
function initPortalCanvas() {
    const canvas = document.getElementById('portal-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = Array.from({ length: 45 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 1.5,
        speedY: (Math.random() - 0.5) * 1.5,
        color: Math.random() > 0.3 ? '#39ff14' : '#00e5ff',
        alpha: Math.random() * 0.7 + 0.3
    }));

    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;
            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;
            if (p.y < 0) p.y = height;
            if (p.y > height) p.y = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.alpha;
            ctx.fill();
        });
        requestAnimationFrame(animate);
    }
    animate();
}

/* ==========================================
   2. IMAGE TARGETING HOTSPOTS (DIAGNOSTIC TERMINAL)
   ========================================== */
function initImageHotspots() {
    const hotspots = document.querySelectorAll('.hotspot');
    const infoBox = document.getElementById('hotspot-info-box');
    if (!hotspots.length || !infoBox) return;

    hotspots.forEach(spot => {
        const showInfo = (e) => {
            e.preventDefault();
            const text = spot.getAttribute('data-info');
            infoBox.textContent = text;
            infoBox.style.borderColor = 'var(--neon-green)';
            infoBox.style.color = 'var(--neon-green)';
        };

        spot.addEventListener('mouseenter', showInfo);
        spot.addEventListener('click', showInfo);
        spot.addEventListener('focus', showInfo);

        spot.addEventListener('mouseleave', () => {
            infoBox.style.borderColor = 'var(--border-color)';
            infoBox.style.color = 'var(--neon-cyan)';
        });
    });
}

/* ==========================================
   3. TERMINAL CONTROLS (TEST FIRE & DIMENSION SHIFT)
   ========================================== */
function initTerminalControls() {
    const btnFire = document.getElementById('btn-fire');
    const btnDial = document.getElementById('btn-dial');
    const digitalReadout = document.getElementById('digital-readout');
    const infoBox = document.getElementById('hotspot-info-box');

    const sampleDimensions = ['C-137', 'J19-Z7', '35-C', 'D-99', 'K-22', 'C-500a', 'EARTH-79'];

    if (btnDial && digitalReadout) {
        btnDial.addEventListener('click', () => {
            const randomDim = sampleDimensions[Math.floor(Math.random() * sampleDimensions.length)];
            digitalReadout.textContent = randomDim;
            if (infoBox) {
                infoBox.textContent = `[SUCCESS] Target coordinates shifted to Dimension ${randomDim}. Quantum lock engaged.`;
                infoBox.style.color = 'var(--neon-cyan)';
            }
        });
    }

    if (btnFire) {
        btnFire.addEventListener('click', () => {
            btnFire.textContent = 'EMITTING...';
            btnFire.style.background = 'rgba(0,229,255,0.2)';
            if (infoBox) {
                infoBox.textContent = '[WARNING] Wormhole tear initiated! Green dark-matter discharge active.';
                infoBox.style.color = 'var(--neon-green)';
            }

            setTimeout(() => {
                btnFire.textContent = 'TEST FIRE';
                btnFire.style.background = '';
                if (infoBox) {
                    infoBox.textContent = '[STABLE] Portal sequence completed successfully with zero atomic drift.';
                }
            }, 1800);
        });
    }
}

/* ==========================================
   4. TIMELINE SIMULATOR & CHECKOUT
   ========================================== */
function initSimulation() {
    const ambitionRange = document.getElementById('ambition-range');
    const moralityRange = document.getElementById('morality-range');
    const simOutputBox = document.getElementById('sim-output-box');
    if (!ambitionRange || !moralityRange || !simOutputBox) return;

    function updateSim() {
        simOutputBox.innerHTML = `
            <strong class="output-dim">TARGET: DIMENSION J19-Z7</strong>
            <p class="output-desc">Simulation adjusted to Ambition: ${ambitionRange.value}% | Morality: ${moralityRange.value}%. Stable reality link verified.</p>
        `;
    }
    ambitionRange.addEventListener('input', updateSim);
    moralityRange.addEventListener('input', updateSim);
}

function initCheckout() {
    const orderForm = document.getElementById('order-form');
    if (!orderForm) return;

    orderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Order Transmitted! 1 Trillion Galactic Credits charged and 25% Soul Equity securely bonded under Mubeen Amir ownership registry.');
    });
}