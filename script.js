const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuButton?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

navLinks?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const phrases = ['digital experiences', 'thoughtful interfaces', 'ideas into reality'];
const typedText = document.querySelector('.typed-text');
let phraseIndex = 0;
let letterIndex = phrases[0].length;
let deleting = true;

function typeLoop() {
  if (!typedText) return;
  const phrase = phrases[phraseIndex];

  if (deleting) {
    letterIndex--;
    typedText.textContent = phrase.slice(0, Math.max(0, letterIndex));
    if (letterIndex <= 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(typeLoop, 350);
      return;
    }
  } else {
    const nextPhrase = phrases[phraseIndex];
    letterIndex++;
    typedText.textContent = nextPhrase.slice(0, letterIndex);
    if (letterIndex >= nextPhrase.length) {
      deleting = true;
      setTimeout(typeLoop, 1500);
      return;
    }
  }
  setTimeout(typeLoop, deleting ? 45 : 75);
}
setTimeout(typeLoop, 1800);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
document.querySelector('#year').textContent = new Date().getFullYear();
