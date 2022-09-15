import { useSelector } from "react-redux"
import DogCard from "../DogCard/DogCard"

export default function Search(props) {
    const breeds = useSelector( store => store.foundByName)

    if (breeds.data) {
        return (
            <div>
                <p>{breeds.data.msg}</p>
            </div>
        )
    } else return (
        <div>
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