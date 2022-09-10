import { useState, useEffect, useRef } from "react";



export default function Form() {

    const minWeightRef = useRef()
    const maxWeightRef = useRef()
    const minHeightRef = useRef()
    const maxHeightRef = useRef()
    const minLifespanRef = useRef()
    const maxLifespanRef = useRef()
    const imageRef = useRef()
    
    const [breed, setBreed] = useState({
        name: '',
        minHeight: '',
        maxHeight: '',
        minWeight: '',
        maxWeight: '',
        minLifespan: '',
        maxLifespan: '',
        image: '',
    })
    
    const [errorMessage, setErrorMessage] = useState({
        name: ' ',
        height: ' ',
        weight: ' ',
        lifespan: ' ',
        image: ' ',
    })
    
    // On envery change in input fields performs state updates and validates input data from user
    const handleChange = (e) => {
        setBreed({
            ...breed,
            [e.target.name]: e.target.name === 'name' ? e.target.value.slice(0, 50) : e.target.value.replace('-', '') // limit name to 50 chars and replaces negative sign in inputs
        })
        validate(e)
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

    // This function validates min and max input fields. Min can't be greater than max and empty fields are not allowed.
    // Also, at first it only runs if there are values in both input fields. Finally, sets error message to an empty string meaning everything is ok.
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
  
    const handleSubmit = (e) => {
        e.preventDefault()
    }
    
    const isDisabled = !!Object.values(errorMessage).join('') //Checks if there is any error message to enable/disable submit button
    
    return (
        <div>
            <h2>Create Breed</h2>
            <small>All fields are required</small>
            <form onSubmit={handleSubmit}>

                <label>Name: </label><br></br>
                <input name='name' value={breed.name} onChange={handleChange}></input>
                <small>{50 - breed.name.length} characters left</small><br></br>
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

                <label>Imgame URL:</label>
                <input name="image" value={breed.image} onChange={handleChange} ref={imageRef}></input>
                <small>{errorMessage.image}</small>
                <br></br><br></br>

                <input type='submit' disabled={isDisabled}></input>

            </form>
        </div>
    )
}