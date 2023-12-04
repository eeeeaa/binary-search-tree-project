const Node = require("./nodeModel");
function preorder(node, callback = null, array = []) {
  if (node === null) return null;
  if (callback != null) {
    callback(node);
  } else {
    array.push(node.value);
  }
  preorder(node.left, callback, array);
  preorder(node.right, callback, array);
  return callback == null ? array : null;
}

function inorder(node, callback = null, array = []) {
  if (node === null) return null;
  inorder(node.left, callback, array);
  if (callback != null) {
    callback(node);
  } else {
    array.push(node.value);
  }
  inorder(node.right, callback, array);
  return callback == null ? array : null;
}

function postorder(node, callback = null, array = []) {
  if (node === null) return null;
  postorder(node.left, callback, array);
  postorder(node.right, callback, array);
  if (callback != null) {
    callback(node);
  } else {
    array.push(node.value);
  }
  return callback == null ? array : null;
}

function levelOrdering(node, callback = null, useLoop = true) {
  if (useLoop) {
    return levelOrderingLoop(node, callback);
  } else {
    return levelOrderingRecursive(node, callback);
  }
}

function levelOrderingLoop(node, callback = null) {
  if (node === null) return null;

  const queue = [node];
  const result = [];
  let currentNode = queue[0];

  while (queue.length > 0) {
    currentNode = queue.shift();
    if (currentNode != null) {
      if (callback != null) {
        callback(currentNode);
      } else {
        result.push(currentNode.value);
      }
      queue.push(currentNode.left, currentNode.right);
    }
  }

  return callback == null ? result : null;
}

function levelOrderingRecursive(
  node,
  callback = null,
  result = [],
  queue = [node]
) {
  if (node === null) return null;
  if (queue.length <= 0) return callback == null ? result : null;
  currentNode = queue.shift();
  if (currentNode != null) {
    if (callback != null) {
      callback(currentNode);
    } else {
      result.push(currentNode.value);
    }
    queue.push(currentNode.left, currentNode.right);
  }
  return levelOrderingRecursive(node, callback, result, queue);
}

function nodeHeight(node) {
  return nodeLongestPath(node).length - 1;
}

function nodeLongestPath(node) {
  if (node === null) return [];
  const left = nodeLongestPath(node.left);
  const right = nodeLongestPath(node.right);

  if (left.length >= right.length) {
    left.push(node);
    return left;
  } else {
    right.push(node);
    return right;
  }
}

function nodeDepth(node, rootNode) {
  return nodePathFromRoot(rootNode, node).length - 1;
}

function nodePathFromRoot(rootNode, node, array = []) {
  if (rootNode === null) return null;
  array.push(rootNode);
  if (rootNode.value === node.value) {
    return array;
  } else if (rootNode.value < node.value) {
    return nodePathFromRoot(rootNode.right, node, array);
  } else if (rootNode.value > node.value) {
    return nodePathFromRoot(rootNode.left, node, array);
  }
}

function findValue(node, searchValue) {
  if (node === null) return null;
  if (node.value === searchValue) return node;
  if (searchValue < node.value) return findValue(node.left, searchValue);
  if (searchValue > node.value) return findValue(node.right, searchValue);
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
    root = null;
    return tempNode;
  } else if (root.right === null) {
    //right child empty
    const tempNode = root.left;
    root = null;
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

    successor = null;
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

module.exports = {
  preorder,
  inorder,
  postorder,
  levelOrdering,
  nodeHeight,
  nodeDepth,
  findValue,
  insertValue,
  deleteValue,
  sortedArrayToBST,
};
