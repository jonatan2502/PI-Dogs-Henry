import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import { searchByName } from "../../redux/actions";
import { useRef } from "react";

export default function NavBar(props) {
    const dispatch = useDispatch()
    const inputRef = useRef()

    const onSearch = function (event) {
        console.log(inputRef)
        const name = event.target.value
        dispatch(searchByName(inputRef.current.value))
    }
    return (
        <div>
            <Link to='/home'>Home</Link>
            <Link to="/createBreed">Create New Breed</Link>
            <div>
                <input ref={inputRef}></input>
                <Link to='/search'><button onClick={e => onSearch(e)}>Search</button></Link>
            </div>
            {/* <SearchBar></SearchBar> */}
        </div>
    )
}
