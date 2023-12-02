const Tree = require("../js/BST");

test("tree created correctly", () => {
  const tree = new Tree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
  expect(tree.treeAsArray()).toStrictEqual([6, 3, 1, 2, 4, 5, 9, 7, 8, 10, 11]);
});

test("tree create valid array correctly", () => {
  const tree = new Tree([1, 1, 2, 2, 3, 4, 8, 5, 6, 7, 9, 8, 10, 10, 11]);
  expect(tree.treeAsArray()).toStrictEqual([6, 3, 1, 2, 4, 5, 9, 7, 8, 10, 11]);
});

test("test inserting new value in a tree", () => {
  const tree = new Tree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
  tree.insert(12);
  tree.insert(-2);
  expect(tree.treeAsArray()).toStrictEqual([
    6, 3, 1, -2, 2, 4, 5, 9, 7, 8, 10, 11, 12,
  ]);
});
