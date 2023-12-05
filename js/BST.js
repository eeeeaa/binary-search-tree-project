const util = require("./util");

class Tree {
  constructor(array) {
    this.root = Tree.buildTree(array);
  }

  insert = (value) => {
    util.insertValue(this.root, value);
  };

  delete = (value) => {
    util.deleteValue(this.root, value);
  };

  find = (searchValue) => {
    return util.findValue(this.root, searchValue);
  };

  findLargestNode = () => {
    return util.findLargestNode(this.root);
  };

  levelOrder = (callback, useLoop = true) => {
    return util.levelOrdering(this.root, callback, useLoop);
  };

  preOrder = (callback) => {
    return util.preorder(this.root, callback);
  };

  inOrder = (callback) => {
    return util.inorder(this.root, callback);
  };

  postOrder = (callback) => {
    return util.postorder(this.root, callback);
  };

  height = (node = this.root) => {
    return util.nodeHeight(node);
  };

  depth = (node = this.root) => {
    return util.nodeDepth(node, this.root);
  };

  printTree = () => {
    Tree.prettyPrint(this.root);
  };

  //Utility methods
  static isBalanced = (tree) => {
    return util.isTreeBalanced(tree.root);
  };
  static rebalance = (tree) => {
    return util.rebalanceTree(tree);
  };
  static buildTree = (array) => {
    return util.sortedArrayToBST(util.createValidArray(array));
  };

  static prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      Tree.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      Tree.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };
}

module.exports = Tree;
