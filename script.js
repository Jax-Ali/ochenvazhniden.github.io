const loadingScreen = document.querySelector('#loadingScreen');
const welcome = document.querySelector('#welcome');
const invitation = document.querySelector('#invitation');
const openInvitation = document.querySelector('#openInvitation');
const soundToggle = document.querySelector('#soundToggle');
const invitationMusic = document.querySelector('#invitationMusic');

window.addEventListener('load', () => window.setTimeout(() => loadingScreen.classList.add('is-hidden'), 450));

openInvitation.addEventListener('click', () => {
  welcome.classList.add('is-open');
  invitation.setAttribute('aria-hidden', 'false');
  document.body.style.overflowY = 'auto';
  window.setTimeout(() => document.body.classList.add('is-opened'), 70);
  setMusicPlaying(true);
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); } });
}, { threshold: 0.18 });
document.querySelectorAll('.reveal').forEach((item) => revealObserver.observe(item));

function setMusicPlaying(shouldPlay) {
  soundToggle.classList.toggle('is-playing', shouldPlay);
  soundToggle.setAttribute('aria-pressed', String(shouldPlay));
  soundToggle.setAttribute('aria-label', shouldPlay ? 'Әуенді өшіру' : 'Әуенді қосу');
  soundToggle.querySelector('.sound-label').textContent = shouldPlay ? 'Әуен қосулы' : 'Әуен';
  if (shouldPlay) invitationMusic.play().catch(() => setMusicPlaying(false));
  else invitationMusic.pause();
}
soundToggle.addEventListener('click', () => {
  setMusicPlaying(invitationMusic.paused);
});

const form = document.querySelector('#rsvpForm');
const result = document.querySelector('#formResult');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.querySelector('#guestName').value.trim();
  const attendance = new FormData(form).get('attendance');
  localStorage.setItem('aiganym-rsvp', JSON.stringify({ name, attendance }));
  result.textContent = `${name}, жауабыңыз қабылданды. Рақмет!`;
  form.querySelector('.submit-button').textContent = 'Қабылданды ✓';
  form.querySelector('.submit-button').disabled = true;
  celebrate();
});

function celebrate() {
  for (let index = 0; index < 22; index += 1) {
    const petal = document.createElement('span');
    petal.textContent = '❀'; petal.className = 'petal';
    petal.style.cssText = `position:fixed;z-index:25;left:${Math.random() * 100}vw;top:-28px;color:${index % 2 ? '#8b3530' : '#c89655'};font-size:${12 + Math.random() * 16}px;pointer-events:none;animation:petalFall ${2.3 + Math.random() * 2}s linear forwards;`;
    document.body.append(petal); window.setTimeout(() => petal.remove(), 4500);
  }
}
const celebrationStyle = document.createElement('style');
celebrationStyle.textContent = '@keyframes petalFall { to { transform:translateY(106vh) rotate(520deg); opacity:0; } }';
document.head.append(celebrationStyle);

const wishCards = [...document.querySelectorAll('.wish-card')];
const wishDots = [...document.querySelectorAll('.slider-dots button')];
let activeWish = 0;
function showWish(index) {
  activeWish = (index + wishCards.length) % wishCards.length;
  wishCards.forEach((card, cardIndex) => card.classList.toggle('is-active', cardIndex === activeWish));
  wishDots.forEach((dot, dotIndex) => dot.classList.toggle('is-active', dotIndex === activeWish));
}
wishDots.forEach((dot, index) => dot.addEventListener('click', () => showWish(index)));
window.setInterval(() => showWish(activeWish + 1), 5500);
