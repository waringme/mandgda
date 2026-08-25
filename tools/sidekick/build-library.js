/*
 * Generates a DA block library: library.json (sheet) + one reference document
 * per block. Each block doc contains an example block table plus a
 * `library-metadata` block (name + description). Authors open these via the
 * Sidekick "Library" plugin and copy blocks into their pages.
 */
const fs = require('fs');
const path = require('path');

const OUT = path.resolve(__dirname, '../../tools/sidekick');
const DOCS = path.join(OUT, 'block-library');
fs.mkdirSync(DOCS, { recursive: true });

// Wrap block-example HTML + a library-metadata block into a full DA-servable doc.
function doc(bodyHtml, name, description) {
  return `<body>
  <header></header>
  <main>
    <div>
${bodyHtml}
      <div class="library-metadata">
        <div><div>name</div><div>${name}</div></div>
        <div><div>description</div><div>${description}</div></div>
      </div>
    </div>
  </main>
  <footer></footer>
</body>
`;
}

// name, path (slug), title, description, and example block table.
const blocks = [
  {
    slug: 'cards',
    title: 'Cards',
    description: 'Grid of cards, each with an optional image and a text body (title, description, CTA).',
    body: `      <div class="cards">
        <div><div>Image</div><div><h3>Card title</h3><p>Short description for the card.</p><p><a href="/">Read more</a></p></div></div>
        <div><div>Image</div><div><h3>Second card</h3><p>Another card in the grid.</p></div></div>
      </div>`,
  },
  {
    slug: 'columns',
    title: 'Columns',
    description: 'Side-by-side content laid out in multiple columns.',
    body: `      <div class="columns">
        <div><div><h3>Left column</h3><p>Content for the first column.</p></div><div><h3>Right column</h3><p>Content for the second column.</p></div></div>
      </div>`,
  },
  {
    slug: 'hero',
    title: 'Hero',
    description: 'Prominent page-intro banner with a heading, supporting text, and an optional image.',
    body: `      <div class="hero">
        <div><div><picture><img src="/media_placeholder.png" alt="Hero image"></picture></div></div>
        <div><div><h1>Hero heading</h1><p>Supporting intro paragraph for the hero.</p></div></div>
      </div>`,
  },
  {
    slug: 'tabs',
    title: 'Tabs',
    description: 'Tabbed interface: each row is one tab — first cell is the label, second cell is the panel content.',
    body: `      <div class="tabs">
        <div><div>First tab</div><div><h5>Panel heading</h5><p>Content shown when the first tab is active.</p></div></div>
        <div><div>Second tab</div><div><h5>Panel heading</h5><p>Content shown when the second tab is active.</p></div></div>
      </div>`,
  },
  {
    slug: 'widget',
    title: 'Widget',
    description: 'Loads an external interactive widget (tool/calculator) from /widgets/ via an authored link.',
    body: `      <div class="widget">
        <div><div><a href="/widgets/example-widget">/widgets/example-widget</a></div></div>
      </div>`,
  },
  {
    slug: 'hero-coral',
    title: 'Hero (Coral)',
    description: 'M&G coral hero variant — full-bleed coral text panel beside a lifestyle image. Row 1: image. Row 2: heading + intro paragraph.',
    body: `      <div class="hero (coral)">
        <div><div><picture><img src="/media_placeholder.png" alt="Lifestyle image"></picture></div></div>
        <div><div><h1>Page heading</h1><p>Short intro paragraph shown in the coral panel.</p></div></div>
      </div>`,
  },
  {
    slug: 'hero-dark',
    title: 'Hero (Dark)',
    description: 'M&G dark/burgundy hero variant — dark text panel beside a lifestyle image with a call-to-action. Row 1: image. Row 2: heading + paragraphs + CTA link.',
    body: `      <div class="hero (dark)">
        <div><div><picture><img src="/media_placeholder.png" alt="Lifestyle image"></picture></div></div>
        <div><div><h2>Section heading</h2><p>Explanatory paragraph.</p><p><a href="/">Call to action</a></p></div></div>
      </div>`,
  },
  {
    slug: 'tabs-burgundy',
    title: 'Tabs (Burgundy)',
    description: 'M&G burgundy tabs variant — burgundy tab bar with a grey active panel. Each row: label cell + content cell (sub-heading, paragraphs, CTA).',
    body: `      <div class="tabs (burgundy)">
        <div><div>First option</div><div><h5>Option heading</h5><p>Explanatory copy for this option.</p><p><a href="/">Find out more</a></p></div></div>
        <div><div>Second option</div><div><h5>Option heading</h5><p>Explanatory copy for this option.</p><p><a href="/">Find out more</a></p></div></div>
      </div>`,
  },
  {
    slug: 'cards-linklist',
    title: 'Cards (Link list)',
    description: 'M&G quick-links variant of cards — a divider-separated list of link rows with arrow icons. Each row: a single linked heading, no image.',
    body: `      <div class="cards (linklist)">
        <div><div><a href="/">First link</a></div></div>
        <div><div><a href="/">Second link</a></div></div>
        <div><div><a href="/">Third link</a></div></div>
      </div>`,
  },
  {
    slug: 'cards-tools',
    title: 'Cards (Tools)',
    description: 'M&G calculator/tool cards variant — a 4-across grid of bordered cards, each with a title and a CTA link, no image.',
    body: `      <div class="cards (tools)">
        <div><div><h5>Tool name</h5><p><a href="/">Go to tool</a></p></div></div>
        <div><div><h5>Second tool</h5><p><a href="/">Go to tool</a></p></div></div>
      </div>`,
  },
  {
    slug: 'cards-info',
    title: 'Cards (Info)',
    description: 'M&G information cards variant — a 2-across grid of bordered cards, each with a title, description, and CTA link, no image.',
    body: `      <div class="cards (info)">
        <div><div><h5>Card title</h5><p>Descriptive paragraph for this card.</p><p><a href="/">Read more</a></p></div></div>
        <div><div><h5>Second card</h5><p>Descriptive paragraph for this card.</p><p><a href="/">Learn more</a></p></div></div>
      </div>`,
  },
];

// write per-block docs
for (const b of blocks) {
  fs.writeFileSync(path.join(DOCS, `${b.slug}.html`), doc(b.body, b.title, b.description));
}

// library.json sheet — one row per block: name + path to its doc
const data = blocks.map((b) => ({ name: b.title, path: `/block-library/${b.slug}` }));
const library = {
  total: data.length,
  offset: 0,
  limit: data.length,
  data,
  columns: ['name', 'path'],
  ':type': 'sheet',
};
fs.writeFileSync(path.join(OUT, 'library.json'), `${JSON.stringify(library, null, 2)}\n`);

console.log(`Wrote library.json (${data.length} blocks) + ${blocks.length} reference docs to tools/sidekick/`);
blocks.forEach((b) => console.log(`  /block-library/${b.slug}  — ${b.title}`));
