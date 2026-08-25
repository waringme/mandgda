import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

// media query match that indicates desktop width
const isDesktop = window.matchMedia('(min-width: 900px)');

/**
 * Toggles the mobile nav open/closed.
 * @param {Element} nav The nav element
 */
function toggleMenu(nav, forceExpanded = null) {
  const expanded = forceExpanded !== null
    ? !forceExpanded
    : nav.getAttribute('aria-expanded') === 'true';
  const button = nav.querySelector('.nav-hamburger button');
  document.body.style.overflowY = (expanded || isDesktop.matches) ? '' : 'hidden';
  nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
  if (button) {
    button.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
  }
}

function closeOnEscape(e) {
  if (e.code === 'Escape') {
    const nav = document.getElementById('nav');
    if (nav && nav.getAttribute('aria-expanded') === 'true' && !isDesktop.matches) {
      toggleMenu(nav);
      const button = nav.querySelector('.nav-hamburger button');
      if (button) button.focus();
    }
  }
}

/**
 * loads and decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  // load nav as fragment. Content lives under /content in this project; fall
  // back to the conventional /nav path for DA/EDS production.
  const navMeta = getMetadata('nav');
  let navPath = navMeta ? new URL(navMeta, window.location).pathname : '/content/nav';
  let fragment = await loadFragment(navPath);
  if (!fragment) {
    navPath = '/nav';
    fragment = await loadFragment(navPath);
  }

  // decorate nav DOM
  block.textContent = '';
  const nav = document.createElement('nav');
  nav.id = 'nav';
  while (fragment.firstElementChild) nav.append(fragment.firstElementChild);

  // Section order from nav.plain.html: [0] utility bar, [1] brand/logo, [2] primary nav tabs
  const classes = ['utility', 'brand', 'sections'];
  classes.forEach((c, i) => {
    const section = nav.children[i];
    if (section) section.classList.add(`nav-${c}`);
  });

  // Neutralise any button decoration applied to the logo link.
  const navBrand = nav.querySelector('.nav-brand');
  if (navBrand) {
    const brandLink = navBrand.querySelector('a.button');
    if (brandLink) {
      brandLink.className = '';
      const container = brandLink.closest('.button-container');
      if (container) container.className = '';
    }
  }

  // Build a search affordance in the brand row (control lives in JS, not the fragment).
  if (navBrand) {
    const search = document.createElement('button');
    search.type = 'button';
    search.className = 'nav-search';
    search.setAttribute('aria-label', 'Search');
    search.innerHTML = '<span class="nav-search-icon"></span>';
    navBrand.append(search);
  }

  // hamburger for mobile
  const hamburger = document.createElement('div');
  hamburger.classList.add('nav-hamburger');
  hamburger.innerHTML = `<button type="button" aria-controls="nav" aria-label="Open navigation">
      <span class="nav-hamburger-icon"></span>
    </button>`;
  hamburger.addEventListener('click', () => toggleMenu(nav));
  nav.prepend(hamburger);
  nav.setAttribute('aria-expanded', 'false');

  // reset menu state on breakpoint change so a resize can't leave it stuck open
  isDesktop.addEventListener('change', () => toggleMenu(nav, isDesktop.matches));
  window.addEventListener('keydown', closeOnEscape);

  const navWrapper = document.createElement('div');
  navWrapper.className = 'nav-wrapper';
  navWrapper.append(nav);
  block.append(navWrapper);
}
