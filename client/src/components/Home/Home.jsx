import DogCard from "../DogCard/DogCard"
import Styles from "./Home.module.css"
import NavBar from "../NavBar/NavBar"
import Pagination from '../Pagination/Pagination'
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react"
import { getAllBreeds, getFilteredBreeds, orderBy, getAllTemperaments, searchByName, clearBreeds } from "../../redux/actions"
import Loader from "../Loader/Loader"


export default function Home() {
    
    const dispatch = useDispatch()
    const temperaments = useSelector((state) => state.temperaments).sort()
    const breeds = useSelector(store => store.breeds)
    const orderRef = useRef()

    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(8)

    const maxPage = Math.ceil(breeds.length / perPage)

    useEffect((() => {
        dispatch(getAllBreeds())
    }), [])
    
    useEffect(() => {
        dispatch(getAllTemperaments())
    }, [])

    useEffect(() => {
        setPage(1)
    }, [breeds])
    
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
    }
    if (!breeds.length) return (
    <div>
        <NavBar></NavBar>
        <Loader></Loader>
    </div>
    )
    else return (
        <div>
            <NavBar></NavBar>
            <div className={Styles.filters}>
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
            <Pagination page={page} setPage={setPage} maxPage={maxPage} breeds={breeds}></Pagination>
        </div>
    )
}