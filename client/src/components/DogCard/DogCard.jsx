import { Link } from "react-router-dom"
import Styles from "./DogCard.module.css"

export default function DogCard(props) {
    //console.log(props)
    return (
        <Link to={`/breeds/${props.id}`}>
        <div className={Styles.CardContainer}>
                <img className={Styles.CardImage} src={props.image ? props.image : 'https://i.pinimg.com/564x/c6/b9/c9/c6b9c91cf636c86496cd9886cc8c6c20.jpg'} alt='Dog'></img>
                <p>Name: {props.name}</p>
                <p>Weight: {`${props.minWeight} - ${props.maxWeight} lb`}</p>
                <p>Temperament: {props.temperament.join(', ')}</p>
        </div>
        </Link>
    )
}