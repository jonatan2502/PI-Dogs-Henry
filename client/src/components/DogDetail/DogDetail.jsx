import { useParams } from 'react-router-dom'
import Styles from './DogDetails.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getBreed } from '../../redux/actions'


export default function DogDetail() {
    const dispatch = useDispatch()
    let breedDetail = useSelector( (store) => store.breed)
    let { id } = useParams()

    useEffect(() => {
        dispatch(getBreed(id))
    }, [])


    console.log(breedDetail)
    return (
        <div>
            <h1>Dog details</h1>
            <img className={Styles.CardImage} src={breedDetail.image ? breedDetail.image : 'https://i.pinimg.com/564x/c6/b9/c9/c6b9c91cf636c86496cd9886cc8c6c20.jpg'} alt='Dog'></img>
            <p>Name: {breedDetail.name}</p>
            <p>Weight: {`${breedDetail.min_weight} - ${breedDetail.max_weight} lb`}</p>
            <p>Height: {`${breedDetail.min_height} - ${breedDetail.max_height} in`}</p>
            <p>Temperament: {breedDetail.Temperamentos?.map((e)=> e.name).join(', ')}</p>
            <p>Life span: {`${breedDetail.min_life_span} - ${breedDetail.max_life_span} years`}</p>
        </div>
    )
}