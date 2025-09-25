class Graph {
    constructor() {
        this.adjacencyList = {};
    }
    
    // Add vertex to the graph
    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) {
            this.adjacencyList[vertex] = [];
        }
    }
    
    // Add edge between two vertices (undirected)
    addEdge(v1, v2) {
        if (this.adjacencyList[v1] && this.adjacencyList[v2]) {
            this.adjacencyList[v1].push(v2);
            this.adjacencyList[v2].push(v1);
        }
    }
    
    // BFS traversal starting from a given vertex
    bfs(startVertex) {
        if (!this.adjacencyList[startVertex]) return [];
        
        const visited = new Set();
        const queue = [startVertex];
        const result = [];
        
        visited.add(startVertex);
        
        while (queue.length > 0) {
            const currentVertex = queue.shift();
            result.push(currentVertex);
            
            // Visit all unvisited neighbors
            this.adjacencyList[currentVertex].forEach(neighbor => {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    queue.push(neighbor);
                }
            });
        }
        
        return result;
    }
    
    // BFS with distance tracking
    bfsWithDistance(startVertex) {
        if (!this.adjacencyList[startVertex]) return {};
        
        const visited = new Set();
        const queue = [[startVertex, 0]]; // [vertex, distance]
        const distances = {};
        
        visited.add(startVertex);
        distances[startVertex] = 0;
        
        while (queue.length > 0) {
            const [currentVertex, distance] = queue.shift();
            
            this.adjacencyList[currentVertex].forEach(neighbor => {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    distances[neighbor] = distance + 1;
                    queue.push([neighbor, distance + 1]);
                }
            });
        }
        
        return distances;
    }
    
    // Find shortest path between two vertices
    shortestPath(start, end) {
        if (!this.adjacencyList[start] || !this.adjacencyList[end]) return null;
        
        const visited = new Set();
        const queue = [[start, [start]]]; // [vertex, path]
        
        visited.add(start);
        
        while (queue.length > 0) {
            const [currentVertex, path] = queue.shift();
            
            if (currentVertex === end) {
                return path;
            }
            
            this.adjacencyList[currentVertex].forEach(neighbor => {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    queue.push([neighbor, [...path, neighbor]]);
                }
            });
        }
        
        return null; // No path found
    }
    
    // Check if graph is connected
    isConnected() {
        const vertices = Object.keys(this.adjacencyList);
        if (vertices.length === 0) return true;
        
        const bfsResult = this.bfs(vertices[0]);
        return bfsResult.length === vertices.length;
    }
    
    // Find all connected components
    getConnectedComponents() {
        const visited = new Set();
        const components = [];
        
        Object.keys(this.adjacencyList).forEach(vertex => {
            if (!visited.has(vertex)) {
                const component = this.bfs(vertex);
                component.forEach(v => visited.add(v));
                components.push(component);
            }
        });
        
        return components;
    }
    
    // Display the graph
    display() {
        console.log("Graph Structure:");
        for (const vertex in this.adjacencyList) {
            console.log(`${vertex} -> ${this.adjacencyList[vertex].join(', ')}`);
        }
    }
}

// 2. GRID/MATRIX BFS IMPLEMENTATION
// ================================

// BFS for pathfinding in a 2D grid
function gridBFS(grid, start, end) {
    const rows = grid.length;
    const cols = grid[0].length;
    const visited = Array(rows).fill().map(() => Array(cols).fill(false));
    const queue = [[start[0], start[1], 0]]; // [row, col, distance]
    const parent = Array(rows).fill().map(() => Array(cols).fill(null));
    
    // 4-directional movement
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    
    visited[start[0]][start[1]] = true;
    
    while (queue.length > 0) {
        const [row, col, dist] = queue.shift();
        
        // Reached destination
        if (row === end[0] && col === end[1]) {
            return {
                distance: dist,
                path: reconstructPath(parent, start, end)
            };
        }
        
        // Explore all 4 directions
        directions.forEach(([dr, dc]) => {
            const newRow = row + dr;
            const newCol = col + dc;
            
            if (isValidCell(newRow, newCol, rows, cols) && 
                !visited[newRow][newCol] && 
                grid[newRow][newCol] === 0) {
                
                visited[newRow][newCol] = true;
                parent[newRow][newCol] = [row, col];
                queue.push([newRow, newCol, dist + 1]);
            }
        });
    }
    
    return { distance: -1, path: null }; // No path found
}

