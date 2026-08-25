const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname);
const PKG = path.join(ROOT, 'build');
const DAM_PATH = 'content/dam/mandg/da';
const JCR = path.join(PKG, 'jcr_root', DAM_PATH);
const IMG = path.resolve(ROOT, '../../migration-work/images');

function pngDims(file) {
  const b = fs.readFileSync(file);
  return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) };
}

const assets = [
  { hash: '24e8d565807421433e5725cb4a0d5b47', name: 'accessing-your-pension-hero.png', title: 'Accessing your pension savings — hero' },
  { hash: 'a84b85b5805ca1695487f31196fa9c1a', name: 'get-expert-help.png', title: 'Get expert help' },
  { hash: '03a3c77668258321bd1860123e4f5d19', name: 'more-information-rectangle.png', title: 'More information — Prudential Retirement Account' },
  { hash: 'cae8796ee1d58100c12fa12f3d657d16', name: 'more-information-square.png', title: 'More information — Help for existing customers' },
  { hash: '3142a4ab0c96f20156a3c8a315b3016a', name: 'teaser-square-420.png', title: 'Teaser square' },
  { hash: '90bbf94b9a6563e7f24ed95d380e25c3', name: 'mandg-logo.png', title: 'M&G logo' },
];

fs.rmSync(PKG, { recursive: true, force: true });
fs.mkdirSync(JCR, { recursive: true });

fs.writeFileSync(path.join(JCR, '.content.xml'),
`<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:jcr="http://www.jcp.org/jcr/1.0" xmlns:sling="http://sling.apache.org/jcr/sling/1.0"
    jcr:primaryType="sling:OrderedFolder"
    jcr:title="da"/>
`);

for (const a of assets) {
  const src = path.join(IMG, `${a.hash}.png`);
  const { w, h } = pngDims(src);
  const assetDir = path.join(JCR, a.name);
  const rendDir = path.join(assetDir, '_jcr_content', 'renditions');
  fs.mkdirSync(path.join(rendDir, 'original.dir'), { recursive: true });
  fs.copyFileSync(src, path.join(rendDir, 'original'));

  fs.writeFileSync(path.join(rendDir, 'original.dir', '.content.xml'),
`<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:jcr="http://www.jcp.org/jcr/1.0" xmlns:nt="http://www.jcp.org/jcr/nt/1.0"
    jcr:primaryType="nt:file">
  <jcr:content jcr:primaryType="nt:resource" jcr:mimeType="image/png"/>
</jcr:root>
`);

  fs.writeFileSync(path.join(assetDir, '.content.xml'),
`<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:jcr="http://www.jcp.org/jcr/1.0" xmlns:nt="http://www.jcp.org/jcr/nt/1.0"
    xmlns:dam="http://www.day.com/dam/1.0" xmlns:dc="http://purl.org/dc/elements/1.1/"
    xmlns:tiff="http://ns.adobe.com/tiff/1.0/"
    jcr:primaryType="dam:Asset">
  <jcr:content jcr:primaryType="dam:AssetContent">
    <metadata jcr:primaryType="nt:unstructured"
        dc:title="${a.title.replace(/&/g, '&amp;').replace(/</g, '&lt;')}"
        dc:format="image/png"
        tiff:ImageWidth="${w}"
        tiff:ImageLength="${h}"/>
    <renditions jcr:primaryType="nt:folder"/>
  </jcr:content>
</jcr:root>
`);
  console.log(`${a.name}  ${w}x${h}`);
}

const vault = path.join(PKG, 'META-INF', 'vault');
fs.mkdirSync(vault, { recursive: true });
fs.writeFileSync(path.join(vault, 'filter.xml'),
`<?xml version="1.0" encoding="UTF-8"?>
<workspaceFilter version="1.0">
  <filter root="/${DAM_PATH}"/>
</workspaceFilter>
`);
fs.writeFileSync(path.join(vault, 'properties.xml'),
`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE properties SYSTEM "http://java.sun.com/dtd/properties.dtd">
<properties>
  <comment>FileVault package</comment>
  <entry key="name">mandg-dam-images</entry>
  <entry key="version">1.0</entry>
  <entry key="group">mandg</entry>
  <entry key="description">M&amp;G images imported to /${DAM_PATH}</entry>
  <entry key="packageType">content</entry>
</properties>
`);
console.log('scaffold done ->', PKG);
