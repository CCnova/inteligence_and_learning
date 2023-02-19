function Tree() {
  this.root = null;
}

Tree.prototype.traverse = function () {
  this.root.visit();
};

Tree.prototype.search = function (value) {
  return this.root.search(value);
};

Tree.prototype.addValue = function (n) {
  const node = new Node(n);
  if (this.root == null) {
    this.root = node;
  } else {
    this.root.addNode(node);
  }
};
