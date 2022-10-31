import { useState } from 'react'
import Dropdown from '../Dropdown/Dropdown'
import './Navbar.css'

export default function Navbar({bfs, dijkstra, clearBoard, clearWalls}) {

    const [selectedAlgo, setSelectedAlgo] = useState('')

    const handleClick = () => {
        if(selectedAlgo === 'BFS') bfs();
        else if(selectedAlgo === 'Dijktras')  dijkstra();
    }

    return (
        <header>
            <nav className="navbar">
                <span className="logoName">Path Visualizer</span>
                <div className="action">
                    <Dropdown name="Algorithms" onClick={setSelectedAlgo} bfs={bfs} dijkstra={dijkstra}/>
                    <button className="myButton" onClick={handleClick}>Visualize {selectedAlgo}</button>
                    <button className="myButton" onClick={clearBoard}>Clear Board</button>
                    <button className="myButton" onClick={clearWalls}>Clear Walls</button>
                    
                </div>
            </nav>
        </header>
    )

}