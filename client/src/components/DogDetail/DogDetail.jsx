import { Link, useParams } from 'react-router-dom'
import Styles from './DogDetails.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { clearDetails, getBreed } from '../../redux/actions'
import defaultImage from '../../assets/img/default_img.jpg'
import Loader from '../Loader/Loader'
import NavBar from '../NavBar/NavBar'



export default function DogDetail() {
    const dispatch = useDispatch()
    let breedDetail = useSelector( (store) => store.breedDetail)
    let { id } = useParams()

    useEffect(() => {
        dispatch(getBreed(id))
        return () => {
            dispatch(clearDetails())
        }
    }, [id])
    console.log(breedDetail)
    if (!breedDetail.name && !breedDetail.msg) {
        return <Loader></Loader>
    } else if (breedDetail.msg) {
        return <p>{breedDetail.msg}</p>
    } else return (
        <>
            <NavBar></NavBar>
            <div className={Styles.container}>
                <div className={Styles.imgContainer}>
                    <img className={Styles.CardImage} src={breedDetail.image ? breedDetail.image : defaultImage} alt='Dog'></img>
                </div>
                <div>
                    <h1>{breedDetail.name}</h1>
                    <p>Weight: {
                        breedDetail.min_weight === breedDetail.max_weight ? `${breedDetail.max_weight} lb` : `${breedDetail.min_weight} - ${breedDetail.max_weight} lb`}</p>
                    <p>Height: {
                        breedDetail.min_height === breedDetail.max_height ? `${breedDetail.max_height} in` : `${breedDetail.min_height} - ${breedDetail.max_height} in`}</p>
                    <p>Temperament: {breedDetail.Temperamentos?.map((e)=> e.name).join(', ')}</p>
                    <p>Life span: {
                        breedDetail.min_life_span === breedDetail.max_life_span ? `${breedDetail.max_life_span} years` : `${breedDetail.min_life_span} - ${breedDetail.max_life_span} years`}</p>
                </div>
            </div>
            <Link to='/home'><button>Back Home</button></Link>
        </>
    )
}