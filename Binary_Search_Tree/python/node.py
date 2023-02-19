from __future__ import annotations
from typing import Optional


class Node:

    def __init__(self, value) -> None:
        self.value = value
        self.left = None
        self.right = None

    def add_node(self, node: Node) -> None:
        if node.value < self.value and self.left is None:
            self.left = node
            return

        if node.value >= self.value and self.right is None:
            self.right = node
            return

        if node.value < self.value:
            self.left.add_node(node)
            return

        if node.value >= self.value:
            self.right.add_node(node)
            return

    def traverse(self) -> None:
        if not self.left is None:
            self.left.traverse()
        print(self.value)
        if not self.right is None:
            self.right.traverse()

    def search(self, value: int) -> Optional[Node]:
        if self.value == value:
            return self

        if value < self.value and self.left is not None:
            return self.left.search(value)

        if value > self.value and self.right is not None:
            return self.right.search(value)

        return None
