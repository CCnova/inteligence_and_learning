import { createNode } from "./nod.mjs";

export function createGraph() {
  let nodes = [];
  const root = null;
  let graph = {};

  return Object.freeze({
    nodes,
    root,
    graph,
    addNode(value, parent) {
      const newNode = createNode(value, parent);
      graph[value] = newNode;
      if (root == null) root = newNode;
      parent?.addNeighboor(newNode);
    },

    /**
     * Breadth First Search Algorithm
     *
     * @param {*} value anything that can be stored in a node
     * @returns Node obj with value searched
     */
    breadthFirstSearch(value) {
      let queue = [];
      this.root.searched = true;
      queue.push(this.root);
      while (queue.length !== 0) {
        const current = queue.pop();
        if (current.value === value) return current;
        for (let neighboor in current.neighboors) {
          if (neighboor.searched == false) {
            neighboor.searched = true;
            queue.push(neighboor);
          }
        }
      }
    },
  });
}
