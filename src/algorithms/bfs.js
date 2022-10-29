export default function bfs(grid, startNode, finishNode = {row: 8, col: 8}) {
    const visitedNodesInOrder = []
    const visitedNodes = [startNode]
    startNode.isVisited = true
    while (visitedNodes.length) {
        const currentNode = visitedNodes.shift();        
        visitedNodesInOrder.push(currentNode)
        if (currentNode.row === finishNode.row && currentNode.col === finishNode.col) return visitedNodesInOrder;
        
        updateUnvisitedNeighbors(currentNode, visitedNodes, grid)
    }
    return visitedNodesInOrder;
}

function updateUnvisitedNeighbors(node, visitedNodes, grid) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
        neighbor.previousNode = node;
        neighbor.isVisited = true
        visitedNodes.push(neighbor)        
    }
}

function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const { col, row } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
}