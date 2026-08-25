/* eslint-disable */
var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-pension-info-page.js
  var import_pension_info_page_exports = {};
  __export(import_pension_info_page_exports, {
    default: () => import_pension_info_page_default
  });

  // tools/importer/parsers/cards-info.js
  function parse(element, { document: document2 }) {
    const cards = Array.from(element.querySelectorAll(".cmp-teaser"));
    const cells = [];
    cards.forEach((card) => {
      const contentCell = [];
      const title = card.querySelector(".cmp-teaser__title, h2, h3, h4, h5, h6");
      if (title) contentCell.push(title);
      const description = card.querySelector(".cmp-teaser__description");
      if (description) contentCell.push(description);
      const ctaLinks = Array.from(card.querySelectorAll(".teaser-card__button-container a[href], .cmp-button[href]"));
      ctaLinks.forEach((a) => contentCell.push(a));
      if (contentCell.length) cells.push([contentCell]);
    });
    if (!cells.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document2, { name: "cards-info", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-linklist.js
  function parse2(element, { document: document2 }) {
    const items = Array.from(element.querySelectorAll("ul > li"));
    const cells = [];
    items.forEach((li) => {
      const anchor = li.querySelector("a[href]");
      if (!anchor) return;
      const label = anchor.querySelector(".quicklinkcontent");
      const text = (label ? label.textContent : anchor.textContent).trim();
      if (!text) return;
      const link = document2.createElement("a");
      link.href = anchor.getAttribute("href");
      link.textContent = text;
      cells.push([[link]]);
    });
    if (!cells.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document2, { name: "cards-linklist", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-tools.js
  function parse3(element, { document: document2 }) {
    const cards = Array.from(element.querySelectorAll(".cmp-teaser"));
    const cells = [];
    cards.forEach((card) => {
      const contentCell = [];
      const title = card.querySelector(".cmp-teaser__title, h2, h3, h4, h5, h6");
      if (title) contentCell.push(title);
      const description = card.querySelector(".cmp-teaser__description");
      if (description) contentCell.push(description);
      const ctaLinks = Array.from(card.querySelectorAll(".teaser-card__button-container a[href], .cmp-button[href]"));
      ctaLinks.forEach((a) => contentCell.push(a));
      if (contentCell.length) cells.push([contentCell]);
    });
    if (!cells.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document2, { name: "cards-tools", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/hero-coral.js
  function parse4(element, { document: document2 }) {
    const image = element.querySelector('.cmp-teaser__image img, img[class*="image"], img');
    const heading = element.querySelector('.cmp-teaser__title, h1, h2, [class*="title"]');
    const description = element.querySelector('.cmp-teaser__description, [class*="description"]');
    const ctaLinks = Array.from(element.querySelectorAll(".cmp-teaser-button-container a[href], .cmp-teaser__action-link[href]"));
    if (!heading && !description && !image) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const cells = [];
    if (image) cells.push([image]);
    const contentCell = [];
    if (heading) contentCell.push(heading);
    if (description) contentCell.push(description);
    ctaLinks.forEach((a) => contentCell.push(a));
    cells.push([contentCell]);
    const block = WebImporter.Blocks.createBlock(document2, { name: "hero-coral", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/hero-dark.js
  function parse5(element, { document: document2 }) {
    const image = element.querySelector('.cmp-teaser__image img, img[class*="image"], img');
    const heading = element.querySelector('.cmp-teaser__title, h1, h2, [class*="title"]');
    const description = element.querySelector('.cmp-teaser__description, [class*="description"]');
    const ctaLinks = Array.from(element.querySelectorAll(".cmp-teaser-button-container a[href], .cmp-teaser__action-link[href]"));
    if (!heading && !description && !image) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const cells = [];
    if (image) cells.push([image]);
    const contentCell = [];
    if (heading) contentCell.push(heading);
    if (description) contentCell.push(description);
    ctaLinks.forEach((a) => contentCell.push(a));
    cells.push([contentCell]);
    const block = WebImporter.Blocks.createBlock(document2, { name: "hero-dark", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/tabs-burgundy.js
  function parse6(element, { document: document2 }) {
    const labels = Array.from(element.querySelectorAll(".cmp-tabs__tablist .cmp-tabs__tab"));
    const panels = Array.from(element.querySelectorAll(".cmp-tabs__tabpanel"));
    const cells = [];
    panels.forEach((panel, i) => {
      const labelEl = labels[i];
      const labelText = (labelEl ? labelEl.textContent : "").trim();
      const labelCell = document2.createElement("p");
      labelCell.textContent = labelText;
      const contentCell = [];
      const title = panel.querySelector(".cmp-title, .cmp-title__text, h2, h3, h4, h5, h6");
      if (title) contentCell.push(title);
      const text = panel.querySelector(".cmp-text");
      if (text) contentCell.push(text);
      const ctaLinks = Array.from(panel.querySelectorAll(".button a[href], a.cmp-button[href]"));
      ctaLinks.forEach((a) => contentCell.push(a));
      if (!contentCell.length) {
        const inner = panel.querySelector(".cmp-container, .container") || panel;
        contentCell.push(inner);
      }
      cells.push([labelCell, contentCell]);
    });
    if (!cells.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document2, { name: "tabs-burgundy", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/mandg-cleanup.js
  var TransformHook = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      WebImporter.DOMUtils.remove(element, [
        "#onetrust-consent-sdk",
        ".page-overlay",
        // Runtime-injected analytics/tracking beacons (not in scraped HTML;
        // appear only during the live import). Left in place they leak into
        // section content and corrupt the extracted metadata title.
        'img[src*="dianomi"]',
        'img[src*="bat.bing.com"]',
        'img[src*="pixeltrack"]',
        'img[src*="doubleclick"]',
        'img[width="1"][height="1"]'
      ]);
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, [
        ".skip-to-main-link-container",
        ".dismissibleservicebanner",
        ".header.tabs.panelcontainer",
        ".navigationsearch",
        ".breadcrumb",
        ".sticky-back-to-top-button-container",
        ".cmp-experiencefragment--footer",
        "iframe",
        "noscript",
        "link"
      ]);
    }
  }

  // tools/importer/transformers/mandg-dm-images.js
  function detectDynamicMediaUrl(urlStr) {
    let u;
    try {
      u = new URL(urlStr, "https://x/");
    } catch (e) {
      return false;
    }
    if (u.pathname.startsWith("/is/image/")) {
      return "scene7";
    }
    if (/^delivery-p\d+-e\d+\.adobeaemcloud\.com$/.test(u.hostname) && u.pathname.startsWith("/adobe/assets/urn:")) {
      return "dm-openapi";
    }
    return false;
  }
  var LINKED_DM_INLINE_WRAPPER_TAGS = /* @__PURE__ */ new Set(["PICTURE"]);
  var LINKED_DM_WRAPPER_SIBLING_TAGS = /* @__PURE__ */ new Set(["SOURCE"]);
  function findLinkedDmCarrier(img) {
    if (!img || !img.parentElement) return null;
    let node = img;
    let parent = img.parentElement;
    while (parent && LINKED_DM_INLINE_WRAPPER_TAGS.has(parent.tagName)) {
      let foundNode = false;
      for (const child of parent.children) {
        if (child === node) {
          foundNode = true;
        } else if (!LINKED_DM_WRAPPER_SIBLING_TAGS.has(child.tagName)) {
          return null;
        }
      }
      if (!foundNode) return null;
      node = parent;
      parent = parent.parentElement;
    }
    if (!parent || parent.tagName !== "A") return null;
    if (parent.children.length !== 1 || parent.children[0] !== node) return null;
    if (parent.textContent.trim() !== "") return null;
    return parent;
  }
  var EMPTY_ALT_SENTINEL = "Image without alt text";
  function altToLinkText(alt) {
    return alt || EMPTY_ALT_SENTINEL;
  }
  function transform2(hookName, element, payload) {
    if (hookName !== "afterTransform") return;
    const doc = element.ownerDocument;
    element.querySelectorAll("img").forEach((img) => {
      const src = img.getAttribute("src") || "";
      if (!detectDynamicMediaUrl(src)) return;
      const alt = img.getAttribute("alt") || "";
      const linkedAnchor = findLinkedDmCarrier(img);
      if (linkedAnchor) {
        linkedAnchor.setAttribute("title", src);
        linkedAnchor.textContent = altToLinkText(alt);
        return;
      }
      const parent = img.parentElement;
      if (parent && parent.tagName === "A") {
        console.warn("DM image inside mixed-content anchor, skipped:", src);
        return;
      }
      const a = doc.createElement("a");
      a.href = src;
      a.textContent = altToLinkText(alt);
      img.replaceWith(a);
    });
  }

  // tools/importer/transformers/mandg-sections.js
  var SECTION_MARKER_ATTR = "data-excat-section-id";
  function transform3(hookName, element, payload) {
    const sections = payload.template && payload.template.sections || [];
    if (hookName === "beforeTransform") {
      for (let i = sections.length - 1; i >= 0; i -= 1) {
        const section = sections[i];
        if (i === 0 && !section.style) continue;
        const sectionEl = element.querySelector(section.selector);
        if (!sectionEl) continue;
        const hr = document.createElement("hr");
        if (section.style) hr.setAttribute(SECTION_MARKER_ATTR, section.id);
        sectionEl.before(hr);
      }
    }
    if (hookName === "afterTransform") {
      for (let i = sections.length - 1; i >= 0; i -= 1) {
        const section = sections[i];
        if (!section.style) continue;
        const marker = element.querySelector(`[${SECTION_MARKER_ATTR}="${section.id}"]`);
        const anchor = marker || element.querySelector(section.selector);
        if (!anchor) continue;
        const metadataBlock = WebImporter.Blocks.createBlock(document, {
          name: "Section Metadata",
          cells: { style: section.style }
        });
        anchor.after(metadataBlock);
        if (marker) {
          marker.removeAttribute(SECTION_MARKER_ATTR);
          if (i === 0) marker.remove();
        }
      }
    }
  }

  // tools/importer/import-pension-info-page.js
  var parsers = {
    "cards-info": parse,
    "cards-linklist": parse2,
    "cards-tools": parse3,
    "hero-coral": parse4,
    "hero-dark": parse5,
    "tabs-burgundy": parse6
  };
  var PAGE_TEMPLATE = {
    name: "pension-info-page",
    description: "Retirement/pension informational page with hero teaser, intro content, tabbed pension options, quick links, calculator/tool cards, expert help CTA, and more-information teaser cards.",
    urls: [
      "https://www.mandg.com/retirement-later-life-planning/accessing-your-pension-savings"
    ],
    blocks: [
      {
        name: "hero-coral",
        instances: ["div.herobannerteaser.teaser.coral"]
      },
      {
        name: "tabs-burgundy",
        instances: ["div.tabs.panelcontainer.burgundy"]
      },
      {
        name: "cards-linklist",
        instances: ["div.quicklinks"]
      },
      {
        name: "cards-tools",
        instances: [".cmp-experiencefragment--additonal-support-tools .teasercardscontainer"]
      },
      {
        name: "hero-dark",
        instances: ["div.herobannerteaser.teaser.dark"]
      },
      {
        name: "cards-info",
        instances: ["div.bg-theme-3.full-bleed .teasercardscontainer"]
      },
      {
        name: "section-more-information",
        instances: ["div.bg-theme-3.full-bleed"],
        section: "grey"
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Hero (coral)",
        selector: "div.herobannerteaser.teaser.coral",
        style: null,
        blocks: ["hero-coral"],
        defaultContent: []
      },
      {
        id: "section-2",
        name: "Intro - ways to access your pension",
        selector: "div.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12:nth-of-type(4)",
        style: null,
        blocks: [],
        defaultContent: ["div.container.responsivegrid.aem-GridColumn.aem-GridColumn--default--12:nth-of-type(4)"]
      },
      {
        id: "section-3",
        name: "Your pension options (tabs)",
        selector: "div.tabs.panelcontainer.burgundy",
        style: null,
        blocks: ["tabs-burgundy"],
        defaultContent: []
      },
      {
        id: "section-4",
        name: "Find out more about your options (quick links)",
        selector: "div.quicklinks",
        style: null,
        blocks: ["cards-linklist"],
        defaultContent: []
      },
      {
        id: "section-5",
        name: "Need more help (calculator/tool cards)",
        selector: ".cmp-experiencefragment--additonal-support-tools .teasercardscontainer",
        style: null,
        blocks: ["cards-tools"],
        defaultContent: []
      },
      {
        id: "section-6",
        name: "Get expert help (dark hero)",
        selector: "div.herobannerteaser.teaser.dark",
        style: null,
        blocks: ["hero-dark"],
        defaultContent: []
      },
      {
        id: "section-7",
        name: "More information (teaser cards)",
        selector: "div.bg-theme-3.full-bleed",
        style: "grey",
        blocks: ["cards-info"],
        defaultContent: []
      }
    ]
  };
  var transformers = [
    transform,
    transform2,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform3] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
  function findBlocksOnPage(document2, template) {
    const pageBlocks = [];
    template.blocks.filter((blockDef) => !blockDef.name.startsWith("section-")).forEach((blockDef) => {
      blockDef.instances.forEach((selector) => {
        const elements = document2.querySelectorAll(selector);
        if (elements.length === 0) {
          console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
        }
        elements.forEach((element) => {
          pageBlocks.push({
            name: blockDef.name,
            selector,
            element,
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_pension_info_page_default = {
    transform: (payload) => {
      const { document: document2, url, html, params } = payload;
      const main = document2.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document2, PAGE_TEMPLATE);
      pageBlocks.forEach((block) => {
        if (!block.element.parentNode) return;
        const parser = parsers[block.name];
        if (parser) {
          try {
            parser(block.element, { document: document2, url, params });
          } catch (e) {
            console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
          }
        } else {
          console.warn(`No parser found for block: ${block.name}`);
        }
      });
      executeTransformers("afterTransform", main, payload);
      const hr = document2.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document2);
      WebImporter.rules.transformBackgroundImages(main, document2);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const rawPath = new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html?$/, "");
      const path = WebImporter.FileUtils.sanitizePath(rawPath === "" ? "/index" : rawPath);
      return [{
        element: main,
        path,
        report: {
          title: document2.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_pension_info_page_exports);
})();
