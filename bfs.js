// Graph represented as an adjacency list
class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }

  addEdge(v1, v2) {
    this.adjacencyList[v1].push(v2);
    this.adjacencyList[v2].push(v1); // Remove this line for directed graph
  }

  // BFS Implementation
  bfs(start) {
    const queue = [start];
    const result = [];
    const visited = {};
    visited[start] = true;

    while (queue.length) {
      let vertex = queue.shift();
      result.push(vertex);

      this.adjacencyList[vertex].forEach(neighbor => {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          queue.push(neighbor);
        }
      });
    }

    return result;
  }

  // BFS to find shortest path between two nodes
  bfsShortestPath(start, end) {
    const queue = [[start]];
    const visited = new Set([start]);

    while (queue.length) {
      const path = queue.shift();
      const vertex = path[path.length - 1];

      if (vertex === end) {
        return path;
      }

      for (let neighbor of this.adjacencyList[vertex]) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push([...path, neighbor]);
        }
      }
    }

    return null; // No path found
  }
}

// Example usage
const graph = new Graph();

// Add vertices
['A', 'B', 'C', 'D', 'E', 'F'].forEach(v => graph.addVertex(v));

// Add edges
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('B', 'D');
graph.addEdge('C', 'E');
graph.addEdge('D', 'E');
graph.addEdge('D', 'F');
graph.addEdge('E', 'F');

console.log('BFS traversal starting from A:', graph.bfs('A'));
// Output: ['A', 'B', 'C', 'D', 'E', 'F']

console.log('Shortest path from A to F:', graph.bfsShortestPath('A', 'F'));
// Output: ['A', 'B', 'D', 'F']

// BFS for a tree/binary tree
function bfsTree(root) {
  if (!root) return [];
  
  const queue = [root];
  const result = [];

  while (queue.length) {
    const node = queue.shift();
    result.push(node.val);

    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }

  return result;
}

// Example tree node structure
class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

// Create a simple tree
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);

console.log('BFS tree traversal:', bfsTree(root));
// Output: [1, 2, 3, 4, 5]