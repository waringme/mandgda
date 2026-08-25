/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-info. Base: cards.
 * Source: https://www.mandg.com/retirement-later-life-planning/accessing-your-pension-savings
 * Generated: 2026-08-25
 *
 * Source cards (.cmp-teaser) have empty image containers, so this maps to the
 * "cards (no images)" convention: 1 column, one row per card. Each card cell
 * holds an optional heading, description, and CTA link.
 */
export default function parse(element, { document }) {
  // Each teaser card in the container
  const cards = Array.from(element.querySelectorAll('.cmp-teaser'));

  const cells = [];

  cards.forEach((card) => {
    const contentCell = [];

    // Title — styled as heading in source (h5)
    const title = card.querySelector('.cmp-teaser__title, h2, h3, h4, h5, h6');
    if (title) contentCell.push(title);

    // Description — paragraph(s) below the heading
    const description = card.querySelector('.cmp-teaser__description');
    if (description) contentCell.push(description);

    // Call-to-action link(s) — only real anchors (empty button wrappers have none)
    const ctaLinks = Array.from(card.querySelectorAll('.teaser-card__button-container a[href], .cmp-button[href]'));
    ctaLinks.forEach((a) => contentCell.push(a));

    // Only add a card row if it has content
    if (contentCell.length) cells.push([contentCell]);
  });

  // Empty-block guard
  if (!cells.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-info', cells });
  element.replaceWith(block);
}
