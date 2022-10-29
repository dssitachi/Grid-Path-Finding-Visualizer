import { useEffect, useState } from "react";
import Node from "./Node/Node";
import './PathFindingVisualizer.css'
import { dijkstra, getNodesInShortestPathOrder } from '../../algorithms/djiktras'

const START_NODE_ROW = 10
const START_NODE_COL = 15
const FINISH_NODE_ROW = 8
const FINITSH_NODE_COL = 35
const GRID_ROWS = 30
const GRID_COLS = 50

export default function PathFindingVisualizer() {

    const [grid, setGrid] = useState([])
    const [mouseIsPressed, setMouseIsPressed] = useState(false)

    useEffect(() => {
        setGrid(getInitialGrid())
    }, [])

    const handleMouseDown = (row, col) => {
        const newGrid = getNewGridWithWallToggled(grid, row, col);
        setGrid(newGrid)
        setMouseIsPressed(true)
    }
    
    const handleMouseEnter = (row, col) => {
        if (!mouseIsPressed) return;
        const newGrid = getNewGridWithWallToggled(grid, row, col);
        setGrid(newGrid)
    }

    const handleMouseUp = () => {
        setMouseIsPressed(false)
    }

    const visualizeDijstra = () => {
        const startNode = grid[START_NODE_ROW][START_NODE_COL]
        const finishNode = grid[FINISH_NODE_ROW][FINITSH_NODE_COL]
        const visitedNodesInOrder = dijkstra(grid, startNode, finishNode)
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode)
        animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder)
    }

    return (
        <>
            <button onClick={() => visualizeDijstra()}>
                Visualize Dijkstra's Algorithm
            </button>
            <div className="grid">
                { grid.map((row, rowIndex) => {
                    return <div className="rowContainer" key={rowIndex}> 
                        { row.map((node, nodeIndex) => { 
                            const {row, col, isFinish, isStart, isWall} = node;
                            return (<Node 
                                        key={nodeIndex} 
                                        col={col}
                                        row={row}
                                        isFinish={isFinish} 
                                        isStart={isStart}
                                        isWall={isWall}
                                        mouseIsPressed={mouseIsPressed}
                                        onMouseDown={handleMouseDown}
                                        onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                                        onMouseUp={(row, col) => handleMouseUp(row, col)}>
                                    </Node>
                            )}) } 
                    </div>
                })}
            </div>
        </>
    )
}

function getInitialGrid() {
    const grid = []
    for(let row = 0; row < GRID_ROWS; row++) {
        const currRow = []
        for(let col = 0; col < GRID_COLS; col++) {
            currRow.push(createNode(row, col))
        }
        grid.push(currRow)
    }
    return grid;
}

function createNode(row, col) {
    return {
        row,
        col,
        isStart: row === START_NODE_ROW && col === START_NODE_COL,
        isFinish: row === FINISH_NODE_ROW && col === FINITSH_NODE_COL,
        distance: Infinity,
        isVisited: false,
        isWall: false,
        previousNode: null
    }
}

function animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
      }, 10 * i);
    }
}

function animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path';
      }, 50 * i);
    }
}

function getNewGridWithWallToggled(grid, row, col) {
    const newGrid = grid.slice()
    const node = newGrid[row][col]
    const newNode = {
        ...node,
        isWall: !node.isWall
    }
    newGrid[row][col] = newNode
    return newGrid
}