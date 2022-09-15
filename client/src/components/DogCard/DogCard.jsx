import { Link } from "react-router-dom"
import Styles from "./DogCard.module.css"
import defaultImage from '../../assets/img/default_img.jpg'

export default function DogCard(props) {
    //console.log(props)
    return (
        <Link to={`/breeds/${props.id}`}>
        <div className={Styles.CardContainer}>
                <img className={Styles.CardImage} src={props.image ? props.image : defaultImage} alt='Dog'></img>
                <p>Name: {props.name}</p>
                <p>Weight: {`${props.minWeight} - ${props.maxWeight} lb`}</p>
                <p>Temperament: {props.temperament.join(', ')}</p>
        </div>
        </Link>
    )
}