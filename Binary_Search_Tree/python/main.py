from tree import Tree
from random import randint


tree = Tree()

for i in range(0, 10):
    tree.add_node(randint(0, 100))

# tree.traverse()

# tree.search(10)

tree.print_tree()
