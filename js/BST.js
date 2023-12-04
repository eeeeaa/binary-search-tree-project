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

  isBalanced = () => {
    //TODO
  };

  rebalance = () => {
    //TODO
  };

  printTree = () => {
    Tree.prettyPrint(this.root);
  };

  //Utility methods
  static buildTree = (array) => {
    return util.sortedArrayToBST(Tree.createValidArray(array));
  };

  static createValidArray = (array) => {
    return [...new Set(array)].sort((a, b) => {
      if (Number(a) < Number(b)) {
        return -1;
      } else if (Number(b) > Number(a)) {
        return 1;
      }
      return 0;
    });
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
