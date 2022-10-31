import { useEffect, useRef, useState } from 'react'
import './Dropdown.css'

export default function Dropdown({name, onClick, bfs, dijkstra}) {
    const [open, setOpen] = useState(false)
    const dropdownMenuRef = useRef(null)

    useEffect(() => {
        let handler = (e) => {
            if(!dropdownMenuRef.current.contains(e.target)) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', handler)

        return () => {
            document.removeEventListener('mousedown', handler)
        }
    }, [])

    return (
        <div className="menu-container">
            <div className="menu-trigger" onClick={() => setOpen(!open)}>{name} 
            { open ? <span className="material-symbols-outlined custom-icon">arrow_drop_up</span> : <span className="material-symbols-outlined custom-icon">arrow_drop_down</span>}       
                
            </div>
            <div className={`dropdown-menu ${open ? 'open' : 'close'}`} ref={dropdownMenuRef}>
                <ul>
                    {/* <DropdownItem name={'Breadth First Search'} onClick={onClick}/>
                    <DropdownItem name={'Depth First Search'} onClick={onClick}/>
                    <DropdownItem name={'Djiktras Algorithm'} onClick={onClick}/>
                    <DropdownItem name={'More to come...'} onClick={onClick}/> */}

                    <li className="dropdownItem" onClick={() => {onClick("BFS");}}>Breadth First Search ( BFS )</li>
                    <li className="dropdownItem" onClick={() => {onClick("DFS");}}>Depth First Search ( DFS )</li>
                    <li className="dropdownItem" onClick={() => {onClick("Dijktras");}}>Djiktras Algorithm</li>
                </ul>
            </div>
        </div>
    )
}

function DropdownItem({name, onClick}) {
    return (
        <li className="dropdownItem" onClick={() => {onClick(name);}}>{name}</li>
    )
}