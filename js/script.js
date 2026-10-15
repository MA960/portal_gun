/**
 * PORTAL GUN - C-137 SHARED ENGINE
 * Created by Rick Sanchez | Proprietary Owner: Mubeen Amir
 */

document.addEventListener('DOMContentLoaded', () => {
    initPortalCanvas();
    initHotspots();
    initControls();
    initSimulation();
    initCheckout();
});

/* Particle Canvas */
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

/* Schematic Hotspots */
function initHotspots() {
    const hotspots = document.querySelectorAll('.hotspot');
    const infoBox = document.getElementById('hotspot-info-box');
    if (!hotspots.length || !infoBox) return;

    hotspots.forEach(spot => {
        const updateInfo = () => {
            infoBox.value = spot.getAttribute('data-info');
            infoBox.style.borderColor = '#39ff14';
        };
        spot.addEventListener('mouseenter', updateInfo);
        spot.addEventListener('focus', updateInfo);
        spot.addEventListener('mouseleave', () => {
            infoBox.value = 'Hover or tap schematic nodes to inspect component specs.';
            infoBox.style.borderColor = 'rgba(57, 255, 20, 0.3)';
        });
    });
}

/* Home Page Controls */
function initControls() {
    const btnFire = document.getElementById('btn-fire');
    const btnDial = document.getElementById('btn-dial');
    const digitalReadout = document.getElementById('digital-readout');
    const sampleDimensions = ['C-137', 'J19-Z7', '35-C', 'D-99', 'K-22'];

    if (btnDial && digitalReadout) {
        btnDial.addEventListener('click', () => {
            digitalReadout.value = sampleDimensions[Math.floor(Math.random() * sampleDimensions.length)];
        });
    }

    if (btnFire) {
        btnFire.addEventListener('click', () => {
            btnFire.textContent = 'EMITTING WORMHOLE...';
            setTimeout(() => btnFire.textContent = 'TEST EMISSION', 1500);
        });
    }
}

/* Timeline Simulator */
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

/* Order Checkout Confirmation */
function initCheckout() {
    const orderForm = document.getElementById('order-form');
    if (!orderForm) return;

    orderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Order Transmitted! 1 Trillion Galactic Credits charged and 25% Soul Equity securely bonded under Mubeen Amir ownership registry.');
    });
}