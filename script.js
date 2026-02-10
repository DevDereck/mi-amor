// Modal Valentine 
window.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('valentineModal');
  const mainContent = document.getElementById('mainContent');
  const btnYes = document.getElementById('valentineYes');
  const btnNo = document.getElementById('valentineNo');
  const envelope = document.getElementById('valentineEnvelope');
  const btnEnter = document.getElementById('valentineEnter');
  let moveCount = 0;
  if (btnNo) {
    btnNo.addEventListener('mouseenter', () => {
      moveCount++;
      const parent = btnNo.parentElement;
      btnNo.style.position = 'relative';
      btnNo.style.transition = 'transform .22s';
      const dx = (Math.random() > 0.5 ? 1 : -1) * (60 + Math.random() * 40);
      const dy = (Math.random() > 0.5 ? 1 : -1) * (20 + Math.random() * 20);
      btnNo.style.transform = `translate(${dx}px, ${dy}px)`;
      setTimeout(() => { btnNo.style.transform = ''; }, 700);
    });
    btnNo.addEventListener('click', (e) => {
      e.preventDefault();
      btnNo.dispatchEvent(new Event('mouseenter'));
    });
  }
  if (btnYes) {
    btnYes.addEventListener('click', () => {
      document.querySelector('.valentine-card').style.display = 'none';
      envelope.style.display = 'flex';
    });
  }
  if (btnEnter) {
    btnEnter.addEventListener('click', () => {
      modal.style.display = 'none';
      envelope.style.display = 'none';
      mainContent.style.display = 'block';
      document.body.style.overflow = 'auto';
    });
  }
  // Oculta el contenido principal hasta aceptar
  if (mainContent) mainContent.style.display = 'none';
  document.body.style.overflow = 'hidden';
});
// --- Canciones Favoritas con Firestore ---
const cancionesList = document.getElementById('cancionesList');
const agregarCancionForm = document.getElementById('agregarCancionForm');

function renderCancionFirestore(id, trackId, titulo, artista) {
  const iframe = document.createElement('iframe');
  iframe.style.borderRadius = '12px';
  iframe.src = `https://open.spotify.com/embed/track/${trackId}?utm_source=generator`;
  iframe.width = '100%';
  iframe.height = '80';
  iframe.frameBorder = '0';
  iframe.allow = 'autoplay; clipboard-write; encrypted-media; picture-in-picture';
  iframe.loading = 'lazy';
  const card = document.createElement('div');
  card.className = 'cancion-card';
  card.appendChild(iframe);
  const info = document.createElement('div');
  info.className = 'cancion-info';
  // Botón abrir en Spotify
  const abrirBtn = document.createElement('a');
  abrirBtn.className = 'abrir-spotify-btn';
  abrirBtn.href = `https://open.spotify.com/track/${trackId}`;
  abrirBtn.target = '_blank';
  abrirBtn.rel = 'noopener noreferrer';
  abrirBtn.textContent = 'Abrir en Spotify';
  info.appendChild(abrirBtn);
  card.appendChild(info);
  // Botón eliminar
  const btn = document.createElement('button');
  btn.className = 'eliminar-cancion-btn';
  btn.title = 'Eliminar canción';
  btn.innerHTML = '✕';
  btn.onclick = function() {
    eliminarCancionFirestore(id);
  };
  card.appendChild(btn);
  cancionesList.appendChild(card);
}

function eliminarCancionFirestore(id) {
  db.collection('cancionesFavoritas').doc(id).delete();
}

function cargarCancionesFirestore() {
  db.collection('cancionesFavoritas').orderBy('timestamp').onSnapshot(snapshot => {
    cancionesList.innerHTML = '';
    snapshot.forEach(doc => {
      const data = doc.data();
      renderCancionFirestore(doc.id, data.trackId, data.titulo, data.artista);
    });
  });
}

if (agregarCancionForm) {
  cargarCancionesFirestore();
  agregarCancionForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const url = document.getElementById('spotifyUrl').value.trim();
    const titulo = document.getElementById('tituloCancion').value.trim();
    const artista = document.getElementById('artistaCancion').value.trim();
    // Permite URLs con o sin segmento de idioma (ej: /intl-es/) antes de /track/
    const match = url.match(/(?:https?:\/\/)?open\.spotify\.com\/(?:[a-zA-Z0-9-]+\/)?track\/([a-zA-Z0-9]+)(?:[/?].*)?/);
    if (!match) {
      alert('Por favor ingresa una URL válida de canción de Spotify.');
      return;
    }
    const trackId = match[1];
    db.collection('cancionesFavoritas').add({
      trackId,
      titulo,
      artista,
      timestamp: Date.now()
    });
    agregarCancionForm.reset();
  });
}

const startDate = new Date('2024-11-28T00:00:00');

