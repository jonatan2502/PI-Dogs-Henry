import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { getAllTemperaments } from '../../redux/actions'
import { Link } from 'react-router-dom'
import axios from 'axios'
import NavBar from "../NavBar/NavBar";
import Video from '../../assets/img/production ID_4838318.mp4'
import Styles from './Form.module.css'
import { GrFormAdd } from 'react-icons/gr'
import { BsTrash } from 'react-icons/bs'


export default function Form() {

    const minWeightRef = useRef()
    const maxWeightRef = useRef()
    const minHeightRef = useRef()
    const maxHeightRef = useRef()
    const minLifespanRef = useRef()
    const maxLifespanRef = useRef()
    const temperamentsRef = useRef()
    const imageRef = useRef()
    
    const temperaments = useSelector(store => store.temperaments)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllTemperaments())
    }, [])

    const [breed, setBreed] = useState({
        name: '',
        minHeight: '',
        maxHeight: '',
        minWeight: '',
        maxWeight: '',
        minLifespan: '',
        maxLifespan: '',
        temperaments: [],
        image: '',
    })
    
    const [errorMessage, setErrorMessage] = useState({
        name: ' ',
        height: ' ',
        weight: ' ',
        lifespan: ' ',
        image: ' ',
    })
    
    // On every change in input fields performs state updates and validates input data from user
    const handleChange = (e) => {
        if (e.target.name === 'name') {
            setBreed({
                ...breed,
                [e.target.name]: e.target.value.slice(0, 50)
            })
        } else if (e.target.name === 'image') {
            setBreed({
                ...breed,
                [e.target.name]: e.target.value 
            })
        } else {
            setBreed({
                ...breed,
                [e.target.name]: e.target.value.replace('-', '') 
            })
        }
        validate(e)
    }

    const handleAddTemperament = (e) => {
        e.preventDefault()
        // console.log(temperamentsRef)
        const value = temperamentsRef.current.value
        setBreed({
                ...breed,
                temperaments: !breed.temperaments.includes(value) ? [...breed.temperaments, value] : breed.temperaments
            })
        temperamentsRef.current.value = ''
    }

    const handleReset = (e) => {
        e.preventDefault()
        setBreed({
            ...breed,
            temperaments: ''
        })
    }

    // Validates name and image URL input fields and calls aux function to validades numeric fields depending on the input name.
    // Uses useRef hook in order to get actual values from input fields
    const validate = (event) => {
        const name = event.target.name
        if (event.target.name === 'name' ) {
            setErrorMessage({
                ...errorMessage,
                name: !/^[a-zA-Z\s]*$/.test(event.target.value) ? 'Only letters and spaces are allowed' : ''
            })
        } else if (event.target.name === 'image') {
            const regEx = /^(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?$/
            setErrorMessage({
                ...errorMessage,
                image: !regEx.test(event.target.value) ? 'Enter a valid URL' : ''
            })
        } else if (name === 'minHeight' || name === 'maxHeight') {
            validateMaxAndMin(minHeightRef, maxHeightRef, 'height')
        } else if (name === 'minWeight' || name === 'maxWeight') {
            validateMaxAndMin(minWeightRef, maxWeightRef, 'weight')
        } else if (name === 'minLifespan' || name === 'maxLifespan') {
            validateMaxAndMin(minLifespanRef, maxLifespanRef, 'lifespan')
        }
    }

    // Performs validations on maxs and mins fields

    const validateMaxAndMin = (minRef, maxRef, input) => {
            if (minRef.current.value === '' && maxRef.current.value === '') {
                setErrorMessage({
                    ...errorMessage,
                    [input]: 'This field is required'
                })
            } else if (Number(minRef.current.value) > Number(maxRef.current.value) && maxRef.current.value !== '') {   
                setErrorMessage({
                    ...errorMessage,
                    [input]: `Min ${input} cannot be greater than Max ${input}`
                })
            } else if (minRef.current.value !== '' && maxRef.current.value !== '') {
                setErrorMessage({
                    ...errorMessage,
                    [input]: ''
                })
            }
    }

    const resetForm = () => {
        setBreed(
            {
                name: '',
                minHeight: '',
                maxHeight: '',
                minWeight: '',
                maxWeight: '',
                minLifespan: '',
                maxLifespan: '',
                temperaments: [],
                image: '',
            }
        )
    }
  
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const resp = await axios.post('http://localhost:3001/dogs/', breed)
            resetForm()
            alert(resp.data.msg)
        } catch (error) {
            alert(error.response.data.msg)
            // alert('')
        }
    }
    // console.log(temperaments)
    const isDisabled = !!Object.values(errorMessage).join('') //Checks if there is any error message to enable/disable submit button
    
    return (
        <div>
            <NavBar></NavBar>
            <div className={Styles.main}>
                <div className={Styles.formContainer}>
                    <h2>Create a new breed</h2>
                    {/* <small>All fields are required</small> */}

                    <form autoComplete='off' >

                        <label><b>Name: </b></label><br></br>
                        <input type='text' name='name' value={breed.name} onChange={handleChange}></input>
                        <small> {50 - breed.name.length} characters left</small><br></br>
                        <small className={Styles.errorMsg}>{errorMessage.name}</small>
                        <br></br>

                        <label><b>Height</b></label><br></br>
                        <label>Min: </label>
                        <input name='minHeight' type='number' value={breed.minHeight} onChange={handleChange} ref={minHeightRef}></input>
                        <label>Max: </label>
                        <input name='maxHeight' type='number' value={breed.maxHeight} onChange={handleChange} ref={maxHeightRef}></input>
                        <small className={Styles.errorMsg}>{errorMessage.height}</small>
                        <br></br><br></br>

                        <label><b>Weight</b></label><br></br>
                        <label>Min: </label>
                        <input name='minWeight' type='number' value={breed.minWeight} onChange={handleChange} ref={minWeightRef}></input>
                        <label>Max: </label>
                        <input name='maxWeight' type='number' value={breed.maxWeight} onChange={handleChange} ref={maxWeightRef}></input>
                        <small className={Styles.errorMsg}>{errorMessage.weight}</small>
                        <br></br><br></br>

                        <label><b>Life Span</b></label><br></br>
                        <label>Min: </label>
                        <input name='minLifespan' type='number' value={breed.minLifespan} onChange={handleChange} ref={minLifespanRef}></input>
                        <label>Max: </label>
                        <input name='maxLifespan' type='number' value={breed.maxLifespan} onChange={handleChange} ref={maxLifespanRef}></input>
                        <small className={Styles.errorMsg}>{errorMessage.lifespan}</small>
                        <br></br><br></br>

                        <label><b>Temperament: </b></label><br></br>
                        <small>Choose a temperament from the dropdown list or enter your own and then click on 'Add'</small><br></br>
                        <input list='temperaments' name='temperaments' ref={temperamentsRef}></input>
                        <button onClick={e => handleAddTemperament(e)} title='Add'><GrFormAdd/></button>
                        <datalist id='temperaments'>
                            {temperaments.map(e => <option value={e} key={e}></option>)}
                        </datalist>
                        
                        <input name='temperament' readOnly='readonly' value={breed.temperaments}></input>
                        <button onClick={e => handleReset(e)} title='Clear' id='remove'><BsTrash/></button>
                        <br></br><br></br>
                        

                        <label><b>Image URL: </b></label>
                        <input type='text' name="image" value={breed.image} onChange={handleChange} ref={imageRef}></input>
                        <small className={Styles.errorMsg}>   {errorMessage.image}</small>
                        <br></br><br></br>
                        <div className={Styles.submitReset}>
                            <input type='submit' disabled={isDisabled} name='submit' value='Create' onClick={handleSubmit}></input>
                            <input type='reset' value='Reset' onClick={resetForm} title='Reset'></input>
                            <Link to='/home'><input type='button' value='Back home'></input></Link>              
                        </div>
                    </form>
                    <br></br>
                </div>

                <div className={Styles.videoContainer}>
                    <video autoPlay muted loop id='formVideo'>
                        <source src={Video} type='video/mp4'></source>
                    </video>
                </div>
            </div>
        </div>
    )
}