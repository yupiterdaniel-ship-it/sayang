/* ==========================================================================
   ROMANTIC BIRTHDAY EXPERIENCE SCRIPT - 11 AGUSTUS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initBackgroundCanvas();
  initEnvelopeGate();
  initCakeInteractions();
  loadInitialWishes();
});

/* ==========================================================================
   1. BACKGROUND FLOATING PARTICLES & HEARTS CANVAS
   ========================================================================== */
function initBackgroundCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  let width, height;
  let particles = [];
  const particleCount = 45;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  
  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 20;
      this.size = Math.random() * 12 + 8;
      this.speedY = Math.random() * 0.8 + 0.3;
      this.speedX = Math.sin(Math.random() * Math.PI) * 0.5 - 0.25;
      this.opacity = Math.random() * 0.5 + 0.2;
      this.type = Math.random() > 0.4 ? 'heart' : 'sparkle';
      this.rotation = Math.random() * Math.PI * 2;
      this.rotSpeed = (Math.random() - 0.5) * 0.02;
    }

    update() {
      this.y -= this.speedY;
      this.x += Math.sin(this.y * 0.01) * 0.5;
      this.rotation += this.rotSpeed;

      if (this.y < -30) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.globalAlpha = this.opacity;

      if (this.type === 'heart') {
        ctx.fillStyle = '#ff477e';
        ctx.beginPath();
        const d = this.size;
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-d / 2, -d / 2, -d, d / 3, 0, d);
        ctx.bezierCurveTo(d, d / 3, d / 2, -d / 2, 0, 0);
        ctx.fill();
      } else {
        // Star Sparkle
        ctx.fillStyle = '#ffd166';
        ctx.beginPath();
        ctx.arc(0, 0, this.size / 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#ffd166';
      }

      ctx.restore();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();

  // Mouse sparkle trail
  window.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.85) {
      const p = new Particle();
      p.x = e.clientX;
      p.y = e.clientY;
      p.speedY = Math.random() * 1.5 + 0.5;
      p.opacity = 0.8;
      particles.push(p);
      if (particles.length > particleCount + 20) particles.shift();
    }
  });
}

/* ==========================================================================
   2. ENVELOPE GATE INTERACTION
   ========================================================================== */
function initEnvelopeGate() {
  const gate = document.getElementById('envelope-gate');
  const envelope = document.querySelector('.envelope');
  const btnOpen = document.getElementById('btn-open-experience');
  const mainApp = document.getElementById('main-app');

  function openEnvelopeSequence() {
    if (envelope) envelope.classList.add('open');

    // Initial festive confetti
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }

    setTimeout(() => {
      if (gate) gate.classList.add('fade-out');
      if (mainApp) mainApp.classList.remove('hidden');

      // Heart confetti explosion on main page reveal
      setTimeout(() => {
        if (typeof confetti === 'function') {
          confetti({
            particleCount: 120,
            spread: 100,
            origin: { y: 0.4 },
            colors: ['#ff477e', '#ffb3c1', '#ffd166', '#ffffff']
          });
        }
      }, 400);
    }, 1100);
  }

  const waxSeal = document.getElementById('wax-seal');
  if (waxSeal) waxSeal.addEventListener('click', openEnvelopeSequence);
  if (btnOpen) btnOpen.addEventListener('click', openEnvelopeSequence);
}

/* ==========================================================================
   4. BIRTHDAY CAKE & CANDLE BLOWING
   ========================================================================== */
let candleBlown = false;

function initCakeInteractions() {
  const btnBlow = document.getElementById('btn-blow-candle');
  const candleFlame = document.getElementById('candle-flame');
  const candleSmoke = document.getElementById('candle-smoke');
  const wishReveal = document.getElementById('wish-reveal-box');
  const hint = document.getElementById('candle-status-hint');
  const btnText = document.getElementById('blow-btn-text');

  if (!btnBlow) return;

  btnBlow.addEventListener('click', () => {
    if (candleBlown) {
      // Re-light candle if already blown
      candleBlown = false;
      if (candleFlame) candleFlame.classList.remove('blown-out');
      if (candleSmoke) candleSmoke.classList.add('hidden');
      if (wishReveal) wishReveal.classList.add('hidden');
      if (btnText) btnText.innerHTML = 'Tiup Lilin Sekarang! 🕯️';
      if (hint) hint.innerHTML = '💡 Klik tombol di atas untuk meniup lilin dan membuat keajaiban!';
      return;
    }

    candleBlown = true;

    // Extinguish Flame & Smoke Animation
    if (candleFlame) candleFlame.classList.add('blown-out');
    if (candleSmoke) candleSmoke.classList.remove('hidden');

    // Chime & Confetti / Fireworks
    playChimeEffect(1046.5); // High celebration chime

    if (typeof confetti === 'function') {
      // 3-wave fireworks confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff477e', '#ff758f', '#ffd166']
      });

      setTimeout(() => {
        confetti({
          particleCount: 150,
          angle: 60,
          spread: 80,
          origin: { x: 0, y: 0.7 }
        });
      }, 300);

      setTimeout(() => {
        confetti({
          particleCount: 150,
          angle: 120,
          spread: 80,
          origin: { x: 1, y: 0.7 }
        });
      }, 600);
    }

    // Reveal Wish Granted Box
    setTimeout(() => {
      if (wishReveal) wishReveal.classList.remove('hidden');
      if (btnText) btnText.innerHTML = 'Nyalakan Lilin Kembali 🕯️';
      if (hint) hint.innerHTML = '✨ Lilin telah ditiup & semua doa terbaikmu sedang terbang menuju langit!';
    }, 700);
  });
}

