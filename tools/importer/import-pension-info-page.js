/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import cardsInfoParser from './parsers/cards-info.js';
import cardsLinklistParser from './parsers/cards-linklist.js';
import cardsToolsParser from './parsers/cards-tools.js';
import heroCoralParser from './parsers/hero-coral.js';
import heroDarkParser from './parsers/hero-dark.js';
import tabsBurgundyParser from './parsers/tabs-burgundy.js';

// TRANSFORMER IMPORTS
import cleanupTransformer from './transformers/mandg-cleanup.js';
import dmImagesTransformer from './transformers/mandg-dm-images.js';
import sectionsTransformer from './transformers/mandg-sections.js';

// PARSER REGISTRY
const parsers = {
  'cards-info': cardsInfoParser,
  'cards-linklist': cardsLinklistParser,
  'cards-tools': cardsToolsParser,
  'hero-coral': heroCoralParser,
  'hero-dark': heroDarkParser,
  'tabs-burgundy': tabsBurgundyParser,
};

// PAGE TEMPLATE CONFIGURATION - Embedded from page-templates.json
const PAGE_TEMPLATE = {
  name: 'pension-info-page',
  description: 'Retirement/pension informational page with hero teaser, intro content, tabbed pension options, quick links, calculator/tool cards, expert help CTA, and more-information teaser cards.',
  urls: [
    'https://www.mandg.com/retirement-later-life-planning/accessing-your-pension-savings',
  ],
  blocks: [
    {
      name: 'hero-coral',
      instances: ['div.herobannerteaser.teaser.coral'],
    },
    {
      name: 'tabs-burgundy',
      instances: ['div.tabs.panelcontainer.burgundy'],
    },
    {
      name: 'cards-linklist',
      instances: ['div.quicklinks'],
    },
    {
      name: 'cards-tools',
      instances: ['.cmp-experiencefragment--additonal-support-tools .teasercardscontainer'],
    },
    {
      name: 'hero-dark',
      instances: ['div.herobannerteaser.teaser.dark'],
    },
    {
      name: 'cards-info',
      instances: ['div.bg-theme-3.full-bleed .teasercardscontainer'],
    },
    {
      name: 'section-more-information',
      instances: ['div.bg-theme-3.full-bleed'],
      section: 'grey',
    },
  ],
  sections: [
    {
      id: 'section-1',
      name: 'Hero (coral)',
      selector: 'div.herobannerteaser.teaser.coral',
      style: null,
      blocks: ['hero-coral'],
      defaultContent: [],
    },
    {
      id: 'section-2',
      name: 'Intro - ways to access your pension',
      selector: 'div.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12:nth-of-type(4)',
      style: null,
      blocks: [],
      defaultContent: ['div.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12:nth-of-type(4)'],
    },
    {
      id: 'section-3',
      name: 'Your pension options (tabs)',
      selector: 'div.tabs.panelcontainer.burgundy',
      style: null,
      blocks: ['tabs-burgundy'],
      defaultContent: [],
    },
    {
      id: 'section-4',
      name: 'Find out more about your options (quick links)',
      selector: 'div.quicklinks',
      style: null,
      blocks: ['cards-linklist'],
      defaultContent: [],
    },
    {
      id: 'section-5',
      name: 'Need more help (calculator/tool cards)',
      selector: '.cmp-experiencefragment--additonal-support-tools .teasercardscontainer',
      style: null,
      blocks: ['cards-tools'],
      defaultContent: [],
    },
    {
      id: 'section-6',
      name: 'Get expert help (dark hero)',
      selector: 'div.herobannerteaser.teaser.dark',
      style: null,
      blocks: ['hero-dark'],
      defaultContent: [],
    },
    {
      id: 'section-7',
      name: 'More information (teaser cards)',
      selector: 'div.bg-theme-3.full-bleed',
      style: 'grey',
      blocks: ['cards-info'],
      defaultContent: [],
    },
  ],
};

// TRANSFORMER REGISTRY - cleanup (beforeTransform) → DM images + sections (afterTransform)
const transformers = [
  cleanupTransformer,
  dmImagesTransformer,
  ...(PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [sectionsTransformer] : []),
];

/**
 * Execute all page transformers for a specific hook
 * @param {string} hookName - The hook name ('beforeTransform' or 'afterTransform')
 * @param {Element} element - The DOM element to transform
 * @param {Object} payload - The payload containing { document, url, html, params }
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE,
  };

  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on the embedded template configuration
 * @param {Document} document - The DOM document
 * @param {Object} template - The embedded PAGE_TEMPLATE object
 * @returns {Array} Array of block instances found on the page
 */
function findBlocksOnPage(document, template) {
  const pageBlocks = [];

  template.blocks
    .filter((blockDef) => !blockDef.name.startsWith('section-'))
    .forEach((blockDef) => {
      blockDef.instances.forEach((selector) => {
        const elements = document.querySelectorAll(selector);
        if (elements.length === 0) {
          console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
        }
        elements.forEach((element) => {
          pageBlocks.push({
            name: blockDef.name,
            selector,
            element,
            section: blockDef.section || null,
          });
        });
      });
    });

  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

// EXPORT DEFAULT CONFIGURATION
export default {
  transform: (payload) => {
    const { document, url, html, params } = payload;

    const main = document.body;

    // 1. beforeTransform (initial cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block using registered parsers
    pageBlocks.forEach((block) => {
      if (!block.element.parentNode) return; // Already replaced by earlier parser
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      } else {
        console.warn(`No parser found for block: ${block.name}`);
      }
    });

    // 4. afterTransform (DM image round-trip + section breaks/metadata)
    executeTransformers('afterTransform', main, payload);

    // 5. WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path
    const rawPath = new URL(params.originalURL).pathname
      .replace(/\/$/, '')
      .replace(/\.html?$/, '');
    const path = WebImporter.FileUtils.sanitizePath(rawPath === '' ? '/index' : rawPath);

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
