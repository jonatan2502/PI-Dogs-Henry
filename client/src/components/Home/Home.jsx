import DogCard from "../DogCard/DogCard"
import styles from "./Home.module.css"
import axios from 'axios'
import NavBar from "../NavBar/NavBar"


// const dogs = fetch('localhost:3001/dogs')
// console.log(dogs)

export default function Home() {
    return (
        <div>
            <NavBar></NavBar>
            
            <DogCard>

            </DogCard>
        </div>
    )
}