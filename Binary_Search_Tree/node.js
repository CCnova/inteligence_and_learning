function Node(value, x, y) {
  this.value = value;
  this.left = null;
  this.right = null;
  this.x = x;
  this.y = y;
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

Node.prototype.visit = function (parent) {
  if (this.left != null) {
    this.left.visit(this);
  }
  console.log(this.value);
  fill(255);
  noStroke();
  text(this.value, this.x, this.y);
  stroke(255);
  line(parent.x, parent.y, this.x, this.y);
  if (this.right != null) {
    this.right.visit(this);
  }
};

Node.prototype.addNode = function (n, level = 0) {
  if (n.value < this.value && this.left == null) {
    this.left = n;
    this.left.x = this.x - 2 * (50 - level) - 10;
    this.left.y = this.y + 20;
    return;
  }
  if (n.value < this.value && this.left != null) {
    return this.left.addNode(n, level + 1);
  }

  if (n.value > this.value && this.right == null) {
    this.right = n;
    this.right.x = this.x + 2 * (50 + level) + 10;
    this.right.y = this.y + 20;
    return;
  }
  if (n.value > this.value && this.right != null) {
    return this.right.addNode(n, level + 1);
  }
};
