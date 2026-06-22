/* ============================================
   STARS ANIMATION
   ============================================ */
const canvas = document.getElementById('sc');
const ctx = canvas.getContext('2d');
let stars = [];

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}

function initStars() {
  stars = [];
  const count = Math.floor((canvas.width * canvas.height) / 6000);
  for (let i = 0; i < count; i++) {
    stars.push({
      x:    Math.random() * canvas.width,
      y:    Math.random() * canvas.height,
      r:    Math.random() * 1.2 + 0.2,
      a:    Math.random(),
      da:   (Math.random() - 0.5) * 0.008,
      speed: Math.random() * 0.15 + 0.05,
    });
  }
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(s => {
    s.a += s.da;
    if (s.a < 0.05 || s.a > 1) s.da *= -1;

    s.y -= s.speed;
    if (s.y < 0) {
      s.y = canvas.height;
      s.x = Math.random() * canvas.width;
    }

    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(200, 220, 255, ${s.a})`;
    ctx.fill();
  });
  requestAnimationFrame(drawStars);
}

// Init stars
resizeCanvas();
initStars();
drawStars();

// Reinit on resize
window.addEventListener('resize', () => {
  resizeCanvas();
  initStars();
});

/* ============================================
   3D CARD TILT
   ============================================ */
const card = document.getElementById('card3d');

card.addEventListener('mousemove', (e) => {
  const rect = card.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width  - 0.5;
  const y = (e.clientY - rect.top)  / rect.height - 0.5;

  card.style.transform = `rotateX(${-y * 14}deg) rotateY(${x * 14}deg) scale(1.02)`;
});

card.addEventListener('mouseleave', () => {
  card.style.transform = 'rotateX(0) rotateY(0) scale(1)';
});

/* ============================================
   TOUCH TILT (mobile)
   ============================================ */
card.addEventListener('touchmove', (e) => {
  if (e.touches.length !== 1) return;
  const touch = e.touches[0];
  const rect  = card.getBoundingClientRect();
  const x = (touch.clientX - rect.left) / rect.width  - 0.5;
  const y = (touch.clientY - rect.top)  / rect.height - 0.5;

  card.style.transform = `rotateX(${-y * 8}deg) rotateY(${x * 8}deg) scale(1.01)`;
}, { passive: true });

card.addEventListener('touchend', () => {
  card.style.transform = 'rotateX(0) rotateY(0) scale(1)';
});
