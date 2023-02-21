export function createNode(value) {
  let neighboors = [];
  let parent = null;
  let searched = false;

  return Object.freeze({
    value,
    searched,
    parent,
    addNeighboor(newNeighboor) {
      neighboors.push(newNeighboor);
    },
  });
}
