import { Link } from "react-router-dom";


export default function NotFound() {
    return (
        <div>
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