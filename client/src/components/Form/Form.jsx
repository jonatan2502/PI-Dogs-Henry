import { useState, useEffect } from "react";



export default function Form() {

    const isDisabled = [true, true, true, true]

    const [breed, setBreed] = useState({
        name: '',
        min_height: '',
        max_height: '',
        min_weight: '',
        max_weight: '',
        min_life_span: '',
        max_life_span: '',
    })

    // const [errorMessage, setErrorMessage] = useState({
    //     name: ' ',
    //     height: ' ',
    //     weight: ' ',
    //     life_span: ' ',
    // })

    const [errorMessage, setErrorMessage] = useState({
        name: ' ',
        height: ' ',
        weight: ' ',
        life_span: ' ',
    })

    // const [errorMessage, setErrorMessage] = useState('Empty form')

    const handleChange = (e) => {
        const name = e.target.name
        //validate(e.target)
        setBreed({
            ...breed,
            [e.target.name]: e.target.value.slice(0, 50)
            // [e.target.name]: e.target.value.match( name == 'name' ? /^[a-zA-Z\s]*$/g : /\D/g, '')[0]
        })
    }

    // useEffect(() => {
    //     validateName(breed)
    //     // validateMaxsAndMins('height')
    //     // validateMaxsAndMins('weight')
    //     // validateMaxsAndMins('life_span')
    // }, [breed])

    useEffect(() => {
        validateMaxsAndMins('height')
    }, [breed])

    // useEffect(() => {
    //     validateMaxsAndMins('weight')
    // }, [breed])

    // useEffect(() => {
    //     validateMaxsAndMins('life_span')
    // }, [breed])

    // const validateName = (breed) => {

    //     errorMessage.name = !/^[a-zA-Z\s]*$/.test(breed.name) ? 'Only letters and spaces are allowed' : ''
    //     errorMessage.name ? isDisabled[0] = true : isDisabled[0] = false
    // }
    const validateMaxsAndMins = (attribute) => {
        if (Number(breed[`min_${attribute}`]) > Number(breed[`max_${attribute}`]) && Number(breed[`max_${attribute}`]) != '') {
            setErrorMessage({
                ...errorMessage,
                [attribute]: `Min ${attribute} cannot be greater than Max ${attribute}`
            })
        } else {
            setErrorMessage({
                ...errorMessage,
                [attribute]: ''
            })
        }
    }
    const validateName = (breed) => {

        setErrorMessage({
            ...errorMessage,
            name: !/^[a-zA-Z\s]*$/.test(breed.name) ? 'Only letters and spaces are allowed' : ''
        })
        errorMessage.name ? isDisabled[0] = true : isDisabled[0] = false
    }



        // if (Number(breed.max_height) < Number(breed.min_height) && Number(breed.max_height) != 0) {
        //     setErrorMessage({
        //         ...errorMessage,
        //         height: 'Min Height cannot be greater than Max Height'
        //     })
        // } else if (Number(breed.max_weight) < Number(breed.min_weight) && Number(breed.max_weight) != 0) {
        //     setErrorMessage({
        //         ...errorMessage,
        //         weight: 'Min weight cannot be greater than Max weight'
        //     })
        // } else if (Number(breed.max_life_span) < Number(breed.min_life_span) && Number(breed.max_life_span) != 0) {
        //     setErrorMessage({
        //         ...errorMessage,
        //         life_span: 'Min life span cannot be greater than Max life span'
        //     })
        // } else {
        //     setErrorMessage({
        //         name: '',
        //         height: '',
        //         weight: '',
        //         life_span: '',
        //     })
        // }
        
        
        // errorMessage.height ? isDisabled[1] = true : isDisabled[1] = false

        //  else {
        //     setErrorMessage({
        //         ...errorMessage,
        //         weight: ''
        //     })
        // }
        // if (errorMessage.weight || !breed.min_weight || !breed.max_weight) {
        //     isDisabled[2] = true
        //  } else {
        //     isDisabled[3] = false
        //  }
    // }

    // const validate = (input) => {
    //     let msg = ""
    //     if (input.name === 'name') {
    //         setErrorMessage({
    //             ...errorMessage,
    //             name: !/^[a-zA-Z\s]*$/.test(input.value) ? 'Only letters and spaces are allowed' : ''
    //         })
    //         errorMessage.name ? isDisabled[0] = true : isDisabled[0] = false
    //         // setErrorMessage(
    //         //     !/^[a-zA-Z\s]*$/.test(input.value) ? 'Only letters and spaces are allowed' : ''
    //         // )
    //     } else if (input.name === 'min_height' || input.name === 'max_height') {
    //         if (Number(breed.min_height) > Number(input.value.max_height)) {
    //             msg = 'Min Height cannot be greater than Max Height'
    //             setErrorMessage({
    //                 ...errorMessage,
    //                 height: msg
    //             })
    //         }
    //         else if (!/^[0-9]*$/.test(breed.min_height) || !/^[0-9]*$/.test(breed.min_height)) msg = 'Only numbers are allowed'
    //         setErrorMessage({
    //             ...errorMessage,
    //             height: msg
    //         })

    //     }
    // }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

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
                <input name='min_height' type='number' value={breed.min_height} onChange={handleChange}></input>
                <label>Max: </label>
                <input name='max_height' type='number' value={breed.max_height} onChange={handleChange}></input>
                <small>{errorMessage.height}</small>
                <br></br>

                <label>Weight</label><br></br>
                <label>Min: </label>
                <input name='min_weight' type='number' value={breed.min_weight} onChange={handleChange}></input>
                <label>Max: </label>
                <input name='max_weight' type='number' value={breed.max_weight} onChange={handleChange}></input>
                <small>{errorMessage.weight}</small>
                <br></br>

                <label>Life Span</label><br></br>
                <label>Min: </label>
                <input name='min_life_span' type='number' value={breed.min_life_span} onChange={handleChange}></input>
                <label>Max: </label>
                <input name='max_life_span' type='number' value={breed.max_life_span} onChange={handleChange}></input>
                <small>{errorMessage.life_span}</small>
                <br></br>
                <input type='submit' disabled={isDisabled}></input>

            </form>
        </div>
    )
}