import React from "react";
import styles from "./LandingPage.module.css"
import { Link } from 'react-router-dom'

export default function LandingPage() {
    return (
        <div>
            <h1>Henry Dogs</h1>
            <Link to='/home'><button>Woof!</button></Link>
        </div>
    )
}