const Tree = require("./js/BST");
const Node = require("./js/nodeModel");
main();

function main() {
  driverTest();
}

function simpleTest() {
  const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 56, 77, 88];
  const tree = new Tree(list);

  tree.find(8).right = new Node(8.5);
  tree.printTree();
  console.log(Tree.isBalanced(tree));
  Tree.rebalance(tree);
  tree.printTree();
  console.log(Tree.isBalanced(tree));
}

function generateRandomNumberArray(maxLength) {
  let array = [];
  for (let i = 0; i < maxLength; i++) {
    array.push(Math.round(Math.random() * 99));
  }
  return array;
}

function generateRandomNumber() {
  return Math.round(Math.random() * 101);
}

function driverTest() {
  const list = generateRandomNumberArray(15);

  const tree = new Tree(list);

  //normal tree
  console.log("---normal---");
  console.log("check balance");
  console.log(Tree.isBalanced(tree));

  tree.printTree();
  console.log("level ordering");
  console.log(tree.levelOrder());
  console.log("pre ordering");
  console.log(tree.preOrder());
  console.log("in ordering");
  console.log(tree.inOrder());
  console.log("post ordering");
  console.log(tree.postOrder());

  //unbalance tree
  console.log("---unbalance---");
  const newNode = new Node(999);
  newNode.right = new Node(1999);
  tree.findLargestNode().right = newNode;

  console.log("check balance");
  console.log(Tree.isBalanced(tree));

  tree.printTree();
  console.log("level ordering");
  console.log(tree.levelOrder());
  console.log("pre ordering");
  console.log(tree.preOrder());
  console.log("in ordering");
  console.log(tree.inOrder());
  console.log("post ordering");
  console.log(tree.postOrder());

  //rebalanced tree
  console.log("---rebalance---");
  Tree.rebalance(tree);

  console.log("check balance");
  console.log(Tree.isBalanced(tree));

  tree.printTree();
  console.log("level ordering");
  console.log(tree.levelOrder());
  console.log("pre ordering");
  console.log(tree.preOrder());
  console.log("in ordering");
  console.log(tree.inOrder());
  console.log("post ordering");
  console.log(tree.postOrder());
}
