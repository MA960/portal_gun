/**
 * PORTAL GUN - C-137 HOME ENGINE
 * Owner: Mubeen Amir | Creator: Rick Sanchez
 */

document.addEventListener('DOMContentLoaded', () => {
    initPortalCanvas();
    initHotspots();
    initControls();
    initSimulation();
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
            ctx.shadowBlur = 10;
            ctx.shadowColor = p.color;
            ctx.fill();
        });

        requestAnimationFrame(animate);
    }

    animate();
}

/* SVG Hotspots Inspection */
function initHotspots() {
    const hotspots = document.querySelectorAll('.hotspot');
    const infoBox = document.getElementById('hotspot-info-box');

    hotspots.forEach(spot => {
        const updateInfo = () => {
            const infoText = spot.getAttribute('data-info');
            if (infoBox && infoText) {
                infoBox.value = infoText;
                infoBox.style.borderColor = '#39ff14';
            }
        };

        spot.addEventListener('mouseenter', updateInfo);
        spot.addEventListener('focus', updateInfo);

        const resetInfo = () => {
            if (infoBox) {
                infoBox.value = 'Hover or tap schematic nodes to inspect component specs.';
                infoBox.style.borderColor = 'rgba(57, 255, 20, 0.25)';
            }
        };

        spot.addEventListener('mouseleave', resetInfo);
        spot.addEventListener('blur', resetInfo);
    });
}

/* Display Controls */
function initControls() {
    const btnFire = document.getElementById('btn-fire');
    const btnDial = document.getElementById('btn-dial');
    const digitalReadout = document.getElementById('digital-readout');

    const sampleDimensions = ['C-137', 'J19-Z7', '35-C', 'D-99', 'K-22', 'C-500a', 'Earth-79'];

    if (btnDial && digitalReadout) {
        btnDial.addEventListener('click', () => {
            const randomDim = sampleDimensions[Math.floor(Math.random() * sampleDimensions.length)];
            digitalReadout.value = randomDim;
        });
    }

    if (btnFire) {
        btnFire.addEventListener('click', () => {
            btnFire.textContent = 'EMITTING WORMHOLE...';
            btnFire.style.background = '#00e5ff';

            setTimeout(() => {
                btnFire.textContent = 'TEST EMISSION';
                btnFire.style.background = '';
            }, 1500);
        });
    }
}

/* Alternate Reality Timeline Simulator */
function initSimulation() {
    const ambitionRange = document.getElementById('ambition-range');
    const moralityRange = document.getElementById('morality-range');
    const ambitionVal = document.getElementById('ambition-val');
    const moralityVal = document.getElementById('morality-val');
    const simOutputBox = document.getElementById('sim-output-box');

    if (!ambitionRange || !moralityRange || !simOutputBox) return;

    function updateSim() {
        const amb = parseInt(ambitionRange.value, 10);
        const mor = parseInt(moralityRange.value, 10);

        if (ambitionVal) ambitionVal.value = amb + '%';
        if (moralityVal) moralityVal.value = mor + '%';

        let dimName = 'C-137';
        let desc = '';

        if (amb > 70 && mor > 70) {
            dimName = 'DIMENSION ALPHA-1';
            desc = 'In this reality, you are the chief galactic architect who unified 40 solar systems into a peaceful utopia.';
        } else if (amb > 70 && mor <= 40) {
            dimName = 'DIMENSION OVERLORD-X';
            desc = 'In this timeline, you conquered the Central Finite Curve and rule with an iron fist across 12 sectors.';
        } else if (amb <= 40 && mor > 60) {
            dimName = 'DIMENSION ZEN-9';
            desc = 'In this reality, you live peacefully on a serene ocean planet writing universal philosophy poetry.';
        } else {
            dimName = 'DIMENSION MID-55';
            desc = 'In this timeline, you run an interplanetary coffee lounge on Titan with high customer satisfaction ratings.';
        }

        simOutputBox.innerHTML = `
            <strong class="output-dim">TARGET: ${dimName}</strong>
            <p class="output-desc">${desc}</p>
        `;
    }

    ambitionRange.addEventListener('input', updateSim);
    moralityRange.addEventListener('input', updateSim);
}