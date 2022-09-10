import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

export default function NavBar() {
    return (
        <div>
            <Link to='/home'>Home</Link>
            <Link to="/createBreed">Create New Breed</Link>
            <SearchBar></SearchBar>
        </div>
    )
}