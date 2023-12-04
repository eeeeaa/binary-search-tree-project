const Tree = require("../js/BST");

test("driver test", () => {
  const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  const tree = new Tree(list);

  //expect(tree.isBalanced()).toBe(true);

  expect(tree.levelOrder()).toStrictEqual([6, 3, 9, 1, 4, 7, 10, 2, 5, 8, 11]);
  expect(tree.preOrder()).toStrictEqual([6, 3, 1, 2, 4, 5, 9, 7, 8, 10, 11]);
  expect(tree.inOrder()).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
  expect(tree.postOrder()).toStrictEqual([2, 1, 5, 4, 3, 8, 7, 11, 10, 9, 6]);

  //TODO unbalance the tree

  //expect(tree.isBalanced()).toBe(false);

  //tree.rebalance();

  //expect(tree.isBalanced()).toBe(true);

  //verify rebalanced tree
});

test("tree created correctly", () => {
  const tree = new Tree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
  expect(tree.preOrder()).toStrictEqual([6, 3, 1, 2, 4, 5, 9, 7, 8, 10, 11]);
});

test("tree create valid array correctly", () => {
  const tree = new Tree([1, 1, 2, 2, 3, 4, 8, 5, 6, 7, 9, 8, 10, 10, 11]);
  expect(tree.preOrder()).toStrictEqual([6, 3, 1, 2, 4, 5, 9, 7, 8, 10, 11]);
});

test("test inserting new value in a tree", () => {
  const tree = new Tree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
  tree.insert(12);
  tree.insert(-2);
  expect(tree.preOrder()).toStrictEqual([
    6, 3, 1, -2, 2, 4, 5, 9, 7, 8, 10, 11, 12,
  ]);
});

test("test deleting value in a tree: no children", () => {
  const tree = new Tree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
  tree.delete(2);
  expect(tree.preOrder()).toStrictEqual([6, 3, 1, 4, 5, 9, 7, 8, 10, 11]);
});

test("test deleting value in a tree: one children", () => {
  const tree = new Tree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
  tree.delete(1);
  expect(tree.preOrder()).toStrictEqual([6, 3, 2, 4, 5, 9, 7, 8, 10, 11]);
});

test("test deleting value in a tree: two children", () => {
  const tree = new Tree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
  tree.delete(3);
  expect(tree.preOrder()).toStrictEqual([6, 4, 1, 2, 5, 9, 7, 8, 10, 11]);
});

test("test finding value in a tree", () => {
  const tree = new Tree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
  expect(tree.find(7).value).toBe(7);
  expect(tree.find(14)).toBe(null);
});

test("test level order traversal", () => {
  const tree = new Tree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
  expect(tree.levelOrder()).toStrictEqual([6, 3, 9, 1, 4, 7, 10, 2, 5, 8, 11]);
  tree.levelOrder((node) => {
    node.value = node.value * 2;
  });
  expect(tree.levelOrder()).toStrictEqual([
    12, 6, 18, 2, 8, 14, 20, 4, 10, 16, 22,
  ]);
});

test("test preOrder traversal", () => {
  const tree = new Tree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
  expect(tree.preOrder()).toStrictEqual([6, 3, 1, 2, 4, 5, 9, 7, 8, 10, 11]);
  tree.preOrder((node) => {
    node.value = node.value * 2;
  });
  expect(tree.preOrder()).toStrictEqual([
    12, 6, 2, 4, 8, 10, 18, 14, 16, 20, 22,
  ]);
});

test("test inOrder traversal", () => {
  const tree = new Tree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
  expect(tree.inOrder()).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
  tree.inOrder((node) => {
    node.value = node.value * 2;
  });
  expect(tree.inOrder()).toStrictEqual([
    2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22,
  ]);
});

test("test postOrder traversal", () => {
  const tree = new Tree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
  expect(tree.postOrder()).toStrictEqual([2, 1, 5, 4, 3, 8, 7, 11, 10, 9, 6]);
  tree.postOrder((node) => {
    node.value = node.value * 2;
  });
  expect(tree.postOrder()).toStrictEqual([
    4, 2, 10, 8, 6, 16, 14, 22, 20, 18, 12,
  ]);
});
