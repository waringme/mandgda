/* eslint-disable */
/* global WebImporter */
/**
 * Parser for tabs-burgundy. Base: tabs.
 * Source: https://www.mandg.com/retirement-later-life-planning/accessing-your-pension-savings
 * Generated: 2026-08-25
 *
 * Tabs convention: 2 columns, one row per tab.
 *   Cell 1: tab label.
 *   Cell 2: tab content (title, text paragraphs, CTA).
 * Source lists labels in <ol.cmp-tabs__tablist><li> and content in matching
 * .cmp-tabs__tabpanel elements (same document order); paired by index.
 */
export default function parse(element, { document }) {
  const labels = Array.from(element.querySelectorAll('.cmp-tabs__tablist .cmp-tabs__tab'));
  const panels = Array.from(element.querySelectorAll('.cmp-tabs__tabpanel'));

  const cells = [];

  panels.forEach((panel, i) => {
    const labelEl = labels[i];
    const labelText = (labelEl ? labelEl.textContent : '').trim();

    // Label cell — plain text of the tab
    const labelCell = document.createElement('p');
    labelCell.textContent = labelText;

    // Content cell — collect title(s), body text, and CTA(s) inside the panel
    const contentCell = [];
    const title = panel.querySelector('.cmp-title, .cmp-title__text, h2, h3, h4, h5, h6');
    if (title) contentCell.push(title);

    const text = panel.querySelector('.cmp-text');
    if (text) contentCell.push(text);

    const ctaLinks = Array.from(panel.querySelectorAll('.button a[href], a.cmp-button[href]'));
    ctaLinks.forEach((a) => contentCell.push(a));

    // Fallback: if none of the specific selectors matched, use the panel's inner content
    if (!contentCell.length) {
      const inner = panel.querySelector('.cmp-container, .container') || panel;
      contentCell.push(inner);
    }

    cells.push([labelCell, contentCell]);
  });

  // Empty-block guard
  if (!cells.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'tabs-burgundy', cells });
  element.replaceWith(block);
}
