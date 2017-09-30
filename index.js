/**
 * Replaces node's tag with new, received from option.
 *
 * @param {Object.<string, string|function>|function} options - Plugin options.
 * @param {Object} node Pug node.
 * @returns {string} New tag value.
 */
function replaceTag(options, node) {
  if (typeof options === 'function') return options(node);
  const optionValue = options[node.name];
  if (optionValue != null) {
    if (typeof optionValue === 'function') return optionValue(node);
    return optionValue;
  }
  return node.name;
}

/**
 * Applies replaceTag function on node's tags and on it's children.
 *
 * @param {Object.<string, string|function>|function} options - Plugin options.
 * @param {Object} node Pug node.
 */
function processNode(options, node) {
  if (node.block && node.block.nodes) {
    node.block.nodes.forEach(child => processNode(options, child));
  }
  if (node.type === 'Tag') node.name = replaceTag(options, node);
}

/**
 * Creates plugin instance.
 *
 * @param {Object.<string, string|function>|function} options - Plugin options. Can be either:
 * * Function, that will be called for each node and should return new tag name for this node.
 * * Map, where key is old tag and value is either string with new tag or function,
 *   which takes node and returns new tag.
 * @returns {{postParse: function}} Pug plugin.
 */
module.exports = (options = {}) => ({
  postParse(rootBlock) {
    processNode(options, { block: rootBlock });
    return rootBlock;
  },
});
