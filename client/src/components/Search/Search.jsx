import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearSearch } from "../../redux/actions"
import DogCard from "../DogCard/DogCard"
import { Link } from 'react-router-dom'
import Loader from "../Loader/Loader"
import NavBar from "../NavBar/NavBar"

export default function Search(props) {
    const breeds = useSelector(store => store.foundByName)
    const dispatch = useDispatch()
    // const [found, setFound] = useState()
    useEffect(() => {
        // dispatch(getBreed(id))
        // dispatch(clearSearch())
        // setFound(breeds)
        return (
            dispatch(clearSearch())
        )
        
    }, [])

    if (breeds.data) {
        return (
            <div>
                <p>{breeds.data.msg}</p>
                <Link to='/home'><button>Back Home</button></Link>
            </div>
        )
    } else return (
        <div>
            {/* {console.log(breeds)} */}
            <NavBar></NavBar>
            { 
                breeds?.map((breed, i) =>
                    <DogCard
                        key={i}
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
            <Link to='/home'><button>Back Home</button></Link>
        </div>
    )
}