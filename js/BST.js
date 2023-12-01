const Node = require("./nodeModel");

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

function preOrderTraversalPrint(rootNode) {
  if (rootNode === null) {
    return;
  }

  console.log(rootNode.value + " ");
  preOrderTraversalPrint(rootNode.left);
  preOrderTraversalPrint(rootNode.right);
}

module.exports = {
  sortedArrayToBST,
  preOrderTraversalPrint,
};
