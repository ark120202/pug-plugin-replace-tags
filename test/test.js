const test = require('ava');
const fs = require('fs');
const path = require('path');
const pug = require('pug');
const plugin = require('..');

const fixtures = path.join(__dirname, 'fixtures');

async function compare(t, name, options = {}) {
  const source = fs.readFileSync(path.join(fixtures, `${name}.pug`), 'utf8');
  const expected = fs.readFileSync(path.join(fixtures, `${name}.html`), 'utf8').trim();
  const result = pug.render(source, { plugins: [plugin(options)] });

  t.is(result, expected);
}

test('should replace tags using map', compare, 'tags', {
  html: 'not-html',
  div: 'span',
  a: node => `${
    node.attrs.find(attr => attr.name === 'prefix').val.slice(1, -1)
  }${
    node.attrs.find(attr => attr.name === 'tag').val.slice(1, -1)
  }`,
});

test(
  'should replace tags using function', compare, 'tags-dynamic',
  node => `${node.name.split('').reverse().join('')}`,
);
