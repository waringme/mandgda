/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-linklist. Base: cards.
 * Source: https://www.mandg.com/retirement-later-life-planning/accessing-your-pension-savings
 * Generated: 2026-08-25
 *
 * Source is a quicklinks list: <ul><li><a>…text…</a></li>. No images, so this maps
 * to the "cards (no images)" convention: 1 column, one row per link. Each card cell
 * holds a single CTA link carrying the link text.
 */
export default function parse(element, { document }) {
  const items = Array.from(element.querySelectorAll('ul > li'));

  const cells = [];

  items.forEach((li) => {
    const anchor = li.querySelector('a[href]');
    if (!anchor) return;

    // The visible label lives in the content div; icon-only spans are ignored.
    const label = anchor.querySelector('.quicklinkcontent');
    const text = (label ? label.textContent : anchor.textContent).trim();
    if (!text) return;

    // Build a clean CTA link preserving the destination.
    const link = document.createElement('a');
    link.href = anchor.getAttribute('href');
    link.textContent = text;

    cells.push([[link]]);
  });

  // Empty-block guard
  if (!cells.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-linklist', cells });
  element.replaceWith(block);
}
