/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: mandg site-wide cleanup.
 * Removes non-authorable site chrome (header, nav, breadcrumb, service banners,
 * search, cookie consent, footer, back-to-top, overlays) so the import contains
 * only page-level authorable content.
 *
 * All selectors verified against migration-work/cleaned.html:
 *   #onetrust-consent-sdk           (line 2694) OneTrust cookie consent SDK
 *   .skip-to-main-link-container    (line 2)    skip link
 *   .dismissibleservicebanner       (line 16/40) global service alert banner
 *   .header.tabs.panelcontainer     (line 51)   header component (incl. cmp-header__navigation)
 *   .navigationsearch               (line 1819) header search menu
 *   .breadcrumb                     (line 1859) breadcrumb nav
 *   .sticky-back-to-top-button-container (line 2686)
 *   .page-overlay                   (line 1812)
 *   .cmp-experiencefragment--footer (line 2501) footer experience fragment
 */

const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Overlays / consent / widgets that could block or pollute parsing.
    WebImporter.DOMUtils.remove(element, [
      '#onetrust-consent-sdk',
      '.page-overlay',
      // Runtime-injected analytics/tracking beacons (not in scraped HTML;
      // appear only during the live import). Left in place they leak into
      // section content and corrupt the extracted metadata title.
      'img[src*="dianomi"]',
      'img[src*="bat.bing.com"]',
      'img[src*="pixeltrack"]',
      'img[src*="doubleclick"]',
      'img[width="1"][height="1"]',
    ]);
  }

  if (hookName === TransformHook.afterTransform) {
    // Non-authorable site chrome.
    WebImporter.DOMUtils.remove(element, [
      '.skip-to-main-link-container',
      '.dismissibleservicebanner',
      '.header.tabs.panelcontainer',
      '.navigationsearch',
      '.breadcrumb',
      '.sticky-back-to-top-button-container',
      '.cmp-experiencefragment--footer',
      'iframe',
      'noscript',
      'link',
    ]);
  }
}
