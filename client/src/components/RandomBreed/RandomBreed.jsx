import { useDispatch } from "react-redux"
import DogCard from "../DogCard/DogCard"
import DogDetail from "../DogDetail/DogDetail"
import NavBar from "../NavBar/NavBar"


export default function RandomBreed() {

    const dispatch = useDispatch()


    return (
        <div>
            <NavBar></NavBar>
            {/* <DogDetail></DogDetail> */}
            <DogCard></DogCard>
        </div>
    )
}