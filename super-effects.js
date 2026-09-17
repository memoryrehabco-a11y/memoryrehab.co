/**
 * ==========================================================================
 * MEMORY REHAB LAB — NEXT-GEN SUPER EFFECTS ENGINE
 * 3D Physics Tilt, Before/After Slider, Synthesized Web Audio ASMR,
 * Apothecary Skin Diagnostic Quiz, Canvas Confetti & Live Social Proof
 * ==========================================================================
 */

(function () {
  'use strict';

  /* ============================================================
     1. SYNTHESIZED WEB AUDIO ASMR HAPTICS ENGINE
     Zero external MP3 dependencies; pure browser sound synthesis.
     ============================================================ */
  const SoundFX = (function () {
    let ctx = null;
    let enabled = localStorage.getItem('mr_sound_fx') !== 'off'; // default to on

    function getContext() {
      if (!ctx && (window.AudioContext || window.webkitAudioContext)) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        ctx = new AudioCtx();
      }
      if (ctx && ctx.state === 'suspended') {
        ctx.resume();
      }
      return ctx;
    }

    function isEnabled() {
      return enabled;
    }

    function setEnabled(val) {
      enabled = !!val;
      localStorage.setItem('mr_sound_fx', enabled ? 'on' : 'off');
      updateSoundUI();
    }

    function toggle() {
      setEnabled(!enabled);
      if (enabled) {
        playDewdrop();
      }
      return enabled;
    }

    function updateSoundUI() {
      const btns = document.querySelectorAll('.sound-toggle-btn');
      btns.forEach(function (b) {
        const onIcon = b.querySelector('.sound-icon-on');
        const offIcon = b.querySelector('.sound-icon-off');
        if (onIcon && offIcon) {
          onIcon.style.display = enabled ? 'inline' : 'none';
          offIcon.style.display = enabled ? 'none' : 'inline';
        }
        b.setAttribute('title', enabled ? 'Sound Effects: ON (Click to mute)' : 'Sound Effects: MUTED (Click to unmute)');
        b.setAttribute('aria-label', enabled ? 'Sound Effects ON' : 'Sound Effects MUTED');
      });
    }

    // Subtle tactile acoustic click for nav tabs & buttons
    function playClick() {
      if (!enabled) return;
      const c = getContext();
      if (!c) return;
      try {
        const osc = c.createOscillator();
        const gain = c.createGain();
        const now = c.currentTime;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(650, now);
        osc.frequency.exponentialRampToValueAtTime(120, now + 0.035);

        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

        osc.connect(gain);
        gain.connect(c.destination);

        osc.start(now);
        osc.stop(now + 0.04);
      } catch (e) {}
    }

    // Soothing dewy droplet chime for Add-to-Cart, Wishlist & Quiz
    function playDewdrop() {
      if (!enabled) return;
      const c = getContext();
      if (!c) return;
      try {
        const now = c.currentTime;

        // Fundamental bell droplet
        const osc1 = c.createOscillator();
        const gain1 = c.createGain();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(1180, now);
        osc1.frequency.exponentialRampToValueAtTime(1760, now + 0.12);

        gain1.gain.setValueAtTime(0.12, now);
        gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

        osc1.connect(gain1);
        gain1.connect(c.destination);
        osc1.start(now);
        osc1.stop(now + 0.23);

        // Gentle sub-harmonic resonance
        const osc2 = c.createOscillator();
        const gain2 = c.createGain();
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(590, now);
        osc2.frequency.exponentialRampToValueAtTime(880, now + 0.14);

        gain2.gain.setValueAtTime(0.06, now);
        gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

        osc2.connect(gain2);
        gain2.connect(c.destination);
        osc2.start(now);
        osc2.stop(now + 0.21);
      } catch (e) {}
    }

    // Celebratory harmonic major triad chord for milestones & free shipping
    function playCelebration() {
      if (!enabled) return;
      const c = getContext();
      if (!c) return;
      try {
        const now = c.currentTime;
        const freqs = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
        freqs.forEach(function (f, i) {
          const osc = c.createOscillator();
          const gain = c.createGain();
          const start = now + i * 0.06;

          osc.type = 'sine';
          osc.frequency.setValueAtTime(f, start);

          gain.gain.setValueAtTime(0.1, start);
          gain.gain.exponentialRampToValueAtTime(0.001, start + 0.45);

          osc.connect(gain);
          gain.connect(c.destination);

          osc.start(start);
          osc.stop(start + 0.48);
        });
      } catch (e) {}
    }

    return {
      init: function () {
        updateSoundUI();
        document.addEventListener('click', function (e) {
          if (e.target.closest('.sound-toggle-btn')) {
            e.preventDefault();
            toggle();
            return;
          }
          if (e.target.closest('.card-add-cart-btn, #checkoutBtn, #modalAddCartBtn, .bundle-add-all-btn, #quizAddRoutineBtn')) {
            playDewdrop();
            return;
          }
          if (e.target.closest('.btn-primary, .btn-secondary, .filter-tab-btn, .theme-toggle-btn, .search-toggle-btn, .mob-tab, .search-tag-chip')) {
            playClick();
          }
        }, { passive: false });
      },
      playClick: playClick,
      playDewdrop: playDewdrop,
      playCelebration: playCelebration,
      toggle: toggle,
      isEnabled: isEnabled
    };
  })();

  /* ============================================================
     2. VIEWPORT READING PROGRESS BAR
     ============================================================ */
  function initReadingProgress() {
    const bar = document.getElementById('scrollProgressBar');
    if (!bar) return;

    function update() {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        const pct = Math.min(100, Math.max(0, (scrollY / maxScroll) * 100));
        bar.style.width = pct + '%';
      }
    }

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();
  }

  /* ============================================================
     3. 3D CARD PERSPECTIVE TILT & RADIAL SPOTLIGHT
     Buttery 60fps card tilt with hardware-accelerated transforms
     ============================================================ */
  function init3DCardTilt() {
    if (window.matchMedia('(hover: none) or (pointer: coarse)').matches) {
      return; // Disable on touch devices to conserve battery
    }

    const cards = document.querySelectorAll('.product-card, .hero-glass-card, .bundle-step-card');

    cards.forEach(function (card) {
      let isHovering = false;

      card.addEventListener('mouseenter', function () {
        isHovering = true;
        card.style.transition = 'transform 0.15s ease-out, box-shadow 0.25s ease';
      });

      card.addEventListener('mousemove', function (e) {
        if (!isHovering) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -6; // Max 6 deg
        const rotateY = ((x - centerX) / centerX) * 6;  // Max 6 deg

        card.style.setProperty('--mouse-x', x + 'px');
        card.style.setProperty('--mouse-y', y + 'px');

        card.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', function () {
        isHovering = false;
        card.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease';
        card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)';
      });
    });
  }

  /* ============================================================
     4. CLINICAL BEFORE & AFTER RECOVERY SLIDER
     Touch & mouse drag handle with responsive clip-path curtain
     ============================================================ */
  function initBeforeAfterSlider() {
    const container = document.getElementById('baSliderContainer');
    const curtain = document.getElementById('baCurtain');
    const handleLine = document.getElementById('baHandleLine');
    const handleBtn = document.getElementById('baHandleBtn');

    if (!container || !curtain || !handleLine || !handleBtn) return;

    let isDragging = false;
    let positionPct = 50;

    function setPosition(pct) {
      positionPct = Math.min(100, Math.max(0, pct));
      curtain.style.clipPath = `polygon(0 0, ${positionPct}% 0, ${positionPct}% 100%, 0 100%)`;
      handleLine.style.left = positionPct + '%';
      handleBtn.style.left = positionPct + '%';
    }

    function handleMove(clientX) {
      const rect = container.getBoundingClientRect();
      const x = clientX - rect.left;
      const pct = (x / rect.width) * 100;
      setPosition(pct);
    }

    function onPointerDown(e) {
      isDragging = true;
      handleMove(e.clientX || (e.touches && e.touches[0].clientX));
      SoundFX.playClick();
    }

    function onPointerMove(e) {
      if (!isDragging) return;
      handleMove(e.clientX || (e.touches && e.touches[0].clientX));
    }

    function onPointerUp() {
      isDragging = false;
    }

    // Mouse listeners
    container.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    // Touch listeners
    container.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp, { passive: true });

    // Initial state
    setPosition(50);
  }

  /* ============================================================
     5. APOTHECARY 60-SECOND SKIN DIAGNOSTIC QUIZ
     Algorithmic 3-step routine matching & 1-click cart addition
     ============================================================ */
  function initSkinQuiz() {
    const modal = document.getElementById('quizModal');
    const openBtns = document.querySelectorAll('.open-quiz-btn, #heroQuizBtn');
    const closeBtn = document.getElementById('closeQuizModal');
    if (!modal) return;

    let answers = {
      concern: null,
      sensitivity: null
    };

    const step1 = document.getElementById('quizStep1');
    const step2 = document.getElementById('quizStep2');
    const step3 = document.getElementById('quizStep3');
    const progressSteps = document.querySelectorAll('.quiz-progress-step');

    function openQuiz() {
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      showStep(1);
      SoundFX.playClick();
    }

    function closeQuiz() {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    function showStep(num) {
      if (step1) step1.classList.toggle('active', num === 1);
      if (step2) step2.classList.toggle('active', num === 2);
      if (step3) step3.classList.toggle('active', num === 3);

      progressSteps.forEach(function (dot, i) {
        dot.classList.toggle('active', i < num);
      });

      if (num === 3) {
        generateRecommendation();
      }
    }

    // Question option clicks
    modal.addEventListener('click', function (e) {
      const optBtn = e.target.closest('.quiz-card-btn');
      if (optBtn) {
        const question = optBtn.getAttribute('data-question');
        const val = optBtn.getAttribute('data-value');

        if (question === 'concern') {
          answers.concern = val;
          showStep(2);
          SoundFX.playClick();
        } else if (question === 'sensitivity') {
          answers.sensitivity = val;
          showStep(3);
          SoundFX.playDewdrop();
        }
      }
    });

    // Routine matching logic based on catalog data
    function generateRecommendation() {
      const routineItemsContainer = document.getElementById('quizRoutineItems');
      const recTitle = document.getElementById('quizRecTitle');
      const recSub = document.getElementById('quizRecSub');
      const totalPriceEl = document.getElementById('quizTotalPrice');
      const origPriceEl = document.getElementById('quizOrigPrice');

      if (!routineItemsContainer) return;

      // Select 3 optimal products based on skin concern
      let matchedProducts = [];
      const catalog = window.MEMORY_REHAB_CATALOG || [];

      if (answers.concern === 'acne') {
        if (recTitle) recTitle.textContent = 'Targeted Blemish & Congestion Recovery Routine';
        if (recSub) recSub.textContent = 'A non-stripping purifying protocol engineered to soothe redness, balance sebum, and heal barrier integrity.';
        matchedProducts = [
          catalog.find(p => p.id === '9') || { id: '9', name: 'Palm Culture™ Soap', price: 32000, step: 'Step 1: Cleanse', image: 'photo_2026-09-09_17-33-47.jpg' },
          catalog.find(p => p.id === '3') || { id: '3', name: 'Exile™ Acne Fix Cream', price: 39000, step: 'Step 2: Treat', image: 'photo_2026-09-09_17-34-01.jpg' },
          catalog.find(p => p.id === '1') || { id: '1', name: 'Faerie Dew™ Barrier Cream', price: 42000, step: 'Step 3: Seal', image: 'photo_2026-09-09_17-33-58.jpg' }
        ];
      } else if (answers.concern === 'hyperpigmentation') {
        if (recTitle) recTitle.textContent = 'Radiant Glow & Melanin Balancing Routine';
        if (recSub) recSub.textContent = 'Antioxidant-dense botanical actives that brighten stubborn dark marks without irritation or peeling.';
        matchedProducts = [
          catalog.find(p => p.id === '4') || { id: '4', name: 'Vita Sea™ Exfoliating Toner', price: 36000, step: 'Step 1: Prep', image: 'photo_2026-09-09_17-33-53.jpg' },
          catalog.find(p => p.id === '2') || { id: '2', name: 'For The Love Of Sun™ Serum', price: 48000, step: 'Step 2: Brighten', image: 'photo_2026-09-09_17-33-54.jpg' },
          catalog.find(p => p.id === '1') || { id: '1', name: 'Faerie Dew™ Barrier Cream', price: 42000, step: 'Step 3: Seal', image: 'photo_2026-09-09_17-33-58.jpg' }
        ];
      } else {
        // Default: Barrier Repair & Deep Hydration
        if (recTitle) recTitle.textContent = 'Clinical Barrier Rehabilitation Routine';
        if (recSub) recSub.textContent = 'Triple-ceramide lipid repair formulated at skin natural pH 5.5 to eliminate flakiness and seal hydration.';
        matchedProducts = [
          catalog.find(p => p.id === '6') || { id: '6', name: 'Blue Blooded™ Toner', price: 34000, step: 'Step 1: Prep', image: 'photo_2026-09-09_17-33-56.jpg' },
          catalog.find(p => p.id === '5') || { id: '5', name: 'Jade Lustre™ Youth Elixir', price: 46000, step: 'Step 2: Hydrate', image: 'photo_2026-09-09_17-33-55.jpg' },
          catalog.find(p => p.id === '1') || { id: '1', name: 'Faerie Dew™ Barrier Cream', price: 42000, step: 'Step 3: Seal', image: 'photo_2026-09-09_17-33-58.jpg' }
        ];
      }

      // Compute pricing with 15% routine bundle savings
      const subtotal = matchedProducts.reduce((sum, p) => sum + (Number(p.price) || 0), 0);
      const discounted = Math.round(subtotal * 0.85);

      if (totalPriceEl) totalPriceEl.textContent = '₦' + discounted.toLocaleString();
      if (origPriceEl) origPriceEl.textContent = '₦' + subtotal.toLocaleString();

      // Render product items
      routineItemsContainer.innerHTML = matchedProducts.map(p => `
        <div class="quiz-routine-item">
          <img src="${p.image || 'photo_2026-09-09_17-33-58.jpg'}" alt="${p.name}" />
          <div class="quiz-routine-meta">
            <span class="quiz-routine-step">${p.step || 'Routine Step'}</span>
            <div class="quiz-routine-name">${p.name}</div>
          </div>
          <div class="quiz-routine-price">₦${Number(p.price || 0).toLocaleString()}</div>
        </div>
      `).join('');

      // Wire 1-Click Routine Cart Add
      const addBtn = document.getElementById('quizAddRoutineBtn');
      if (addBtn) {
        addBtn.onclick = function () {
          matchedProducts.forEach(function (prod) {
            if (typeof window.addToCart === 'function') {
              window.addToCart(prod.id, prod.name, Number(prod.price), prod.image);
            }
          });
          closeQuiz();
          SoundFX.playCelebration();
          triggerConfetti();

          // Open cart drawer
          const cartBtn = document.getElementById('cartToggle');
          if (cartBtn) {
            setTimeout(() => cartBtn.click(), 300);
          }
        };
      }
    }

    openBtns.forEach(b => b.addEventListener('click', openQuiz));
    if (closeBtn) closeBtn.addEventListener('click', closeQuiz);
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeQuiz();
    });
    window.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('open')) closeQuiz();
    });
  }

  /* ============================================================
     6. LIVE SOCIAL PROOF ACTIVITY TOAST
     Subtle, authentic recent customer purchase alerts
     ============================================================ */
  function initSocialProof() {
    const toast = document.getElementById('socialProofToast');
    if (!toast) return;

    const purchases = [
      { name: 'Folake O.', city: 'Victoria Island, Lagos', item: 'Faerie Dew™ Barrier Face Cream', time: '3m ago', img: 'photo_2026-09-09_17-33-58.jpg' },
      { name: 'Zainab M.', city: 'Maitama, Abuja', item: '3-Step Rehabilitation Bundle', time: '8m ago', img: 'photo_2026-09-09_17-33-54.jpg' },
      { name: 'Chinedu E.', city: 'Lekki Phase 1', item: 'Exile™ Acne Fix Treatment Cream', time: '14m ago', img: 'photo_2026-09-09_17-34-01.jpg' },
      { name: 'Amina K.', city: 'GRA, Port Harcourt', item: 'For The Love Of Sun™ Serum', time: '21m ago', img: 'photo_2026-09-09_17-33-54.jpg' },
      { name: 'Omotola B.', city: 'Ikeja GRA, Lagos', item: 'Heavenly Buff™ Resurfacing Body Milk', time: '32m ago', img: 'photo_2026-09-09_17-33-52.jpg' },
      { name: 'Boma W.', city: 'Yaba, Lagos', item: 'Blue Blooded™ Restoring Toner', time: '45m ago', img: 'photo_2026-09-09_17-33-56.jpg' }
    ];

    let currentIndex = 0;
    let toastTimeout = null;

    function showNextToast() {
      const p = purchases[currentIndex % purchases.length];
      currentIndex++;

      toast.innerHTML = `
        <img class="sp-avatar" src="${p.img}" alt="${p.item}" />
        <div class="sp-body">
          <p class="sp-text"><strong>${p.name}</strong> from ${p.city} purchased <strong>${p.item}</strong></p>
          <span class="sp-time">⚡ Verified Order • ${p.time}</span>
        </div>
        <button type="button" class="sp-close" id="spCloseBtn" aria-label="Dismiss">✕</button>
        <div class="sp-progress" id="spProgressBar" style="animation: spProgressAnim 6s linear forwards;"></div>
      `;

      toast.classList.add('show');

      const closeBtn = document.getElementById('spCloseBtn');
      if (closeBtn) {
        closeBtn.onclick = function (e) {
          e.stopPropagation();
          hideToast();
        };
      }

      toastTimeout = setTimeout(hideToast, 6000);
    }

    function hideToast() {
      toast.classList.remove('show');
      if (toastTimeout) clearTimeout(toastTimeout);
      // Schedule next notification in 22 to 32 seconds
      const delay = Math.floor(Math.random() * 10000) + 22000;
      setTimeout(showNextToast, delay);
    }

    // Initial launch after 8 seconds of engagement
    setTimeout(showNextToast, 8000);
  }

  /* ============================================================
     7. FREE SHIPPING CELEBRATION CONFETTI ENGINE
     Lightweight canvas particle physics (0 external libraries)
     ============================================================ */
  function triggerConfetti() {
    let canvas = document.getElementById('celebrationCanvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'celebrationCanvas';
      canvas.className = 'confetti-canvas';
      document.body.appendChild(canvas);
    }

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#10b981', '#06b6d4', '#f59e0b', '#ec4899', '#8b5cf6', '#ffffff'];
    const particles = [];
    const count = 75;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height * 0.4,
        vx: (Math.random() - 0.5) * 16,
        vy: (Math.random() - 0.8) * 18,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 12,
        opacity: 1,
        gravity: 0.35
      });
    }

    let animId;
    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.rotation += p.rotSpeed;
        p.opacity -= 0.012;

        if (p.opacity > 0) {
          alive = true;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.max(0, p.opacity);
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
          ctx.restore();
        }
      }

      if (alive) {
        animId = requestAnimationFrame(render);
      } else {
        cancelAnimationFrame(animId);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }

    render();
  }

  // Monitor cart drawer subtotal for Free Shipping milestone
  function initCartCelebrationWatcher() {
    let hasCelebrated = false;
    const observer = new MutationObserver(function () {
      const shippingText = document.getElementById('shippingGoalText');
      if (shippingText && shippingText.textContent.includes('You qualify for FREE express shipping!')) {
        if (!hasCelebrated) {
          hasCelebrated = true;
          SoundFX.playCelebration();
          triggerConfetti();
        }
      } else {
        hasCelebrated = false;
      }
    });

    const shippingBar = document.querySelector('.cart-shipping-bar-wrap');
    if (shippingBar) {
      observer.observe(shippingBar, { childList: true, subtree: true, characterData: true });
    }
  }

  /* ============================================================
     8. ANIMATED NUMERIC COUNTERS
     ============================================================ */
  function initStatCounters() {
    const statItems = document.querySelectorAll('.hero-stats-row .stat-value');
    if (!statItems.length) return;

    let animated = false;
    const observer = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting && !animated) {
        animated = true;
        statItems.forEach(function (el) {
          el.style.transform = 'scale(1.08)';
          el.style.transition = 'transform 0.3s ease';
          setTimeout(() => { el.style.transform = 'scale(1)'; }, 350);
        });
      }
    }, { threshold: 0.5 });

    const row = document.querySelector('.hero-stats-row');
    if (row) observer.observe(row);
  }

  /* ============================================================
     DOCUMENT READY DISPATCHER
     ============================================================ */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

  function initAll() {
    SoundFX.init();
    initReadingProgress();
    init3DCardTilt();
    initBeforeAfterSlider();
    initSkinQuiz();
    initSocialProof();
    initCartCelebrationWatcher();
    initStatCounters();

    // Export API for global calls
    window.MemoryRehabFX = {
      SoundFX: SoundFX,
      triggerConfetti: triggerConfetti
    };
  }

})();
