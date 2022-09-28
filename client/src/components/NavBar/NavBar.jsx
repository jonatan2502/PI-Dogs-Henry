import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllBreeds, searchByName } from "../../redux/actions";
import { useEffect, useRef, useState } from "react";
import Styles from './NavBar.module.css'
import { BiSearchAlt } from 'react-icons/bi'




export default function NavBar(props) {
    const dispatch = useDispatch()
    const inputRef = useRef()
    const breeds = useSelector((state) => state.breeds)
    const [input, setInput] = useState('')

    let id = breeds.length ? breeds[Math.ceil(Math.random() * (breeds.length - 1))].id : 1
    console.log(breeds)

    const onSearch = function (event) {
        dispatch(searchByName(inputRef.current.value))
        inputRef.current.value = ''
    }

    const handleOnChange = (e) => {
        setInput(e.target.value)
    }
    
    useEffect(() => {
        dispatch(getAllBreeds())
    }, [])

    return (
        <div className={Styles.navBar}>
            <Link to='/home'>Home</Link>
            <Link to="/createBreed">Create New Breed</Link>
            <Link to={`/breeds/${id}`}>Random Breed</Link>
            <div className={Styles.searchBar}>
                <input ref={inputRef} placeholder='Search by name' value={input} onChange={e => handleOnChange(e)}></input>
                <button onClick={e => onSearch(e)}><Link to='/search'  style={{pointerEvents: input === '' ? 'none' : ''}}><BiSearchAlt/></Link></button>
            </div>
        </div>
    )
}
