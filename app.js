const Tree = require("./js/BST");

const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

const tree = new Tree(list);

tree.printTree();
console.log(tree.treeAsArray());

tree.insert(12);
tree.insert(-2);
tree.printTree();
console.log(tree.treeAsArray());

tree.delete(3);
tree.printTree();
console.log(tree.treeAsArray());
