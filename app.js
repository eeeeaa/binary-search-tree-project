const bst = require("./js/BST");

const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const rootNode = bst.sortedArrayToBST(list);

bst.preOrderTraversalPrint(rootNode);
