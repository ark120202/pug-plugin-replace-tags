# pug-plugin-replace-tags

> Pug plugin used provide cleaner and pug-compatible syntax for &lt;include&gt; tag in Panorama layout files.

## Install

```bash
npm i pug-plugin-replace-tags
# or
yarn add pug-plugin-replace-tags
```

## Usage

```javascript
const pug = require('pug');
const pugPluginReplaceTags = require('pug-plugin-replace-tags');

const source = `
html
  div
    #id
    h2 Header
`;

pug.render(source, {
  plugins: [
    pugPluginReplaceTags({
      div: 'span',
      h2: 'h4'
    })
  ]
});
// <html>
//   <span>
//     <span id="id"></span>
//     <h4>Header</h4>
//   </span>
// </html>
```

## Options

This plugin takes only one option, which can be:

* Function, that will be called for each node and should return new tag name for this node.
* Map, where key is old tag and value is either string with new tag or function, which takes node and returns new tag
