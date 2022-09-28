import { Link, useParams } from 'react-router-dom'
import Styles from './DogDetails.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { clearBreeds, clearDetails, getBreed } from '../../redux/actions'
import defaultImage from '../../assets/img/default_img.jpg'
import Loader from '../Loader/Loader'
import NavBar from '../NavBar/NavBar'
import Image from './../../assets/img/pexels-sam-lion-5732457.jpg'



export default function DogDetail() {
    const dispatch = useDispatch()
    let breedDetail = useSelector( (store) => store.breedDetail)
    let { id } = useParams()

    useEffect(() => {
        dispatch(getBreed(id))
        return () => {
            dispatch(clearDetails())
            // dispatch(clearBreeds())
        }
    }, [id])
    console.log(breedDetail, id)
    if (!breedDetail.name && !breedDetail.msg) {
        return (
            <div>
                <NavBar></NavBar>
                <Loader></Loader>
            </div>
        )

    } else if (breedDetail.msg) {
        return (
            <div>
                <NavBar></NavBar>
                <div className={Styles.notFound}>
                    <h2>Not found</h2>
                    <img src={Image}></img>
                    <small>Error 404</small>
                    <p>{breedDetail.msg}</p>
                    <div className={Styles.options}>
                        <Link to='/home'><button>Back Home</button></Link>
                    </div>
                </div>
            </div>
        )
    } else return (
        <>
        <NavBar></NavBar>
        <div className={Styles.main}>
            <div className={Styles.container}>
                <div className={Styles.imgContainer}>
                    <img className={Styles.CardImage} src={breedDetail.image ? breedDetail.image : defaultImage} alt='Dog'></img>
                </div>
                <div className={Styles.details}>
                    <h2>{breedDetail.name}</h2>
                    <p><b>Weight: </b>{
                        breedDetail.min_weight === breedDetail.max_weight ? `${breedDetail.max_weight} lb` : `${breedDetail.min_weight} - ${breedDetail.max_weight} lb`}</p>
                    <p><b>Height: </b>{
                        breedDetail.min_height === breedDetail.max_height ? `${breedDetail.max_height} in` : `${breedDetail.min_height} - ${breedDetail.max_height} in`}</p>
                    <p><b>Temperament: </b>{breedDetail.Temperamentos.length ? breedDetail.Temperamentos.map((e)=> <Link to={`/listBreeds/${e.name}`}>{`${e.name} `}</Link>) : 'No records'}</p>
                    <p><b>Life span: </b>{
                        breedDetail.min_life_span === breedDetail.max_life_span ? `${breedDetail.max_life_span} years` : `${breedDetail.min_life_span} - ${breedDetail.max_life_span}`}</p>
                </div>
            </div>
            <div className={Styles.options}>
                <Link to='/home'><button>Back Home</button></Link>
            </div>
        </div>
        </>
    )
}