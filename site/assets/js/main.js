(() => {
  const splash = document.querySelector('.splash');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion || !splash) document.documentElement.classList.add('intro-complete');
  else window.addEventListener('load', () => setTimeout(() => { splash.classList.add('is-leaving'); document.documentElement.classList.add('intro-complete'); setTimeout(() => { splash.hidden = true; }, 850); }, 1200), { once: true });
  const projectsEl = document.querySelector('#projects');
  const renderProjects = () => {
    const visible = portfolioProjects;
    projectsEl.innerHTML = visible.map((p, index) => `<article class="project-card ${p.accent} reveal"><div class="project-visual"><span>${String(index + 1).padStart(2, '0')}</span><div class="shape"></div></div><div class="project-meta"><p>${p.label}</p><h3>${p.title}</h3><p class="project-description">${p.description}</p><div class="project-footer"><ul>${p.stack.map(s => `<li>${s}</li>`).join('')}</ul><div><a href="${p.links.live}" aria-label="View ${p.title}">View ↗</a><a href="${p.links.code}" aria-label="View ${p.title} source">Code ↗</a></div></div></div></article>`).join('');
    observeReveals();
  };
  renderProjects();

  const nav = document.querySelector('#site-nav'), menu = document.querySelector('.menu-toggle');
  menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') === 'true'; menu.setAttribute('aria-expanded', String(!open)); menu.setAttribute('aria-label', open ? 'Open menu' : 'Close menu'); nav.classList.toggle('open'); });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); }));

  const toggle = document.querySelector('.theme-toggle');
  const savedTheme = localStorage.getItem('portfolio-theme');
  if (savedTheme !== 'dark') document.body.classList.add('light');
  toggle.addEventListener('click', () => { document.body.classList.toggle('light'); localStorage.setItem('portfolio-theme', document.body.classList.contains('light') ? 'light' : 'dark'); });
  document.querySelector('#year').textContent = new Date().getFullYear();

  document.querySelector('#copy-email').addEventListener('click', async () => { const button = document.querySelector('#copy-email'); try { await navigator.clipboard.writeText('yashwin.b.310@gmail.com'); button.innerHTML = 'Copied <span aria-hidden="true">✓</span>'; setTimeout(() => button.innerHTML = 'Copy email <span aria-hidden="true">⧉</span>', 1800); } catch { window.location.href = 'mailto:yashwin.b.310@gmail.com'; } });
  if (matchMedia('(pointer: fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const dot = document.querySelector('.cursor-dot'), ring = document.querySelector('.cursor-ring');
    let ringX = 0, ringY = 0, mouseX = 0, mouseY = 0;
    document.body.classList.add('has-custom-cursor');
    const animateRing = () => { ringX += (mouseX - ringX) * .16; ringY += (mouseY - ringY) * .16; ring.style.left = `${ringX}px`; ring.style.top = `${ringY}px`; requestAnimationFrame(animateRing); };
    document.addEventListener('pointermove', event => { mouseX = event.clientX; mouseY = event.clientY; dot.style.left = `${mouseX}px`; dot.style.top = `${mouseY}px`; document.body.classList.add('cursor-visible'); });
    document.addEventListener('pointerover', event => document.body.classList.toggle('cursor-active', Boolean(event.target.closest('a,button'))));
    document.addEventListener('pointerleave', () => document.body.classList.remove('cursor-visible'));
    animateRing();
  }

  function observeReveals() { const elements = document.querySelectorAll('.reveal:not(.shown)'); if (!('IntersectionObserver' in window)) return elements.forEach(el => el.classList.add('shown')); const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('shown'); observer.unobserve(entry.target); } }), { threshold: .12 }); elements.forEach(el => observer.observe(el)); }
  observeReveals();
})();
