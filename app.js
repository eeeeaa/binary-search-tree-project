const Tree = require("./js/BST");

main();

function main() {
  simpleTest();
}

function simpleTest() {
  const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 56, 77, 88];
  const tree = new Tree(list);

  tree.printTree();
  console.log(tree.height());
  console.log(tree.height(tree.find(10)));
  console.log(tree.depth());
  console.log(tree.depth(tree.find(8)));
}

function generateRandomNumberArray(maxLength) {
  let array = [];
  for (let i = 0; i < maxLength; i++) {
    array.push(Math.round(Math.random() * maxLength));
  }
  return array;
}

function driverTest() {
  const list = generateRandomNumberArray(15);

  const tree = new Tree(list);

  console.log("check balance");
  console.log(tree.isBalanced);

  tree.printTree();
  console.log("level ordering");
  console.log(tree.levelOrder());
  console.log("pre ordering");
  console.log(tree.preOrder());
  console.log("in ordering");
  console.log(tree.inOrder());
  console.log("post ordering");
  console.log(tree.postOrder());

  //TODO unbalance the tree

  tree.rebalance();

  console.log("check balance");
  console.log(tree.isBalanced);

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