// BFS for 8-directional movement (including diagonals)
function gridBFS8Directions(grid, start, end) {
    const rows = grid.length;
    const cols = grid[0].length;
    const visited = Array(rows).fill().map(() => Array(cols).fill(false));
    const queue = [[start[0], start[1], 0]];
    
    // 8-directional movement
    const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],           [0, 1],
        [1, -1],  [1, 0],  [1, 1]
    ];
    
    visited[start[0]][start[1]] = true;
    
    while (queue.length > 0) {
        const [row, col, dist] = queue.shift();
        
        if (row === end[0] && col === end[1]) {
            return dist;
        }
        
        directions.forEach(([dr, dc]) => {
            const newRow = row + dr;
            const newCol = col + dc;
            
            if (isValidCell(newRow, newCol, rows, cols) && 
                !visited[newRow][newCol] && 
                grid[newRow][newCol] === 0) {
                
                visited[newRow][newCol] = true;
                queue.push([newRow, newCol, dist + 1]);
            }
        });
    }
    
    return -1;
}

// Helper functions for grid BFS
function isValidCell(row, col, rows, cols) {
    return row >= 0 && row < rows && col >= 0 && col < cols;
}

function reconstructPath(parent, start, end) {
    const path = [];
    let current = end;
    
    while (current && (current[0] !== start[0] || current[1] !== start[1])) {
        path.unshift(current);
        current = parent[current[0]][current[1]];
    }
    
    path.unshift(start);
    return path;
}

// 3. BINARY TREE BFS (LEVEL ORDER TRAVERSAL)
// ==========================================

class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

// Level order traversal (BFS)
function levelOrderTraversal(root) {
    if (!root) return [];
    
    const result = [];
    const queue = [root];
    
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

// BFS to find maximum depth of binary tree
function maxDepth(root) {
    if (!root) return 0;
    
    let depth = 0;
    const queue = [root];
    
    while (queue.length > 0) {
        const levelSize = queue.length;
        depth++;
        
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }
    
    return depth;
}

// BFS to find minimum depth of binary tree
function minDepth(root) {
    if (!root) return 0;
    
    let depth = 1;
    const queue = [root];
    
    while (queue.length > 0) {
        const levelSize = queue.length;
        
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            
            // If we find a leaf node, return current depth
            if (!node.left && !node.right) {
                return depth;
            }
            
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        
        depth++;
    }
    
    return depth;
}

// 4. ADVANCED BFS APPLICATIONS
// =============================

// Word Ladder Problem - Find shortest transformation sequence
function wordLadder(beginWord, endWord, wordList) {
    const wordSet = new Set(wordList);
    if (!wordSet.has(endWord)) return 0;
    
    const queue = [[beginWord, 1]];
    const visited = new Set([beginWord]);
    
    while (queue.length > 0) {
        const [word, steps] = queue.shift();
        
        if (word === endWord) return steps;
        
        // Try changing each character
        for (let i = 0; i < word.length; i++) {
            for (let c = 97; c <= 122; c++) { // 'a' to 'z'
                const newWord = word.slice(0, i) + String.fromCharCode(c) + word.slice(i + 1);
                
                if (wordSet.has(newWord) && !visited.has(newWord)) {
                    visited.add(newWord);
                    queue.push([newWord, steps + 1]);
                }
            }
        }
    }
    
    return 0; // No transformation possible
}



// Shortest Bridge Problem - Connect two islands
function shortestBridge(grid) {
    const n = grid.length;
    const queue = [];
    let found = false;
    
    // Find first island and mark it
    for (let i = 0; i < n && !found; i++) {
        for (let j = 0; j < n && !found; j++) {
            if (grid[i][j] === 1) {
                markIsland(grid, i, j, queue);
                found = true;
            }
        }
    }
    
    // BFS to find shortest bridge to second island
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    let steps = 0;
    
    while (queue.length > 0) {
        const size = queue.length;
        
        for (let i = 0; i < size; i++) {
            const [row, col] = queue.shift();
            
            directions.forEach(([dr, dc]) => {
                const newRow = row + dr;
                const newCol = col + dc;
                
                if (isValidCell(newRow, newCol, n, n)) {
                    if (grid[newRow][newCol] === 1) {
                        return steps; // Found second island
                    }
                    if (grid[newRow][newCol] === 0) {
                        grid[newRow][newCol] = 2; // Mark as visited
                        queue.push([newRow, newCol]);
                    }
                }
            });
        }
        
        steps++;
    }
    
    return -1;
}

function markIsland(grid, row, col, queue) {
    if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length || 
        grid[row][col] !== 1) {
        return;
    }
    
    grid[row][col] = 2; // Mark as first island
    queue.push([row, col]);
    
    // Mark all connected cells
    markIsland(grid, row - 1, col, queue);
    markIsland(grid, row + 1, col, queue);
    markIsland(grid, row, col - 1, queue);
    markIsland(grid, row, col + 1, queue);
}

