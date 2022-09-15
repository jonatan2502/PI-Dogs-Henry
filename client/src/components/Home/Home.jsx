import DogCard from "../DogCard/DogCard"
import styles from "./Home.module.css"
import axios from 'axios'
import NavBar from "../NavBar/NavBar"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getAllBreeds, getFilteredBreeds, sortBy } from "../../redux/actions"
import Options from "../Options/Options"


// const dogs = fetch('localhost:3001/dogs')
// console.log(dogs)


export default function Home() {
    
    const dispatch = useDispatch()
    const breeds = useSelector(store => store.breeds)
    useEffect((() => {
        dispatch(getAllBreeds()) //Dispatch getAllBreeds when component renders
    }), [])

    const handleOrderBy = function(event) {
        const order = event.target.value
        dispatch(sortBy(order, breeds))
        if (order === 'asc') breeds.sort((a, b) => a.name.localeCompare(b.name))
        else breeds.sort((a, b) => b.name.localeCompare(a.name))
    }

    const handleFilter = function(event) {
        const temp = event.target.value
        dispatch(getFilteredBreeds(temp))
    }

    return (
        <div>
            <Options handleOrderBy={handleOrderBy} handleFilter={handleFilter}></Options>
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