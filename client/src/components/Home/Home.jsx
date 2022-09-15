import DogCard from "../DogCard/DogCard"
import styles from "./Home.module.css"
import axios from 'axios'
import NavBar from "../NavBar/NavBar"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useRef } from "react"
import { getAllBreeds, getFilteredBreeds, orderBy, getAllTemperaments, searchByName } from "../../redux/actions"
import Options from "../Options/Options"


export default function Home() {
    
    const dispatch = useDispatch()
    const temperaments = useSelector((state) => state.temperaments).sort()
    const breeds = useSelector(store => store.breeds)
    const orderRef = useRef()
    // let breeds = useSelector(store => store.orderedBreeds)
    useEffect((() => {
        dispatch(getAllBreeds())
    }), [])
    
    useEffect(() => {
        dispatch(getAllTemperaments())
    }, [])
    
    const handleOrderBy = function(event) {
        const order = event.target.value
        dispatch(orderBy(order, breeds))
    }
    
    const handleFilter = function(event) {
        const temp = event.target.value
        //const order = orderRef.current.value
        dispatch(getFilteredBreeds(temp, breeds))
        // dispatch(orderBy(orderRef.current.value, breeds)) //Dispatch getAllBreeds when component renders
        orderRef.current.value = 'name_asc'
        
        // breeds = orderBreeds
    }

    return (
        <div>
            {/* <Options handleOrderBy={handleOrderBy} handleFilter={handleFilter}></Options> */}
            <div>
                <label>Choose temperament: </label>
                <select name='filterBy' onChange={(e)=> handleFilter(e)}>
                    <option value=''>All</option>
                    {
                        temperaments.map(e => <option key={e} value={e}>{e}</option>)
                    }
                    
                </select>
                <label>Order by: </label>
                <select name='orderBy' onChange={(e)=> handleOrderBy(e)} ref={orderRef}>
                    <optgroup label='Name'>
                        <option value='name_asc'>A - Z</option>
                        <option value='name_desc'>Z - A</option>
                    </optgroup>
                    <optgroup label='Weight'>
                        <option value='weight_asc'>Min first</option>
                        <option value='weight_desc'>Max first</option>
                    </optgroup>
                </select>
            </div>
            {
                breeds.map((breed) =>
                    <DogCard
                        key={breed.id}
                        id={breed.id}
                        name={breed.name}
                        image={breed.image}
                        minWeight={breed.min_weight}
                        maxWeight={breed.max_weight}
                        temperament={breed.Temperamentos.map((e)=> e.name)}
                    >
                    </DogCard> 
                )
            }
        </div>
    )
}