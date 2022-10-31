import { useState } from 'react'
import Dropdown from '../Dropdown/Dropdown'
import './Navbar.css'

export default function Navbar({bfs, dijkstra}) {

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
                    <Dropdown name="Mazes and Patterns"/>
                    <button className="myButton" onClick={handleClick}>Visualize {selectedAlgo}</button>
                    <div>Clear Board</div>
                    <div>Clear Walls</div>
                </div>
            </nav>
        </header>
    )

}