let tree;

function setup() {
  noCanvas();
  tree = new Tree();
  tree.addValue(5);
  for (let i = 0; i < 10; i++) {
    tree.addValue(floor(random(0, 100)));
  }
  console.log(tree);
  tree.traverse();
}
