/* eslint-disable */
/* global WebImporter */
/**
 * Parser for hero-dark. Base: hero.
 * Source: https://www.mandg.com/retirement-later-life-planning/accessing-your-pension-savings
 * Generated: 2026-08-25
 *
 * Hero convention: 1 column, up to 3 rows.
 *   Row 2 (optional): background image.
 *   Row 3: title (heading), subheading (may be multiple paragraphs), and optional CTA links.
 */
export default function parse(element, { document }) {
  // Background image
  const image = element.querySelector('.cmp-teaser__image img, img[class*="image"], img');

  // Title / heading
  const heading = element.querySelector('.cmp-teaser__title, h1, h2, [class*="title"]');

  // Subheading / description (may contain multiple paragraphs)
  const description = element.querySelector('.cmp-teaser__description, [class*="description"]');

  // CTA link(s) — only real anchors (empty button wrappers carry none)
  const ctaLinks = Array.from(element.querySelectorAll('.cmp-teaser-button-container a[href], .cmp-teaser__action-link[href]'));

  // Empty-block guard
  if (!heading && !description && !image) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [];

  // Row 2: background image (optional)
  if (image) cells.push([image]);

  // Row 3: text content
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (description) contentCell.push(description);
  ctaLinks.forEach((a) => contentCell.push(a));
  cells.push([contentCell]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-dark', cells });
  element.replaceWith(block);
}
