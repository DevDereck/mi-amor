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
  if(typeof lightbox.showModal === 'function') lightbox.showModal();
});

closeLightbox.addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', (e)=>{ if(e.target === lightbox) lightbox.close() });

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
