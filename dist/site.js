const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = window.matchMedia('(pointer: fine)');
const progress = document.querySelector('.scroll-progress');
const portrait = document.querySelector('.portrait-card');
const navLinks = [...document.querySelectorAll('.nav a[href^="#"]')];

let scrollFrame = 0;
function updateProgress() {
  scrollFrame = 0;
  const distance = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.transform = `scaleX(${distance > 0 ? Math.min(1, window.scrollY / distance) : 0})`;
}
window.addEventListener('scroll', () => {
  if (!scrollFrame) scrollFrame = requestAnimationFrame(updateProgress);
}, { passive: true });
window.addEventListener('resize', updateProgress, { passive: true });
updateProgress();

if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const activeId = `#${entry.target.id}`;
      for (const link of navLinks) {
        const active = link.getAttribute('href') === activeId;
        link.classList.toggle('is-current', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      }
    }
  }, { rootMargin: '-20% 0px -65% 0px' });
  for (const section of document.querySelectorAll('main > section[id]')) sectionObserver.observe(section);

  if (!reducedMotion.matches) {
    const revealObserver = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.animate([
          { opacity: .55, transform: 'translateY(24px)' },
          { opacity: 1, transform: 'translateY(0)' }
        ], { duration: 700, easing: 'cubic-bezier(.2,.7,.2,1)' });
        revealObserver.unobserve(entry.target);
      }
    }, { rootMargin: '0px 0px -35px 0px', threshold: .1 });
    document.querySelectorAll('.section-heading, .case-study, .project, .experience-grid, .about-grid, .footer-main')
      .forEach(element => revealObserver.observe(element));
  }
}

if (portrait && finePointer.matches && !reducedMotion.matches) {
  portrait.addEventListener('pointermove', event => {
    const bounds = portrait.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - .5;
    const y = (event.clientY - bounds.top) / bounds.height - .5;
    portrait.style.setProperty('--portrait-x', `${(-x * 10).toFixed(1)}px`);
    portrait.style.setProperty('--portrait-y', `${(-y * 10).toFixed(1)}px`);
  }, { passive: true });
  portrait.addEventListener('pointerleave', () => {
    portrait.style.setProperty('--portrait-x', '0px');
    portrait.style.setProperty('--portrait-y', '0px');
  });
}
