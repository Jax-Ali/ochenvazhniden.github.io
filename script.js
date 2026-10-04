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
