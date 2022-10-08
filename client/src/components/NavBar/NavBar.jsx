import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllBreeds, searchByName } from "../../redux/actions";
import { useEffect, useRef, useState } from "react";
import Styles from './NavBar.module.css'
import { IoSearchCircle } from 'react-icons/io5'
import { SiDatadog } from 'react-icons/si'



export default function NavBar(props) {
    const dispatch = useDispatch()
    const inputRef = useRef()
    const breeds = useSelector((state) => state.breeds)
    const [input, setInput] = useState('')

    let id = breeds.length ? breeds[Math.ceil(Math.random() * (breeds.length - 1))].id : 1

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
        <div className={Styles.container}>
            <div className={Styles.title}>
                <h2><Link to='/'><SiDatadog/> Henry's Dogs</Link></h2>
            </div>
            <div className={Styles.navBar}>
                <Link to='/home'>Home</Link>
                <Link to="/createBreed">Create New Breed</Link>
                <Link to={`/breeds/${id}`}>Random Breed</Link>
                <div className={Styles.searchBar}>
                    <input ref={inputRef} placeholder='Search by name' value={input} onChange={e => handleOnChange(e)}></input>
                    <Link to='/search' style={{pointerEvents: input === '' ? 'none' : ''} }><IoSearchCircle onClick={e => onSearch(e)}/></Link>
                </div>
            </div>
        </div>
    )
}