function computeDuration(from, to){
  let years = to.getUTCFullYear() - from.getUTCFullYear();
  let months = to.getUTCMonth() - from.getUTCMonth();
  let days = to.getUTCDate() - from.getUTCDate();
  let hours = to.getUTCHours() - from.getUTCHours();
  let minutes = to.getUTCMinutes() - from.getUTCMinutes();
  let seconds = to.getUTCSeconds() - from.getUTCSeconds();

  if(seconds < 0){ seconds += 60; minutes -= 1; }
  if(minutes < 0){ minutes += 60; hours -= 1; }
  if(hours < 0){ hours += 24; days -= 1; }
  if(days < 0){
    const prevMonthDays = new Date(Date.UTC(to.getUTCFullYear(), to.getUTCMonth(), 0)).getUTCDate();
    days += prevMonthDays; months -= 1;
  }
  if(months < 0){ months += 12; years -= 1; }

  return {years, months, days, hours, minutes, seconds};
}

function updateCounter(){
  const now = new Date();
  const d = computeDuration(startDate, now);
  const el = document.getElementById('counter');
  function plural(n, singular, pluralForm){
    return `${n} ${n === 1 ? singular : pluralForm}`;
  }

  function formatMonthsDays(obj){
    const totalMonths = (obj.years || 0) * 12 + (obj.months || 0);
    const monthsLabel = `${totalMonths} ${totalMonths === 1 ? 'mes' : 'meses'}`;
    const days = obj.days || 0;
    const daysLabel = `${days} ${days === 1 ? 'día' : 'días'}`;
    return `${monthsLabel} · ${daysLabel}`;
  }

  if(el){
    el.textContent = formatMonthsDays(d);
    el.classList.add('pulse');
    setTimeout(()=> el.classList.remove('pulse'), 700);
  }
}

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
  const size = 12 + Math.random()*28;
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

setInterval(spawnHeart, 800);

window.addEventListener('load', ()=>{
  document.body.classList.add('loaded');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if(navToggle && navLinks){
    navToggle.addEventListener('click', ()=>{
      const open = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
  document.querySelectorAll('.site-nav a[href^=\"#\"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if(target) target.scrollIntoView({behavior:'smooth',block:'start'});
      if(navLinks) navLinks.classList.remove('open');
    });
  });

  const slider = document.getElementById('momentsSlider');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  if(slider){
    const scrollByAmount = () => slider.clientWidth * 0.86;
    prevBtn && prevBtn.addEventListener('click', ()=>{ slider.classList.add('anim'); slider.scrollBy({left: -scrollByAmount(), behavior: 'smooth'}); setTimeout(()=>slider.classList.remove('anim'),420); });
    nextBtn && nextBtn.addEventListener('click', ()=>{ slider.classList.add('anim'); slider.scrollBy({left: scrollByAmount(), behavior: 'smooth'}); setTimeout(()=>slider.classList.remove('anim'),420); });
    slider.tabIndex = 0;
    slider.addEventListener('keydown', (e)=>{
      if(e.key === 'ArrowLeft') slider.scrollBy({left: -scrollByAmount(), behavior:'smooth'});
      if(e.key === 'ArrowRight') slider.scrollBy({left: scrollByAmount(), behavior:'smooth'});
    });

    slider.addEventListener('click', (e)=>{
      const slide = e.target.closest('.slide');
      if(!slide) return;
      const img = slide.querySelector('img');
      if(!img) return;
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt || '';
      lightboxQuote.textContent = img.alt || '';
      if(typeof lightbox.showModal === 'function'){
        lightbox.showModal();
        lightbox.classList.add('open');
        closeLightbox.focus();
      }
    });

    let autoplayTimer = null;
    const startAutoplay = ()=>{
      if(autoplayTimer) clearInterval(autoplayTimer);
      autoplayTimer = setInterval(()=>{
        const maxScroll = slider.scrollWidth - slider.clientWidth;
        if(slider.scrollLeft + 10 >= maxScroll){
          slider.scrollTo({left:0, behavior:'smooth'});
        } else {
          slider.scrollBy({left: scrollByAmount(), behavior:'smooth'});
        }
      }, 3500);
    };
    const stopAutoplay = ()=>{ if(autoplayTimer){ clearInterval(autoplayTimer); autoplayTimer = null; } };

    slider.addEventListener('mouseenter', stopAutoplay);
    slider.addEventListener('mouseleave', startAutoplay);
    slider.addEventListener('focusin', stopAutoplay);
    slider.addEventListener('focusout', startAutoplay);

    startAutoplay();
  }
});

// --- VIDEO LOOP EN CELULARES ---
const heroVideo = document.getElementById('heroVideo');
if (heroVideo) {
  // Forzar loop y autoplay en móviles (algunos navegadores requieren reiniciar el video al terminar)
  heroVideo.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
  });
  // iOS: asegurar que playsinline esté presente
  heroVideo.setAttribute('playsinline', '');
  heroVideo.setAttribute('muted', '');
  heroVideo.setAttribute('autoplay', '');
  heroVideo.setAttribute('loop', '');
}