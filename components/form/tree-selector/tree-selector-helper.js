/**
 * @typedef Node
 * @property {string} label
 * @property {string} value
 * @property {boolean} checked
 * @property {Node[]} children
 */

/**
 * @typedef {Node[]} Tree
 */

/**
 * Return a new tree whose selected elements are checked and
 * the other ones unchecked
 * @param {Tree} tree Initial tree
 * @param {string[]} selectedItems Values of the items to check
 */
export const setInitialTreeState = (tree = [], selectedItems = []) => {
  /** @type {Tree} */
  const newTree = [];

  for (let i = 0, j = tree.length; i < j; i++) {
    const node = tree[i];
    newTree.push(Object.assign({}, node, {
      checked: selectedItems.indexOf(node.value) !== -1,
      children: setInitialTreeState(node.children || [], selectedItems)
    }));
  }

  return newTree;
};
