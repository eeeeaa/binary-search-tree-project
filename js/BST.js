const Node = require("./nodeModel");

class Tree {
  constructor(array) {
    this.root = Tree.buildTree(array);
  }

  insert = (value) => {
    insertValue(this.root, value);
  };

  delete = (value) => {
    deleteValue(this.root, value);
  };

  treeAsArray = (traversalValue = 0) => {
    switch (traversalValue) {
      case 1: {
        return inorder(this.root);
        break;
      }
      case 2: {
        return postorder(this.root);
        break;
      }
    }

    return preorder(this.root);
  };

  printTree = () => {
    Tree.prettyPrint(this.root);
  };

  //Utility methods
  static buildTree = (array) => {
    return sortedArrayToBST(Tree.createValidArray(array));
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

function preorder(node, array = []) {
  if (node === null) return null;
  array.push(node.value);
  preorder(node.left, array);
  preorder(node.right, array);
  return array;
}

function inorder(node, array = []) {
  if (node === null) return null;
  inorder(node.left, array);
  array.push(node.value);
  inorder(node.right, array);
  return array;
}

function postorder(node, array = []) {
  if (node === null) return null;
  postorder(node.left, array);
  postorder(node.right, array);
  array.push(node.value);
  return array;
}

function insertValue(root, value) {
  if (root === null) {
    root = new Node(value);
    return root;
  }
  if (value < root.value) {
    root.left = insertValue(root.left, value);
  } else if (value > root.value) {
    root.right = insertValue(root.right, value);
  }
  return root;
}

function deleteValue(root, value) {
  //base case
  if (root === null) return root;

  //check for node to be deleted
  if (root.value > value) {
    root.left = deleteValue(root.left, value);
    return root;
  } else if (root.value < value) {
    root.right = deleteValue(root.right, value);
    return root;
  }

  //If this node is to be deleted, check for delete cases
  /** three delete cases
   *
   * 1. node have no children -> just delete it
   * 2. node have one children -> swap place of node with its child and delete the node
   * 2. node have two children:
   *
   *    a. find largest value in node's left sub-tree OR smallest value in right sub-tree
   *        - choose this value because it wont change tree balance since its still
   *          larger than all left sub-tree values and less than all the right sub-tree value
   *
   *    b. swap place of node with that value
   *
   *    c. delete the node with case 1 or 2
   */

  if (root.left === null) {
    //left child empty or no children
    const tempNode = root.right;
    delete root;
    return tempNode;
  } else if (root.right === null) {
    //right child empty
    const tempNode = root.left;
    delete root;
    return tempNode;
  } else {
    //both children exist
    let successorParent = root;
    let successor = root.right;

    //find smallest right node
    while (successor.left !== null) {
      successorParent = successor;
      successor = successor.left;
    }

    if (successorParent !== root) {
      successorParent.left = successor.right;
    } else {
      successorParent.right = successor.right;
    }

    root.value = successor.value;

    delete successor;
    return root;
  }
}

/**
 *
 * @param {Array} array
 */
function sortedArrayToBST(array) {
  if (array.length === 0) {
    return null;
  }

  const mid = Math.floor(array.length / 2);
  const root = new Node(array[mid]);

  //queue of [node, [left, right]]
  const queue = [
    [root, [0, mid - 1]],
    [root, [mid + 1, array.length - 1]],
  ];

  while (queue.length > 0) {
    const [parent, [left, right]] = queue.shift(); //dequeue

    if (left <= right && parent != null) {
      const mid = Math.floor((left + right) / 2);
      const child = new Node(array[mid]);

      if (array[mid] < parent.value) {
        parent.left = child;
      } else {
        parent.right = child;
      }

      //enqueue left and right child of the previous child in the queue
      queue.push([child, [left, mid - 1]]);
      queue.push([child, [mid + 1, right]]);
    }
  }

  return root;
}

module.exports = Tree;
