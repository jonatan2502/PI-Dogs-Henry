import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllBreeds } from "../../redux/actions"
import DogCard from "../DogCard/DogCard"
import DogDetail from "../DogDetail/DogDetail"
import NavBar from "../NavBar/NavBar"


export default function RandomBreed() {

    const dispatch = useDispatch()
    const breeds = useSelector((state) => state.breeds)
    const randomIndex = Math.ceil(Math.random() * breeds.length)
    console.log(randomIndex)
    console.log(breeds)

    useEffect(() => {
        dispatch(getAllBreeds())
    }, [])

    return (
        <div>
            <NavBar></NavBar>
            {/* <DogDetail></DogDetail> */}
            <DogDetail breeds={breeds}></DogDetail>
        </div>
    )
}