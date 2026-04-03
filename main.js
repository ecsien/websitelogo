
/* 
   SAYFA YÜKLENDİĞİNDE ÇALIŞACAK FONKSİYONLAR
 */
document.addEventListener('DOMContentLoaded', () => {
  initHeroSlider();
  initSingleSlider();
  initProductSlider();
});

/* 
   HERO SLIDER
   - Ana sayfanın üst kısmındaki büyük slider
 */
function initHeroSlider() {
  const slider = document.getElementById('heroSlider');
  const slidesWrap = document.getElementById('heroSlides');
  const dotsWrap = document.getElementById('heroDots');
  const counter = document.getElementById('heroCounter');
  const progressBar = document.getElementById('heroProgress');
  const prevBtn = document.getElementById('heroPrev');
  const nextBtn = document.getElementById('heroNext');

  if (!slider || !slidesWrap || !dotsWrap || !counter || !progressBar) return;

  const slides = [
    {
      tag: 'Tek platformda yönetim',
      title: 'İnsan kaynaklarında uçtan uca dijital yönetim',
      desc: 'İşe alımdan bordroya, performanstan yan haklara kadar tüm İK süreçlerini tek platformda yönetin; çalışan deneyimini ve verimliliği artırın.',
      button: 'İnsan Kaynakları çözümlerini inceleyin',
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1100&q=80',
      bubble: 'Tek<br>Platformda',
      cardImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80',
      cardLabel: 'İşletmenize uygun',
      cardTitle: 'Logo çözümleri için sizi arayalım!',
      cardBtn: 'Fiyat alın'
    },
    {
      tag: 'Satış süreçlerini güçlendirin',
      title: 'Tekliften müşteri takibine kadar dijital satış deneyimi',
      desc: 'Potansiyel müşterilerinizi tek sistemde toplayın, teklif süreçlerini hızlandırın ve ekip verimliliğini artırın.',
      button: 'Satış çözümlerini inceleyin',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1100&q=80',
      bubble: 'Daha<br>Hızlı',
      cardImage: 'https://images.unsplash.com/photo-1573497019418-b400bb3ab074?auto=format&fit=crop&w=500&q=80',
      cardLabel: 'Ekibinize uygun',
      cardTitle: 'Satış çözümleri için hemen görüşelim!',
      cardBtn: 'Detay alın'
    },
    {
      tag: 'Kurumsal verimlilik',
      title: 'Operasyonlarınızı sadeleştiren kurumsal yazılım çözümleri',
      desc: 'Form yönetimi, başvuru toplama, müşteri talepleri ve iç operasyon akışlarını modern bir altyapıyla tek yerde yönetin.',
      button: 'Operasyon çözümlerini inceleyin',
      image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1100&q=80',
      bubble: 'Verimli<br>Sistem',
      cardImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=500&q=80',
      cardLabel: 'Kuruma özel',
      cardTitle: 'Dijital dönüşüm için sizinle iletişime geçelim!',
      cardBtn: 'Teklif isteyin'
    }
  ];

  const duration = 5000;
  let current = 0;
  let timer = null;
  let progressTimer = null;

  function buildSlides() {
    slidesWrap.innerHTML = slides.map((slide, index) => `
      <article class="slide ${index === 0 ? 'active' : ''}">
        <div class="left">
          <span class="hero-tag">${slide.tag}</span>
          <h1>${slide.title}</h1>
          <p>${slide.desc}</p>
          <a class="btn btn-primary" href="iletisim.html">${slide.button} <span>›</span></a>
        </div>

        <div class="visual-wrap">
          <img class="main-visual" src="${slide.image}" alt="">
          <div class="bubble">${slide.bubble}</div>
        </div>

        <div class="card-red">
          <div>
            <div class="card-top">
              <img src="${slide.cardImage}" alt="">
              <div class="shape-red"></div>
              <div class="shape-tri"></div>
              <div class="shape-call">☎</div>
            </div>
            <small>${slide.cardLabel}</small>
            <h3>${slide.cardTitle}</h3>
          </div>

          <a href="iletisim.html" class="secondary-btn">${slide.cardBtn}</a>
        </div>
      </article>
    `).join('');

    dotsWrap.innerHTML = slides.map((_, index) => `
      <button class="dot ${index === 0 ? 'active' : ''}" data-index="${index}" aria-label="Slide ${index + 1}"></button>
    `).join('');
  }

  function updateCounter() {
    counter.textContent = `${String(current + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
  }

  function updateDots() {
    document.querySelectorAll('.dot').forEach((dot, index) => {
      dot.classList.toggle('active', index === current);
    });
  }

  function showSlide(index) {
    document.querySelectorAll('.slide').forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    current = index;
    updateCounter();
    updateDots();
    restartAuto();
  }

  function nextSlide() {
    showSlide((current + 1) % slides.length);
  }

  function prevSlide() {
    showSlide((current - 1 + slides.length) % slides.length);
  }

  function startProgress() {
    clearInterval(progressTimer);
    let elapsed = 0;
    progressBar.style.width = '0%';

    progressTimer = setInterval(() => {
      elapsed += 50;
      progressBar.style.width = Math.min((elapsed / duration) * 100, 100) + '%';
      if (elapsed >= duration) clearInterval(progressTimer);
    }, 50);
  }

  function restartAuto() {
    clearInterval(timer);
    startProgress();
    timer = setInterval(nextSlide, duration);
  }

  buildSlides();
  updateCounter();
  startProgress();
  timer = setInterval(nextSlide, duration);

  prevBtn?.addEventListener('click', prevSlide);
  nextBtn?.addEventListener('click', nextSlide);

  dotsWrap.addEventListener('click', (e) => {
    if (e.target.classList.contains('dot')) {
      showSlide(Number(e.target.dataset.index));
    }
  });

  slider.addEventListener('mouseenter', () => {
    clearInterval(timer);
    clearInterval(progressTimer);
  });

  slider.addEventListener('mouseleave', restartAuto);
}

/* 
   TEKLİ GÖRSEL SLIDER
 */
function initSingleSlider() {
  const slides = document.querySelectorAll('.single-slide');
  const prev = document.getElementById('singlePrev');
  const next = document.getElementById('singleNext');
  if (!slides.length || !prev || !next) return;

  let current = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    current = index;
  }

  function nextSlide() {
    showSlide((current + 1) % slides.length);
  }

  function prevSlide() {
    showSlide((current - 1 + slides.length) % slides.length);
  }

  prev.addEventListener('click', prevSlide);
  next.addEventListener('click', nextSlide);
  setInterval(nextSlide, 4000);
}

/* 
   ÜRÜN KART SLIDER
 */
function initProductSlider() {
  const slider = document.getElementById('productSlider');
  const track = document.getElementById('productTrack');
  const prev = document.getElementById('productPrev');
  const next = document.getElementById('productNext');

  if (!slider || !track || !prev || !next) return;

  const cards = Array.from(track.querySelectorAll('.product-card'));
  if (!cards.length) return;

  let currentIndex = 0;
  let autoTimer = null;

  function getVisibleCount() {
    if (window.innerWidth <= 700) return 1;
    if (window.innerWidth <= 1100) return 2;
    return 3;
  }

  function getStepWidth() {
    const cardWidth = cards[0].getBoundingClientRect().width;
    return cardWidth + 18;
  }

  function updateSlider() {
    const visibleCount = getVisibleCount();
    const maxIndex = Math.max(0, cards.length - visibleCount);

    if (currentIndex > maxIndex) currentIndex = maxIndex;

    const offset = currentIndex * getStepWidth();
    track.style.transform = `translateX(-${offset}px)`;
  }

  function nextSlide() {
    const visibleCount = getVisibleCount();
    const maxIndex = Math.max(0, cards.length - visibleCount);
    currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
    updateSlider();
  }

  function prevSlide() {
    const visibleCount = getVisibleCount();
    const maxIndex = Math.max(0, cards.length - visibleCount);
    currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
    updateSlider();
  }

  function startAuto() {
    stopAuto();
    autoTimer = setInterval(nextSlide, 3500);
  }

  function stopAuto() {
    if (autoTimer) clearInterval(autoTimer);
  }

  next.addEventListener('click', nextSlide);
  prev.addEventListener('click', prevSlide);

  slider.addEventListener('mouseenter', stopAuto);
  slider.addEventListener('mouseleave', startAuto);
  window.addEventListener('resize', updateSlider);

  updateSlider();
  startAuto();
}
