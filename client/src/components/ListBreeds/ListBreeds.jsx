import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { getFilteredBreeds } from "../../redux/actions"
import DogCard from "../DogCard/DogCard"
import Loader from "../Loader/Loader"
import NavBar from "../NavBar/NavBar"
import Pagination from "../Pagination/Pagination"
import Styles from './ListBreeds.module.css'


export default function ListBreeds() {
    const dispatch = useDispatch()
    const { temperament } = useParams()
    const allBreeds = useSelector(store => store.breeds)
    // console.log(temperament)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(8)

    const maxPage = Math.ceil(allBreeds.length / perPage)

    useEffect(() => {
        dispatch(getFilteredBreeds(temperament))

    }, [])

    const breeds = []
    allBreeds.forEach( breed => breed.Temperamentos.forEach(t => {
        if (t.name === temperament) breeds.push(breed)
    }))

    if (!breeds.length) return <Loader></Loader>
    else return (
        <div className={Styles.main}>
            <NavBar></NavBar>
            <div className={Styles.cardsContainer}>
                {
                    breeds.slice(
                        (page - 1) * perPage,
                        ((page - 1) * perPage) + perPage
                    ).map((breed) =>
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
            <Pagination page={page} setPage={setPage} maxPage={maxPage}></Pagination>
            <div>
                <Link to='/home'><button>Back Home</button></Link>
            </div>
        </div>
    )
}