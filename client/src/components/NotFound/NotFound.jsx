import { Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Styles from './NotFound.module.css'
import Image from './../../assets/img/pexels-charles-1851164.jpg'
import Footer from "../Footer/Footer";


export default function NotFound() {
    return (
        <div>
            <NavBar></NavBar>
            <div className={Styles.container}>
                <div>
                    <h2>Not Found</h2>
                    <img src={Image} alt='Not Found'></img>
                    <small>Error 404</small>
                    <p>The page you're looking for does not exist.</p>
                </div> 
                <div>
                    <Link to='/home'><button>Back Home</button></Link>
                </div> 
            </div>
            <Footer></Footer>
        </div>
    )
}