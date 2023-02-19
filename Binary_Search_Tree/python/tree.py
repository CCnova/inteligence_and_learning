from node import Node
from typing import Optional


class Tree:

    def __init__(self):
        self.root = None

    def add_node(self, value: int) -> None:
        node = Node(value)
        if self.root is None:
            self.root = node
            return

        self.root.add_node(node)

    def traverse(self) -> None:
        self.root.traverse()

    def search(self, value: int) -> Optional[Node]:
        found = self.root.search(value)

        if found is None:
            print(f'{value} not found in tree')
        else:
            print(f'Found node={found} with value {value}')
        return found

    def print_tree(self):
        self.root.print_chunk(0)
