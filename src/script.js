const startDate = new Date('2024-11-28T00:00:00');

function computeDuration(from, to){
  // compute years, months, days, hours, minutes, seconds
  let years = to.getFullYear() - from.getFullYear();
  let months = to.getMonth() - from.getMonth();
  let days = to.getDate() - from.getDate();
  let hours = to.getHours() - from.getHours();
  let minutes = to.getMinutes() - from.getMinutes();
  let seconds = to.getSeconds() - from.getSeconds();

  if(seconds < 0){ seconds += 60; minutes -= 1 }
  if(minutes < 0){ minutes += 60; hours -= 1 }
  if(hours < 0){ hours += 24; days -= 1 }
  if(days < 0){
    // borrow from previous month
    const prevMonth = new Date(to.getFullYear(), to.getMonth(), 0).getDate();
    days += prevMonth; months -= 1;
  }
  if(months < 0){ months += 12; years -= 1 }

  return {years, months, days, hours, minutes, seconds};
}

function updateCounter(){
  const now = new Date();
  const d = computeDuration(startDate, now);
  const el = document.getElementById('counter');
  el.textContent = `${d.years} años · ${d.months} meses · ${d.days} días`;
  if(el){
    el.classList.add('pulse');
    setTimeout(()=> el.classList.remove('pulse'), 700);
  }
}

// run once and every second
updateCounter();
setInterval(updateCounter, 1000);

// Gallery lightbox
const gallery = document.getElementById('gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxQuote = document.getElementById('lightboxQuote');
const closeLightbox = document.getElementById('closeLightbox');

gallery.addEventListener('click', (e) => {
  const card = e.target.closest('figure.card');
  if(!card) return;
  const img = card.querySelector('img');
  const quote = card.dataset.quote || '';
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt || '';
  lightboxQuote.textContent = quote;
  if(typeof lightbox.showModal === 'function'){
    lightbox.showModal();
    lightbox.classList.add('open');
  }
});

closeLightbox.addEventListener('click', () => { lightbox.classList.remove('open'); lightbox.close(); });
lightbox.addEventListener('click', (e)=>{ if(e.target === lightbox){ lightbox.classList.remove('open'); lightbox.close() } });

// floating hearts
const heartsContainer = document.getElementById('hearts');
function spawnHeart(){
  const heart = document.createElement('div');
  heart.className = 'heart';
  const size = 12 + Math.random()*28; // px
  heart.style.width = `${size}px`;
  heart.style.height = `${size}px`;
  heart.style.left = `${20 + Math.random()*60}%`;
  heart.style.bottom = '-30px';
  heart.style.background = `linear-gradient(135deg, ${'#ff6a88'}, ${'#ff3d6b'})`;
  heart.style.opacity = 0.95;
  const duration = 4000 + Math.random()*3000;
  heart.style.animationDuration = `${duration}ms`;
  heart.classList.add('animate');
  heartsContainer.appendChild(heart);
  setTimeout(()=>{ heart.remove() }, duration+100);
}

// spawn a few hearts periodically
setInterval(spawnHeart, 800);

// small reveal for headings
window.addEventListener('load', ()=>{
  // flag for CSS entrance animations
  document.body.classList.add('loaded');
  // nav toggle for mobile
  // nav toggle for mobile
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if(navToggle && navLinks){
    navToggle.addEventListener('click', ()=>{
      const open = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
  // smooth scroll for nav links
  document.querySelectorAll('.site-nav a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if(target) target.scrollIntoView({behavior:'smooth',block:'start'});
      if(navLinks) navLinks.classList.remove('open');
    });
  });

  // moments slider behavior
  const slider = document.getElementById('momentsSlider');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  if(slider){
    const scrollByAmount = () => slider.clientWidth * 0.86;
    prevBtn && prevBtn.addEventListener('click', ()=>{ slider.classList.add('anim'); slider.scrollBy({left: -scrollByAmount(), behavior: 'smooth'}); setTimeout(()=>slider.classList.remove('anim'),420); });
    nextBtn && nextBtn.addEventListener('click', ()=>{ slider.classList.add('anim'); slider.scrollBy({left: scrollByAmount(), behavior: 'smooth'}); setTimeout(()=>slider.classList.remove('anim'),420); });
    // allow keyboard navigation when slider focused
    slider.tabIndex = 0;
    slider.addEventListener('keydown', (e)=>{
      if(e.key === 'ArrowLeft') slider.scrollBy({left: -scrollByAmount(), behavior:'smooth'});
      if(e.key === 'ArrowRight') slider.scrollBy({left: scrollByAmount(), behavior:'smooth'});
    });

    // Click on slider images opens lightbox
    slider.addEventListener('click', (e)=>{
      const slide = e.target.closest('.slide');
      if(!slide) return;
      const img = slide.querySelector('img');
      if(!img) return;
      // show in lightbox
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt || '';
      lightboxQuote.textContent = img.alt || '';
      if(typeof lightbox.showModal === 'function'){
        lightbox.showModal();
        lightbox.classList.add('open');
        // focus close button for accessibility
        closeLightbox.focus();
      }
    });

    // Autoplay behavior for slider
    let autoplayTimer = null;
    const startAutoplay = ()=>{
      if(autoplayTimer) clearInterval(autoplayTimer);
      autoplayTimer = setInterval(()=>{
        const maxScroll = slider.scrollWidth - slider.clientWidth;
        // if near end, loop to start
        if(slider.scrollLeft + 10 >= maxScroll){
          slider.scrollTo({left:0, behavior:'smooth'});
        } else {
          slider.scrollBy({left: scrollByAmount(), behavior:'smooth'});
        }
      }, 3500);
    };
    const stopAutoplay = ()=>{ if(autoplayTimer){ clearInterval(autoplayTimer); autoplayTimer = null; } };

    // pause on hover / focus for better UX
    slider.addEventListener('mouseenter', stopAutoplay);
    slider.addEventListener('mouseleave', startAutoplay);
    slider.addEventListener('focusin', stopAutoplay);
    slider.addEventListener('focusout', startAutoplay);

    // start autoplay
    startAutoplay();
  }
});
