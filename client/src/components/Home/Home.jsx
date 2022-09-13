import DogCard from "../DogCard/DogCard"
import styles from "./Home.module.css"
import axios from 'axios'
import NavBar from "../NavBar/NavBar"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getAllBreeds } from "../../redux/actions"


// const dogs = fetch('localhost:3001/dogs')
// console.log(dogs)


export default function Home() {
    
    const dispatch = useDispatch()
    const breeds = useSelector((store) => store.breeds)
    useEffect((() => {
        dispatch(getAllBreeds()) //Dispatch getAllBreeds whe component renders
    }), [])
    //console.log(breeds[175])
    return (
        <div>
            <NavBar></NavBar>
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