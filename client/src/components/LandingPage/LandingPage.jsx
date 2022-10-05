import React from "react";
import Styles from "./LandingPage.module.css"
import { Link } from 'react-router-dom'
import Video from './../../assets/img/pexels-kelly-lacy-6498483.mp4'

export default function LandingPage() {
    return (
        <div>
            <video className={Styles.video} autoPlay muted loop id='bgVideo'>
                <source src={Video} type='video/mp4'></source>
            </video>
            <div className={Styles.welcome}>
                <h1>Henry's Dogs</h1>
                <small>Individual Project developed by <a target='_blank' href='https://www.linkedin.com/in/jonatan-piedra-9036ab4b/'>Jonatan Piedra</a> for Henry Bootcamp</small>
                <Link to='/home' className={Styles.button}><button>Click Here</button></Link>
            </div>
        </div>
    )
}