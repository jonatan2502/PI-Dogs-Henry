import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getAllBreeds, searchByName } from "../../redux/actions";
import { useEffect, useRef, useState } from "react";
import Styles from './NavBar.module.css'
import { BiSearchAlt } from 'react-icons/bi'




export default function NavBar(props) {
    const dispatch = useDispatch()
    const inputRef = useRef()
    const breeds = useSelector((state) => state.breeds)
    // let [aux, setAux] = useState(breeds)
    // let { id } = useParams()
    // let id = breeds[Math.floor(Math.random() * breeds.length)].id
    let id = Math.ceil(Math.random() * (breeds.length - 1))
    console.log(breeds, id)
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
        // id = aux.length ? aux[Math.floor(Math.random() * aux.length)].id : id
        // setId(
        //     id = breeds[Math.floor(Math.random() * breeds.length).id]
        // )
    }, [])
    

    return (
        <div className={Styles.navBar}>
            <Link to='/home'>Home</Link>
            <Link to="/createBreed">Create New Breed</Link>
            {/* <Link to={`/breeds/${temperaments[id] && temperaments[id].id }`}>Random Breed</Link> */}
            <Link to={`/breeds/${id}`}>Random Breed</Link>
            {/* <Link to='/breeds/randomBreed'>Random Breed</Link> */}
            <div className={Styles.searchBar}>
                <input ref={inputRef} placeholder='Search by name'></input>
                <Link to='/search'><button onClick={e => onSearch(e)}> <BiSearchAlt/> </button></Link>
            </div>
            {/* <SearchBar></SearchBar> */}
        </div>
    )
}
