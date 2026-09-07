const tabs = [...document.querySelectorAll('[role="tab"]')];
function activate(tab) {
  for (const item of tabs) {
    const selected = item === tab;
    item.setAttribute('aria-selected', String(selected));
    item.tabIndex = selected ? 0 : -1;
    const panel = document.getElementById(item.getAttribute('aria-controls'));
    panel.hidden = !selected;
    if (!selected) panel.querySelectorAll('video').forEach(video => video.pause());
  }
  document.dispatchEvent(new Event('panelchange'));
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => activate(tab));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next === undefined) return;
    event.preventDefault(); tabs[next].focus(); activate(tabs[next]);
  });
});
document.querySelectorAll('.carousel-controls').forEach(controls => {
  const track = document.getElementById(controls.dataset.track);
  const [previous, next] = controls.querySelectorAll('button');
  const update = () => {
    previous.disabled = track.scrollLeft < 2;
    next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
  };
  [previous, next].forEach((button, index) => button.addEventListener('click', () => {
    track.scrollBy({left: (index ? 1 : -1) * (track.clientWidth + 16), behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'});
  }));
  track.addEventListener('scroll', update, {passive: true});
  window.addEventListener('resize', update);
  document.addEventListener('panelchange', update);
  update();
});
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const observer = new IntersectionObserver(entries => {
  entries.forEach(({target, isIntersecting}) => {
    if (isIntersecting && !reducedMotion.matches && !target.closest('[hidden]')) target.play().catch(() => {});
    else target.pause();
  });
}, {threshold: .3});
document.querySelectorAll('video').forEach(video => observer.observe(video));
