function Node(value) {
  this.value = value;
  this.left = null;
  this.right = null;
}

Node.prototype.search = function (value) {
  if (this.value == value) {
    console.log("Found: ", value);
    return this;
  }

  if (value < this.value && this.left != null) {
    return this.left.search(value);
  }

  if (value > this.value && this.right != null) {
    return this.right.search(value);
  }

  console.log("Value not in the Tree");
  return null;
};

Node.prototype.visit = function () {
  if (this.left != null) {
    this.left.visit();
  }
  console.log(this.value);
  if (this.right != null) {
    this.right.visit();
  }
};

Node.prototype.addNode = function (n) {
  if (n.value < this.value && this.left == null) {
    return (this.left = n);
  }
  if (n.value < this.value && this.left != null) {
    return this.left.addNode(n);
  }

  if (n.value > this.value && this.right == null) {
    return (this.right = n);
  }
  if (n.value > this.value && this.right != null) {
    return this.right.addNode(n);
  }
};
