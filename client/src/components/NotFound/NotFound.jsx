import { Link } from "react-router-dom";
import NavBar from "../NavBar/NavBar";


export default function NotFound() {
    return (
        <div>
            <NavBar></NavBar>
            <div>
                <h1>Not Found</h1>
                <small>Error 404</small>
                <p>The page you're looking for does not exist.</p>
            </div> 
            <div>
                <Link to='/home'><button>Back Home</button></Link>
            </div> 
        </div>
    )
}