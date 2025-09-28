// 1. BFS for Graph Traversal
class Graph {
    constructor() {
        this.adjacencyList = new Map();
    }
    
    // Add vertex to graph
    addVertex(vertex) {
        if (!this.adjacencyList.has(vertex)) {
            this.adjacencyList.set(vertex, []);
        }
    }
    
    // Add edge between vertices
    addEdge(vertex1, vertex2) {
        this.addVertex(vertex1);
        this.addVertex(vertex2);
        this.adjacencyList.get(vertex1).push(vertex2);
        this.adjacencyList.get(vertex2).push(vertex1); // For undirected graph
    }
    
    // BFS traversal starting from a given vertex
    bfs(startVertex) {
        const visited = new Set();
        const queue = [startVertex];
        const result = [];
        
        visited.add(startVertex);
        
        while (queue.length > 0) {
            const currentVertex = queue.shift();
            result.push(currentVertex);
            
            // Visit all neighbors
            const neighbors = this.adjacencyList.get(currentVertex) || [];
            for (const neighbor of neighbors) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    queue.push(neighbor);
                }
            }
        }
        
        return result;
    }
    
    // BFS to find shortest path between two vertices
    shortestPath(start, end) {
        const visited = new Set();
        const queue = [{vertex: start, path: [start]}];
        visited.add(start);
        
        while (queue.length > 0) {
            const {vertex, path} = queue.shift();
            
            if (vertex === end) {
                return path;
            }
            
            const neighbors = this.adjacencyList.get(vertex) || [];
            for (const neighbor of neighbors) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    queue.push({
                        vertex: neighbor,
                        path: [...path, neighbor]
                    });
                }
            }
        }
        
        return null; // No path found
    }
}

// 2. BFS for Binary Tree Traversal (Level Order)
class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

class BinaryTree {
    constructor(root = null) {
        this.root = root;
    }
    
    // Level order traversal (BFS)
    levelOrder() {
        if (!this.root) return [];
        
        const result = [];
        const queue = [this.root];
        
        while (queue.length > 0) {
            const node = queue.shift();
            result.push(node.val);
            
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        
        return result;
    }
    
    // Level order with levels separated
    levelOrderByLevels() {
        if (!this.root) return [];
        
        const result = [];
        const queue = [this.root];
        
        while (queue.length > 0) {
            const levelSize = queue.length;
            const currentLevel = [];
            
            for (let i = 0; i < levelSize; i++) {
                const node = queue.shift();
                currentLevel.push(node.val);
                
                if (node.left) queue.push(node.left);
                if (node.right) queue.push(node.right);
            }
            
            result.push(currentLevel);
        }
        
        return result;
    }
}

// 3. BFS for 2D Grid/Matrix
function bfsGrid(grid, startRow, startCol) {
    if (!grid || grid.length === 0) return [];
    
    const rows = grid.length;
    const cols = grid[0].length;
    const visited = Array(rows).fill().map(() => Array(cols).fill(false));
    const queue = [{row: startRow, col: startCol}];
    const result = [];
    
    // Directions: up, down, left, right
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    
    visited[startRow][startCol] = true;
    
    while (queue.length > 0) {
        const {row, col} = queue.shift();
        result.push(grid[row][col]);
        
        // Check all 4 directions
        for (const [dr, dc] of directions) {
            const newRow = row + dr;
            const newCol = col + dc;
            
            // Check bounds and if not visited
            if (newRow >= 0 && newRow < rows && 
                newCol >= 0 && newCol < cols && 
                !visited[newRow][newCol]) {
                
                visited[newRow][newCol] = true;
                queue.push({row: newRow, col: newCol});
            }
        }
    }
    
    return result;
}

// Example usage and testing
function runExamples() {
    console.log("=== BFS Graph Traversal ===");
    const graph = new Graph();
    
    // Create a sample graph
    graph.addEdge('A', 'B');
    graph.addEdge('A', 'C');
    graph.addEdge('B', 'D');
    graph.addEdge('C', 'E');
    graph.addEdge('D', 'F');
    graph.addEdge('E', 'F');
    
    console.log("BFS traversal from A:", graph.bfs('A'));
    console.log("Shortest path from A to F:", graph.shortestPath('A', 'F'));
    
    console.log("\n=== BFS Binary Tree Traversal ===");
    // Create a sample binary tree:
    //       1
    //      / \
    //     2   3
    //    / \   \
    //   4   5   6
    const root = new TreeNode(1,
        new TreeNode(2, new TreeNode(4), new TreeNode(5)),
        new TreeNode(3, null, new TreeNode(6))
    );
    
    const tree = new BinaryTree(root);
    console.log("Level order traversal:", tree.levelOrder());
    console.log("Level order by levels:", tree.levelOrderByLevels());
    
    console.log("\n=== BFS 2D Grid Traversal ===");
    const grid = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ];
    
    console.log("BFS grid from (0,0):", bfsGrid(grid, 0, 0));
    console.log("BFS grid from (1,1):", bfsGrid(grid, 1, 1));
}

// Export for use in other modules
module.exports = {
    Graph,
    TreeNode,
    BinaryTree,
    bfsGrid
};

// Run examples if this file is executed directly
if (require.main === module) {
    runExamples();
}