/* ==========================================================================
   5. REASONS CARD FLIP & LOVE COUPONS
   ========================================================================== */
function flipCard(cardElement) {
  if (!cardElement) return;
  cardElement.classList.toggle('is-flipped');
  playChimeEffect(659.25);
}

function claimCoupon(couponElement) {
  if (!couponElement) return;
  const stamp = couponElement.querySelector('.claimed-stamp');
  const btn = couponElement.querySelector('.btn-claim-coupon');

  if (stamp && stamp.classList.contains('hidden')) {
    stamp.classList.remove('hidden');
    if (btn) btn.style.display = 'none';

    playChimeEffect(783.99);

    if (typeof confetti === 'function') {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.7 },
        colors: ['#00f090', '#ffd166', '#ff477e']
      });
    }
  }
}

/* ==========================================================================
   6. WISH BOX & LOCAL STORAGE
   ========================================================================== */
function submitWish(e) {
  e.preventDefault();
  const nameInput = document.getElementById('sender-name');
  const msgInput = document.getElementById('wish-message');

  if (!nameInput || !msgInput) return;

  const sender = nameInput.value.trim();
  const message = msgInput.value.trim();

  if (!sender || !message) return;

  const newWish = {
    sender,
    message,
    date: '11 Agustus'
  };

  saveWishToStorage(newWish);
  renderWishItem(newWish, true);

  // Floating Balloon & Confetti Celebration
  createFloatingBalloon(sender);
  playChimeEffect(987.77);

  if (typeof confetti === 'function') {
    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.8 }
    });
  }

  // Reset form
  msgInput.value = '';
}

function createFloatingBalloon(senderName) {
  const balloon = document.createElement('div');
  balloon.className = 'floating-wish-balloon';
  balloon.innerHTML = `🎈 <span>${senderName}</span>`;
  balloon.style.position = 'fixed';
  balloon.style.left = `${Math.random() * 60 + 20}%`;
  balloon.style.bottom = '0px';
  balloon.style.fontSize = '2.2rem';
  balloon.style.color = '#fff';
  balloon.style.zIndex = '99999';
  balloon.style.pointerEvents = 'none';
  balloon.style.transition = 'all 3.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
  balloon.style.opacity = '1';

  document.body.appendChild(balloon);

  setTimeout(() => {
    balloon.style.transform = 'translateY(-120vh) scale(1.3)';
    balloon.style.opacity = '0';
  }, 50);

  setTimeout(() => {
    balloon.remove();
  }, 3600);
}

function saveWishToStorage(wish) {
  let wishes = JSON.parse(localStorage.getItem('romantic_wishes_11aug') || '[]');
  wishes.unshift(wish);
  localStorage.setItem('romantic_wishes_11aug', JSON.stringify(wishes));
}

function loadInitialWishes() {
  const container = document.getElementById('wishes-list');
  if (!container) return;

  let wishes = [
    {
      sender: 'Pacarmu Tercinta ❤️',
      message: 'Happy birthday yaa sayang! Seneng banget ini pertama kalinya aku bisa ngerayain ulang tahun kamu bareng. Semoga kita bisa terus bareng ngerayain ulang tahun berikutnya yaa!',
      date: '11 Agustus'
    },
    {
      sender: 'Orang yang Selalu Sayang Kamu 🌸',
      message: 'Selamat ulang tahun pertama kita bareng! Semoga kamu selalu sehat, bahagia terus, dan semua impian kamu dilancarkan ya bidadariku.',
      date: '11 Agustus'
    }
  ];
  
  const stored = localStorage.getItem('romantic_wishes_11aug');
  if (stored) {
    try {
      wishes = JSON.parse(stored);
    } catch(e) {}
  } else {
    localStorage.setItem('romantic_wishes_11aug', JSON.stringify(wishes));
  }

  container.innerHTML = '';
  wishes.forEach(w => renderWishItem(w, false));
}

function renderWishItem(wish, isNew = false) {
  const container = document.getElementById('wishes-list');
  if (!container) return;

  const item = document.createElement('div');
  item.className = 'wish-card-item';
  item.innerHTML = `
    <div class="wish-card-sender">
      <span><i class="fa-solid fa-heart"></i> ${escapeHtml(wish.sender)}</span>
      <span class="wish-card-date">${escapeHtml(wish.date)}</span>
    </div>
    <p class="wish-card-msg">${escapeHtml(wish.message)}</p>
  `;

  if (isNew) {
    container.prepend(item);
  } else {
    container.appendChild(item);
  }
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
