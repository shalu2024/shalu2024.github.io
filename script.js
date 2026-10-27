const menuButton = document.querySelector('.menu-toggle');
const menuClose = document.querySelector('.menu-close');
const navLinks = document.querySelector('#nav-links');

function openMenu() {
  navLinks.hidden = false;
  menuButton.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  navLinks.hidden = true;
  menuButton.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

menuButton?.addEventListener('click', openMenu);
menuClose?.addEventListener('click', closeMenu);

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const id = link.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    closeMenu();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.pushState(null, '', `#${id}`);
  });
});

document.querySelector('#year').textContent = new Date().getFullYear();

const phrases = ['Frontend Developer', 'Vue.js Developer', 'Web Designer'];
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
      setTimeout(typeLoop, 280);
      return;
    }
  } else {
    letterIndex++;
    typedText.textContent = phrases[phraseIndex].slice(0, letterIndex);
    if (letterIndex >= phrases[phraseIndex].length) {
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
  }
  setTimeout(typeLoop, deleting ? 40 : 70);
}
setTimeout(typeLoop, 1600);

const header = document.querySelector('.site-header');
const hero = document.querySelector('.hero');

function updateHeader() {
  if (!header || !hero) return;
  header.classList.toggle('is-scrolled', window.scrollY > 24);
}

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();
