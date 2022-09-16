import { useDispatch } from "react-redux"
import DogCard from "../DogCard/DogCard"
import DogDetail from "../DogDetail/DogDetail"


export default function RandomBreed() {

    const dispatch = useDispatch()


    return (
        <div>
            {/* <DogDetail></DogDetail> */}
            <DogCard></DogCard>
        </div>
    )
}