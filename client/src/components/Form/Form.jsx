import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { getAllTemperaments } from '../../redux/actions'
import { Link } from 'react-router-dom'


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
        // console.log(temperamentsRef)
        const value = temperamentsRef.current.value
        setBreed({
                ...breed,
                temperaments: !breed.temperaments.includes(value) ? [...breed.temperaments, value] : breed.temperaments
            })
        temperamentsRef.current.value = ''
    }

    const handleReset = () => {
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
  
    const handleSubmit = (e) => {
        e.preventDefault()
    }
    // console.log(temperaments)
    const isDisabled = !!Object.values(errorMessage).join('') //Checks if there is any error message to enable/disable submit button
    
    return (
        <div>
            <h2>Create a new breed</h2>
            <small>All fields are required</small>

            <form onSubmit={handleSubmit} autoComplete='off'>

                <label>Name: </label><br></br>
                <input name='name' value={breed.name} onChange={handleChange}></input>
                <small> {50 - breed.name.length} characters left</small><br></br>
                <small>{errorMessage.name}</small>
                <br></br>

                <label>Height</label><br></br>
                <label>Min: </label>
                <input name='minHeight' type='number' value={breed.minHeight} onChange={handleChange} ref={minHeightRef}></input>
                <label>Max: </label>
                <input name='maxHeight' type='number' value={breed.maxHeight} onChange={handleChange} ref={maxHeightRef}></input>
                <small>{errorMessage.height}</small>
                <br></br>

                <label>Weight</label><br></br>
                <label>Min: </label>
                <input name='minWeight' type='number' value={breed.minWeight} onChange={handleChange} ref={minWeightRef}></input>
                <label>Max: </label>
                <input name='maxWeight' type='number' value={breed.maxWeight} onChange={handleChange} ref={maxWeightRef}></input>
                <small>{errorMessage.weight}</small>
                <br></br>

                <label>Life Span</label><br></br>
                <label>Min: </label>
                <input name='minLifespan' type='number' value={breed.minLifespan} onChange={handleChange} ref={minLifespanRef}></input>
                <label>Max: </label>
                <input name='maxLifespan' type='number' value={breed.maxLifespan} onChange={handleChange} ref={maxLifespanRef}></input>
                <small>{errorMessage.lifespan}</small>
                <br></br>

                <label>Temperament: </label><br></br>
                <small>Choose a temperament from the dropdown list or enter your own and then click on 'Add'</small><br></br>
                <input list='temperaments' name='temperaments'   ref={temperamentsRef}></input>
                <button onClick={e => handleAddTemperament(e)}>Add</button>
                <datalist id='temperaments'>
                    {temperaments.map(e => <option value={e} key={e}></option>)}
                </datalist>
                <br></br>
                <input name='temperament' readOnly='readonly' value={breed.temperaments}></input>
                <button onClick={handleReset}>Reset</button>
                <br></br>
                

                <label>Image URL: </label>
                <input name="image" value={breed.image} onChange={handleChange} ref={imageRef}></input>
                <small>{errorMessage.image}</small>
                <br></br><br></br>

                <input type='submit' disabled={isDisabled} name='submit' value='Create'></input>
                <input type='reset' value='Reset' onClick={resetForm}></input>
            </form>
            <br></br>
            <Link to='/home'><button>Back Home</button></Link>
        </div>
    )
}