import { Link } from "react-router-dom"
import Styles from "./DogCard.module.css"
import defaultImage from '../../assets/img/default_img.jpg'

export default function DogCard(props) {
    //console.log(props)
    return (
        <Link className={Styles.link} to={`/breeds/${props.id}`}>
            <div className={Styles.cardContainer}>
                    <img className={Styles.cardImage} src={props.image ? props.image : defaultImage} alt='Dog'></img>
                    <p><b>Name: </b>{props.name}</p>
                    <p><b>Weight: </b>{
                        props.minWeight === props.maxWeight ? `${props.maxWeight} lb` : `${props.minWeight} - ${props.maxWeight} lb`}</p>
                    <p><b>Temperament: </b>{props.temperament.join(', ')}</p>
            </div>
        </Link>
    )
}