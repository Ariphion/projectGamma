// Unit tests for the static site. Run with node --test test_site.js
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const PAGES = ['index.html', 'about.html', 'contact.html', 'pricing.html', 'login.html'];

const read = (file) => fs.readFileSync(path.join(ROOT, file), 'utf8');

// Returns local file references (src/href) from an HTML string,
// ignoring external links, anchors and root "/" links.
function localRefs(html) {
  const refs = [...html.matchAll(/(?:src|href)="([^"]+)"/g)].map((m) => m[1]);
  return refs
    .filter((r) => !/^(https?:|mailto:|tel:|#)/.test(r) && r !== '/')
    .map((r) => r.split('#')[0])
    .filter(Boolean);
}

test('all required pages and assets exist', () => {
  for (const file of [...PAGES, 'style.css', 'script.js']) {
    assert.ok(fs.existsSync(path.join(ROOT, file)), `Missing ${file}`);
  }
});

test('every page has a <title> and links style.css', () => {
  for (const page of PAGES) {
    const html = read(page);
    assert.match(html, /<title>[^<]+<\/title>/, `${page} has no <title>`);
    assert.ok(html.includes('href="style.css"'), `${page} does not link style.css`);
  }
});

test('no broken local links or images', () => {
  for (const page of PAGES) {
    for (const ref of localRefs(read(page))) {
      assert.ok(fs.existsSync(path.join(ROOT, ref)), `${page} -> broken reference: ${ref}`);
    }
  }
});

test('localRefs helper filters external and anchor links', () => {
  const sample = '<a href="https://x.com"></a><a href="#top"></a><img src="assets/a.png"><a href="/"></a>';
  assert.deepStrictEqual(localRefs(sample), ['assets/a.png']);
});