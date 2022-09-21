import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllBreeds, searchByName } from "../../redux/actions";
import { useEffect, useRef, useState } from "react";
import Styles from './NavBar.module.css'
import { BiSearchAlt } from 'react-icons/bi'



export default function NavBar(props) {
    const dispatch = useDispatch()
    const inputRef = useRef()
    const temperaments = useSelector((state) => state.breeds)
    let [id, setId] = useState(22)

    const onSearch = function (event) {
        //console.log(inputRef)
        //const name = event.target.value
        dispatch(searchByName(inputRef.current.value))
        inputRef.current.value = ''
    }
    // let i = Math.floor(Math.random() * temperaments.length)
    
    const handleClick = () => {
    }
    
    useEffect(() => {
        dispatch(getAllBreeds())
        setId(
            id = Math.floor(Math.random() * temperaments.length)
        )
    }, [])
    

    return (
        <div className={Styles.navBar}>
            <Link to='/home'>Home</Link>
            <Link to="/createBreed">Create New Breed</Link>
            <Link to={`/breeds/${temperaments[id] && temperaments[id].id}`}>Random Breed</Link>
            <div>
                <input ref={inputRef} placeholder='Search by name'></input>
                <Link to='/search'><button onClick={e => onSearch(e)}> Go </button></Link>
            </div>
            {/* <SearchBar></SearchBar> */}
        </div>
    )
}
