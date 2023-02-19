function Tree() {
  this.root = null;
}

Tree.prototype.traverse = function () {
  this.root.visit(this.root);
};

Tree.prototype.search = function (value) {
  return this.root.search(value);
};

Tree.prototype.addValue = function (n) {
  const node = new Node(n);
  if (this.root == null) {
    this.root = node;
    this.root.x = width / 2;
    this.root.y = 16;
  } else {
    this.root.addNode(node);
  }
};
