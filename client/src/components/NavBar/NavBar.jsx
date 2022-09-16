import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import { getAllBreeds, searchByName } from "../../redux/actions";
import { useEffect, useRef, useState } from "react";

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
        setId(
            id = Math.floor(Math.random() * temperaments.length)
        )
    }

    useEffect(() => {
        dispatch(getAllBreeds())
    }, [])
    

    return (
        <div>
            <Link to='/home'>Home</Link>
            <Link to="/createBreed">Create New Breed</Link>
            <Link to={`/breeds/${temperaments[id] && temperaments[id].id}`} onClick={handleClick}>Random Breed</Link>
            <div>
                <input ref={inputRef}></input>
                <Link to='/search'><button onClick={e => onSearch(e)}>Search</button></Link>
            </div>
            {/* <SearchBar></SearchBar> */}
        </div>
    )
}