// 5. UTILITY FUNCTIONS AND EXAMPLES
// =================================

// Generate a sample graph for testing
function createSampleGraph() {
    const graph = new Graph();
    
    // Add vertices
    ['A', 'B', 'C', 'D', 'E', 'F'].forEach(vertex => {
        graph.addVertex(vertex);
    });
    
    // Add edges
    graph.addEdge('A', 'B');
    graph.addEdge('A', 'C');
    graph.addEdge('B', 'D');
    graph.addEdge('C', 'E');
    graph.addEdge('D', 'F');
    graph.addEdge('E', 'F');
    
    return graph;
}

// Create a sample binary tree
function createSampleTree() {
    return new TreeNode(1,
        new TreeNode(2,
            new TreeNode(4),
            new TreeNode(5)
        ),
        new TreeNode(3,
            new TreeNode(6),
            new TreeNode(7)
        )
    );
}

// Create a sample grid for pathfinding
function createSampleGrid() {
    return [
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0]
    ];
}

// 6. DEMONSTRATION AND TESTING
// =============================

function demonstrateBFS() {
    console.log("=== BFS DEMONSTRATIONS ===\n");
    
    // Graph BFS Demo
    console.log("1. GRAPH BFS:");
    const graph = createSampleGraph();
    graph.display();
    console.log("BFS from A:", graph.bfs('A'));
    console.log("BFS with distances from A:", graph.bfsWithDistance('A'));
    console.log("Shortest path A to F:", graph.shortestPath('A', 'F'));
    console.log("Is connected:", graph.isConnected());
    console.log();
    
    // Grid BFS Demo
    console.log("2. GRID BFS:");
    const grid = createSampleGrid();
    console.log("Grid:");
    grid.forEach(row => console.log(row.join(' ')));
    const pathResult = gridBFS(grid, [0, 0], [4, 4]);
    console.log("Shortest path from [0,0] to [4,4]:");
    console.log("Distance:", pathResult.distance);
    console.log("Path:", pathResult.path);
    console.log();
    
    // Tree BFS Demo
    console.log("3. BINARY TREE BFS:");
    const tree = createSampleTree();
    console.log("Level order traversal:", levelOrderTraversal(tree));
    console.log("Max depth:", maxDepth(tree));
    console.log("Min depth:", minDepth(tree));
    console.log();
    
    // Advanced BFS Demo
    console.log("4. ADVANCED BFS APPLICATIONS:");
    
    // Word Ladder
    const wordList = ["hot", "dot", "dog", "lot", "log", "cog"];
    console.log("Word Ladder (hit -> cog):", 
        wordLadder("hit", "cog", wordList));
    
    // Rotting Oranges
    const orangeGrid = [
        [2, 1, 1],
        [1, 1, 0],
        [0, 1, 1]
    ];
    console.log("Rotting Oranges time:", rottingOranges(orangeGrid));
    
    console.log("\n=== END DEMONSTRATIONS ===");
}

// Performance testing
function performanceTest() {
    console.log("\n=== PERFORMANCE TEST ===");
    
    const start = performance.now();
    
    // Create a larger graph
    const largeGraph = new Graph();
    for (let i = 0; i < 1000; i++) {
        largeGraph.addVertex(i.toString());
    }
    
    // Add random edges
    for (let i = 0; i < 500; i++) {
        const v1 = Math.floor(Math.random() * 1000).toString();
        const v2 = Math.floor(Math.random() * 1000).toString();
        largeGraph.addEdge(v1, v2);
    }
    
    // Perform BFS
    const bfsResult = largeGraph.bfs('0');
    
    const end = performance.now();
    
    console.log(`BFS on graph with 1000 vertices: ${end - start}ms`);
    console.log(`Visited ${bfsResult.length} nodes`);
}

// Export for use in other modules (if using modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Graph,
        TreeNode,
        gridBFS,
        gridBFS8Directions,
        levelOrderTraversal,
        maxDepth,
        minDepth,
        wordLadder,
        rottingOranges,
        shortestBridge,
        demonstrateBFS,
        performanceTest
    };
}

// Run demonstrations if this file is executed directly
if (typeof window === 'undefined') {
    demonstrateBFS();
    performanceTest();
}